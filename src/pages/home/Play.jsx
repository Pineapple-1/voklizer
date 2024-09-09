import UserHomeLayout from "../../layout/UserHomeLayout";
import { MusicBars } from "../../components/MusicBars";
import { motion } from "framer-motion";
import { useRef } from "react";

import { VoiceRecorder } from "capacitor-voice-recorder";
import {Geolocation} from '@capacitor/geolocation';
import { useIonAlert } from '@ionic/react';



import { useHistory } from "react-router-dom";
import { useState } from "react";
import Instance from "../../axios/Axios";
import Loading from "../../components/Loading";
import { useSWRConfig } from "swr";
import useSWR from "swr";

import ClockSvg from "../../components/ClockSvg";
import Pause from "../../assets/icons/Pause";
import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";

function Play() {
  const [isRecording, setIsRecording] = useState(false);
  const [presentAlert] = useIonAlert();

  const [audioHex, setAudioHex] = useState(null);
  const [jobPosting, setJobPosting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const history = useHistory();

  const { stripe, isGooglePayAvailable } = useCapacitorStripe();
  const { data } = useSWR(isGooglePayAvailable && "create-payment-intent");
  const { data: me } = useSWR("auth/me");

  const { mutate } = useSWRConfig();

  const createPaymentToken = async () => {
    try {
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

      if (isGooglePayAvailable) {
        const result = await stripe.presentGooglePay();
        return result;
      }
    } catch (e) {
      console.log("error Payment Method ID:", console.log(JSON.stringify(e)));
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
        console.log("in play through");
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
    const hasNoLocation = !locationPermission || locationPermission.location !== 'granted';

    if (hasNoLocation) {
    
        history.push('/location-error')

    }


    if (!me.data.defaultPaymentMethod) {
      setJobPosting(false);
      history.push("/billing?recorded=true");
      return;
    }
  
    try {
      if (me?.data?.defaultPaymentMethod === "google-pay") {
        const paymentResult = await createPaymentToken();
        if (paymentResult?.paymentResult !== "googlePayCompleted") {
          throw new Error("Google Pay payment was not completed");
        }
      } else {
        await Instance.post("/charge-card", {
          title: "Immigration",
          serviceType: "JOB",
        });
      }
  
      await Instance.post("/add-job", {
        audioType: audioHex.mimeType,
        audioHex: audioHex.recordDataBase64,

      });
  
      setAudioHex(null);
      setIsPlaying(false);
      audioRef.current = null;
      setJobPosting(false);
      mutate("job-notifications");
      mutate("create-payment-intent");
      mutate("user-payments");

      history.push("/send-success");
    } catch (error) {
      setJobPosting(false);
      console.error(error);
  
      if (me?.data?.defaultPaymentMethod === "google-pay" && error.message === "Google Pay payment was not completed") {
        history.push(`/payment-error`);
      }

    }
  };

  const RecordStart = () => {
    VoiceRecorder.startRecording()
      .then((result) => {
        console.log("-->>start", JSON.stringify(result));
        setIsRecording(true);
      })
      .catch((error) => console.log(error));
  };

  const RecordStop = () => {
    VoiceRecorder.stopRecording()
      .then((result) => {
        setAudioHex(result.value);
        setIsRecording(false);
      })
      .catch((error) => {
        setIsRecording(false);
        console.log("-->>>", error);
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
                className={
                  "absolute inset-x-0  animate-ping border-[1.5px] border-purple w-32 h-32 rounded-full -z-10 "
                }
              />
              <div
                className={
                  "absolute inset-x-0 border-[1.5px] border-purple w-32 h-32 rounded-full -z-10  animate-[ping_1s_linear_infinite]"
                }
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="h-[40px] flex items-center justify-center w-full">
                <div className="bg-[#D9D9D960] rounded-xl  py-[9px] flex  gap-2 items-center  px-3 w-full">
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
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
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
            <div className="text-sm text-black w-full text-center">
              Press to listen & Slide to send
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default Play;
