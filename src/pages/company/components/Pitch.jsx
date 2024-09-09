import React from "react";
import StopWatchIcon from "../../../assets/icons/StopWatchIcon";
import MicIcon from "../../../assets/icons/Mic";
import MicSm from "../../../assets/icons/MicSm";
import PlayIcon from "../../../assets/icons/PlayIcon";
import clsx from "clsx";

import { useState } from "react";
import { VoiceRecorder } from "capacitor-voice-recorder";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import Loading from "../../../components/Loading";
import { useSWRConfig } from "swr";
import useSWR from "swr";

import { useAtom } from "jotai";
import { audioAtom } from "../../../state";

import { motion } from "framer-motion";
import Pause from "../../../assets/icons/Pause";

import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";

function Pitch({ location, area, focus, url, jobId, queryRef }) {
  const [audioState, setAudioState] = useAtom(audioAtom);

  const { mutate } = useSWRConfig();

  const [open, setOpen] = useState(focus ? true : false);
  const [isReplying, setIsReplying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setisListening] = useState(false);
  const [replyhex, setReplyhex] = useState(null);

  const [sending, setSending] = useState(false);
  const history = useHistory();

  const { stripe, isGooglePayAvailable } = useCapacitorStripe();
  const { data: me } = useSWR("auth/me");
  const { data } = useSWR(isGooglePayAvailable && "create-payment-intent");

  const cancel = () => {
    if (isRecording) {
      setIsRecording(false);
      recordingStop();
    }

    setReplyhex(null);
    setIsReplying(false);
    setisListening(false);
    queryRef.current?.pause();
    queryRef.current = null;
  };

  const ListenReply = () => {
    if (isReplying) {
      if (!isRecording && !replyhex) {
        recordingStart();
      }

      if (isRecording) {
        recordingStop();
      }

      if (!isRecording && replyhex) {
        const recroder = `data:${replyhex.mimeType};base64,${replyhex.recordDataBase64}`;

        listen(recroder);
      }
    } else {
      listen();
    }
  };

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

  const listen = (recorder) => {
    if (audioState.url === url) {
      if (audioState.isPaused) {
        queryRef.current?.play();
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: url,
        });
      } else {
        queryRef.current?.pause();

        setAudioState({
          isPaused: true,
          isPlaying: true,
          url: url,
        });
      }
    } else {
      if (queryRef?.current) {
        queryRef.current?.pause();
        queryRef.current = null;
      }
      queryRef.current = recorder
        ? new Audio(recorder)
        : new Audio(`https://storage.googleapis.com/voklizer-dev/${url}`);

      queryRef.current.oncanplaythrough = () => {
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: url,
        });
        queryRef.current.play();
      };

      queryRef.current.onended = () => {
        setAudioState({
          isPaused: false,
          isPlaying: false,
          url: null,
        });
      };

      queryRef.current.load();
    }
  };

  const reply = () => {
    setisListening(false);

    queryRef.current?.pause();
    queryRef.current = null;
    setAudioState({
      isPaused: false,
      isPlaying: false,
      url: null,
    });

    setIsReplying(true);
  };



  const send = async () => {
    setSending(true);
  
    if (!me?.data?.defaultPaymentMethod) {
      setSending(false);
      history.push("/billing");
      return;
    }
  
    try {
      if (me?.data?.defaultPaymentMethod === "google-pay") {
        const paymentResult = await createPaymentToken();
        if (paymentResult?.paymentResult !== "googlePayCompleted") {
          throw new Error("Payment Was Not Completed");
        }
      } else {
        await Instance.post("/charge-card", {
          title: "Immigration",
          serviceType: "Lead",
        });
      }
  
      await Instance.post(`job-service-provider-offer/${jobId}`, {
        audioType: replyhex.mimeType,
        audioHex: replyhex.recordDataBase64,
      });
  
      setSending(false);
      setReplyhex(null);
      setIsReplying(false);
      setIsRecording(false);
      setisListening(false);
      
      mutate(`user-job/${jobId}`);
      mutate("create-payment-intent");
      mutate("user-payments");
      history.push("/pitch-success");
    } catch (error) {
      setSending(false);
    
      if (me?.data?.defaultPaymentMethod === "google-pay" && error.message === "Payment Was Not Completed") {
        history.push(`/payment-error`);
      }
    
    }
  };

  const recordingStart = () => {
    VoiceRecorder.requestAudioRecordingPermission();

    VoiceRecorder.startRecording()
      .then(() => setIsRecording(true))
      .catch((error) => console.log(error));
  };

  const recordingStop = () => {
    VoiceRecorder.stopRecording()
      .then((result) => {
        setReplyhex(result.value);
        setIsRecording(false);
        setisListening(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#EFEFEF] w-full rounded-xl"
    >
      <div
        className="p-[15px] flex  justify-between"
        onClick={() => {
          cancel();
          setOpen((open) => !open);
        }}
      >
        <div className=" text-2xl font-bold">{location}</div>
        <StopWatchIcon className="text-purple" />
      </div>
      {!open && (
        <motion.div
          className={clsx(
            "flex flex-col gap-6 rounded-xl px-[15px] py-[14px] w-full",
            isReplying ? "bg-[#000]" : "bg-[#8532D8]"
          )}
          onClick={() => {
            cancel();
            setOpen((open) => !open);
          }}
        >
          <div className="flex items-center justify-between text-white">
            <div className="text-[12px] leading-[15px] font-bold">{area}</div>
            <div className=" flex flex-col">
              <div className="text-[10px] leading-[12px] font-bold">Max</div>
              <div className="text-[10px] leading-[12px] font-bold">£500</div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "flex flex-col gap-6 rounded-xl px-[15px] py-[14px] w-full transition-colors duration-300",
            isReplying ? "bg-[#000]" : "bg-[#8532D8]"
          )}
        >
          <>
            <div
              className="flex items-center justify-between"
              onClick={() => {
                cancel();
                setOpen(() => false);
              }}
            >
              <div className="flex gap-2 items-center w-full">
                <div className="text-[#231F20] text-2xl bg-white rounded-3xl font-bold px-3 flex items-center gap-2">
                  {isReplying ? (
                    <>
                      <MicSm className="text-purple" />
                      {isListening ? <div>Listen</div> : <div>Record</div>}
                    </>
                  ) : (
                    <>
                      <PlayIcon className="text-purple" />
                      <div>Lead</div>
                    </>
                  )}
                </div>
                {isReplying ? (
                  <div className=" flex justify-end w-full">
                    <div className=" h-[1px] w-1/2 bg-white" />
                  </div>
                ) : (
                  <StopWatchIcon className="text-white" />
                )}
              </div>

              {!isReplying && (
                <div className="text-white text-[24px] font-bold border border-white w-[30px] h-[30px] flex items-center justify-center rounded-lg">
                  X
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {isReplying ? (
                <div className="h-10" />
              ) : (
                <>
                  <div className="flex gap-3 items-center ">
                    <div className="text-white">{area}</div>
                    <div className="flex-1 h-[1px] bg-white " />
                  </div>
                  <div className="text-white font-bold  text-right">
                    <div className="text-[14px] leading-[18px]">Max</div>
                    <div className="text-[24px] leading-[30px]">£500</div>
                  </div>
                </>
              )}
              <div
                className="bg-[#F6F5F6] w-[88px] h-[88px] rounded-full flex justify-center items-center m-auto relative"
                onClick={ListenReply}
              >
                {isReplying ? (
                  replyhex ? (
                    <PlayIcon />
                  ) : (
                    <MicIcon className="text-purple" />
                  )
                ) : audioState.isPlaying && audioState.url === url ? (
                  audioState.isPaused ? (
                    <PlayIcon />
                  ) : (
                    <Pause className={"w-8 h-8 text-purple"} />
                  )
                ) : (
                  <PlayIcon />
                )}

                {((audioState.isPlaying &&
                  audioState.url === url &&
                  !audioState.isPaused) ||
                  isRecording) && (
                  <>
                    <div className="absolute inset-1 animate-ping border border-white w-20 h-20 rounded-full " />
                    <div className="absolute inset-1 border border-white w-20 h-20 rounded-full  animate-[ping_1s_linear_infinite]" />
                  </>
                )}
              </div>
            </div>

            <div className="w-full h-8 bg-white mt-4 flex justify-between gap-7 items-center px-[14px] rounded-lg">
              <div
                className="text-[#E7515B] text-[13px] leading-[16px] font-bold"
                onClick={cancel}
              >
                Cancel
              </div>
              <div
                className={clsx(
                  "h-2 rounded-md w-2/5",
                  isReplying ? "bg-purple" : "bg-black"
                )}
              />
              <button
                className="text-[#2B194C] text-[13px] leading-[16px] font-bold  disabled:text-[#c3c3c3] "
                onClick={!isReplying ? reply : send}
                disabled={isReplying?!replyhex:isRecording}
              >
                {isReplying ? "Send" : "Reply"}
              </button>
            </div>
          </>
        </motion.div>
      </motion.div>

      <Loading open={sending} message="Replying..." />
    </motion.div>
  );
}

export default Pitch;
