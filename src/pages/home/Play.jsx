import UserHomeLayout from "../../layout/UserHomeLayout";
import {MusicBars} from "../../components/MusicBars";
import {motion} from "framer-motion";
import {useRef} from "react";

import {VoiceRecorder} from "capacitor-voice-recorder";
import {Geolocation} from "@capacitor/geolocation";

import {useHistory} from "react-router-dom";
import {useState} from "react";
import Instance from "../../axios/Axios";
import Loading from "../../components/Loading";
import {useSWRConfig} from "swr";
import useSWR from "swr";

import ClockSvg from "../../components/ClockSvg";
import Pause from "../../assets/icons/Pause";
import {useCapacitorStripe} from "@capacitor-community/stripe/dist/esm/react/provider";
import {useIonViewWillLeave} from "@ionic/react";


function Play() {
    const [isRecording, setIsRecording] = useState(false);

    const [audioHex, setAudioHex] = useState(null);
    const [jobPosting, setJobPosting] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const history = useHistory();


    useIonViewWillLeave(() => {
        setTimeout(() => {
            audioRef.current.pause();
            setIsPlaying(false);
        }, 0);
    });


    const {stripe, isGooglePayAvailable} = useCapacitorStripe();
    const {data} = useSWR(isGooglePayAvailable && "create-payment-intent");
    const {data: me} = useSWR("auth/me");

    const {mutate} = useSWRConfig();

    const createPaymentToken = async () => {
        try {
            if (isGooglePayAvailable) {
                await stripe.createGooglePay({
                    paymentIntentClientSecret: data?.paymentIntent?.client_secret,
                    paymentSummaryItems: [
                        {
                            label: "Voklizer",
                            amount: data?.amount,
                        },
                    ],
                    merchantIdentifier: "merchant.com.getcapacitor.stripe",
                    countryCode: "US",
                    currency: "USD",
                });

                const result = await stripe.presentGooglePay();
                return result;
            }

            const isApplePayAvailable = await stripe.isApplePayAvailable();

            if (isApplePayAvailable) {
                await stripe.createApplePay({
                    paymentIntentClientSecret: data?.paymentIntent?.client_secret,
                    paymentSummaryItems: [
                        {
                            label: "Voklizer",
                            amount: data?.amount,
                        },
                    ],
                    merchantDisplayName: "Your Merchant Name",
                    countryCode: "US",
                    currency: "USD",
                });

                const result = await stripe.presentApplePay();
                return result;
            }
        } catch (e) {
            console.error("Error processing payment:", e);
        }
    };


    const cancelAudio = () => {
        setAudioHex(null);
        setIsPlaying(false);
        audioRef.current.pause();
        audioRef.current = null;
    };

    const PlayAudio = () => {

        if (!isPlaying) {
            audioRef.current = new Audio(
                `data:${audioHex.mimeType};base64,${audioHex.recordDataBase64}`
            );
            audioRef.current.oncanplaythrough = () => {
                setIsPlaying(true);
                audioRef.current.play();
            };

            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
            audioRef.current.load();
        }
    };

    const SendAudio = async () => {
        setJobPosting(true);

        const locationPermission = await Geolocation.requestPermissions();
        const hasNoLocation = !locationPermission || locationPermission.location !== "granted";
        if (hasNoLocation) {
            history.push("/location-error");
            return;
        }

        if (!me.data.defaultPaymentMethod) {
            setJobPosting(false);
            history.push("/billing?recorded=true");
            return;
        }

        const currentPosition = await Geolocation.getCurrentPosition();


        try {
            if (["google-pay", "apple-pay"].includes(me?.data?.defaultPaymentMethod?.toLowerCase())) {
                const paymentResult = await createPaymentToken();
                if (paymentResult?.paymentResult !== "googlePayCompleted") {
                    throw new Error("Google Pay payment was not completed");
                }
            } else {
                await Instance.post("/charge-card/", {
                    title: "Immigration",
                    serviceType: "JOB",
                });
            }

            const fetchLocation = async (longitude, latitude) => {
                console.log('🌍 fetchLocation called with:', { longitude, latitude });
                
                try {
                    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
                    console.log('🌍 Making request to URL:', url);
                    
                    const response = await fetch(url, {
                        headers: {
                            'Accept-Language': 'en',
                            'User-Agent': 'YourAppName/1.0 (contact@example.com)',
                        }
                    });

                    console.log('🌍 Response status:', response.status);
                    console.log('🌍 Response ok:', response.ok);

                    if (!response.ok) {
                        console.error(`🌍 Location API HTTP error! status: ${response.status}`);
                        const errorText = await response.text();
                        console.error('🌍 Error response body:', errorText);
                        return '';
                    }

                    const data = await response.json();
                    console.log('🌍 Full API response:', JSON.stringify(data, null, 2));
                    console.log('🌍 Address object:', data.address);
                    console.log('🌍 Country extracted:', data.address?.country || 'NO COUNTRY FOUND');
                    
                    return data.address?.country || '';
                } catch (error) {
                    console.error('🌍 Location API failed:', error);
                    console.error('🌍 Error details:', {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    });
                    return '';
                }
            };



            console.log('📍 Current position:', {
                longitude: currentPosition.coords.longitude,
                latitude: currentPosition.coords.latitude,
                accuracy: currentPosition.coords.accuracy,
                timestamp: currentPosition.timestamp
            });

            const locationResult = await fetchLocation(currentPosition.coords.longitude, currentPosition.coords.latitude);
            console.log('🌍 Final location result:', locationResult);

            const jobData = {
                audioType: audioHex.mimeType,
                audioHex: audioHex.recordDataBase64,
                longitude: currentPosition.coords.longitude,
                latitude: currentPosition.coords.latitude,
                location: locationResult,
            };

            console.log('🚀 Posting job data:', {
                audioType: jobData.audioType,
                audioHexLength: jobData.audioHex ? jobData.audioHex.length : 'NO AUDIO',
                longitude: jobData.longitude,
                latitude: jobData.latitude,
                location: jobData.location || 'NO LOCATION'
            });

            const response = await Instance.post("/add-job/", jobData);
            console.log('✅ Job posted successfully:', response.data);

            setAudioHex(null);
            setIsPlaying(false);
            audioRef.current = null;
            setJobPosting(false);
            mutate("job-notifications");
            mutate("create-payment-intent");
            mutate("user-payments");

            history.push("/send-success");
        } catch (error) {
            console.error('❌ Error in SendAudio:', error);
            console.error('❌ Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                response: error.response?.data,
                status: error.response?.status
            });
            
            setJobPosting(false);

            if (
                me?.data?.defaultPaymentMethod === "google-pay" &&
                error.message === "Google Pay payment was not completed"
            ) {
                console.log('🔄 Redirecting to payment error page');
                history.push(`/payment-error`);
            } else {
                console.log('🔄 General error occurred, staying on current page');
            }
        }
    };

    const RecordStart = () => {
        VoiceRecorder.startRecording()
            .then(() => {
                setIsRecording(true);
            })
            .catch(() => setIsRecording(false));
    };

    const RecordStop = () => {
        VoiceRecorder.stopRecording()
            .then((result) => {
                setAudioHex(result.value);

                setIsRecording(false);
            })
            .catch(() => {
                setIsRecording(false);

            });
    };

    const toggleRecording = () => {
        if (isRecording) {
            RecordStop();
        } else {
            RecordStart();
        }
    };

    const pause = () => {
        setIsPlaying(false);
        audioRef.current.pause();
        audioRef.current = null;
    };

    return (
        <UserHomeLayout>
            <div className="flex flex-col items-center h-full justify-end  w-full  gap-12">
                <div className="relative flex justify-center items-center">
                    {(isRecording || isPlaying) && (
                        <>
                            <div
                                className="absolute     animate-ping border-[1.5px] border-purple w-32 h-32 rounded-full -z-10"

                            />
                            <div
                                className="absolute   border-[1.5px] border-purple w-32 h-32 rounded-full -z-10 animate-[ping_1s_linear_infinite]"

                            />
                        </>
                    )}
                    {!isRecording && audioHex ? (
                        <div
                            className="w-[132px] h-[132px] bg-[#161A1D] rounded-full flex items-center justify-center z-10"
                            onClick={isPlaying ? pause : PlayAudio}
                        >
                            {isPlaying ? (
                                <Pause className="text-white" />
                            ) : (
                                <img className="ml-3 " src="/Play.svg" alt="" />
                            )}
                        </div>
                    ) : (
                        <div
                            className="w-[132px] h-[132px] bg-[#161A1D] rounded-full flex items-center justify-center z-10"
                            onClick={toggleRecording}
                        >
                            <img src="/Mic.svg" alt="" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 items-center w-full">
                    {!isRecording && audioHex ? (
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                            className="w-full"
                        >
                            <div className="h-[40px] flex items-center justify-center w-full">
                                <div
                                    className="bg-[#D9D9D960] rounded-xl  py-[9px] flex  gap-2 items-center  px-3 w-full">
                                    <button className="text-sm" onClick={cancelAudio}>
                                        Cancel
                                    </button>
                                    <div className="h-1.5 bg-purple rounded-2xl flex-1" />
                                    <button className="text-sm " onClick={SendAudio}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-[40px]  w-full">
                            <motion.div
                                initial={{opacity: 0, scale: 0.5}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.3}}
                                className="w-full flex items-center justify-center "
                            >
                                <ClockSvg isRecording={isRecording} />
                            </motion.div>
                        </div>
                    )}
                    <Loading open={jobPosting} message={"Transmitting"} />

                    <div className="flex flex-col gap-6 justify-center">
                        {isRecording || isPlaying ? (
                            <div className="h-[44px] flex items-center justify-center">
                                <MusicBars isAnimating />
                            </div>
                        ) : (
                            <div className="h-[44px] flex items-center justify-center">
                                <img src="/Ripple.svg" alt="" />
                            </div>
                        )}
                        <div className="text-[15px] leading-[18px]  text-black w-full text-center">
                            Press to listen & Slide to send
                        </div>
                    </div>
                </div>
            </div>
        </UserHomeLayout>
    );
}

export default Play;
