import React from "react";
import StopWatchIcon from "../../../assets/icons/StopWatchIcon";
import MicIcon from "../../../assets/icons/Mic";
import MicSm from "../../../assets/icons/MicSm";
import PlayIcon from "../../../assets/icons/PlayIcon";
import clsx from "clsx";

import { useState } from "react";
import { useRef } from "react";
import { VoiceRecorder } from "capacitor-voice-recorder";
import { useHistory } from "react-router-dom";
import Instance from "../../../axios/Axios";
import Loading from "../../../components/Loading";
import { useSWRConfig } from "swr";

function Pitch({ location, area, focus, url, jobId }) {
  const { mutate } = useSWRConfig();

  const [open, setOpen] = useState(focus ? true : false);
  const [isReplying, setIsReplying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setisListening] = useState(false);
  const [replyhex, setReplyhex] = useState(null);

  const [sending, setSending] = useState(false);

  const history = useHistory();
  const recordedRef = useRef(null);
  const listingRef = useRef(null);

  const cancel = () => {
    recordingStop();
    setReplyhex(null);
    setIsReplying(false);

    setisListening(false);
    listingRef.current?.pause();
    listingRef.current = null;

    if (isRecording) {
      setIsRecording(false);
      recordedRef.current?.pause();
      recordedRef.current = null;
    }
  };

  const PlayRecordedAudio = () => {
    recordedRef.current = new Audio(
      `data:${replyhex.mimeType};base64,${replyhex.recordDataBase64}`
    );

    recordedRef.current.oncanplaythrough = () => {
      console.log("in recorder play...");
      recordedRef.current.play();
    };

    recordedRef.current.onended = () => {
      setisListening(false);
    };

    recordedRef.current.load();
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
        setisListening(true);
        console.log("in here");
        PlayRecordedAudio();
      }
    } else {
      // setisListening(true);

      if (!isListening) {
        console.log("listning", url);

        listingRef.current = new Audio(
          `https://storage.googleapis.com/voklizer-dev/${url}`
        );

        listingRef.current.oncanplaythrough = () => {
          console.log("in play through");
          setisListening(true);
          listingRef.current.play();
        };

        listingRef.current.onended = () => {
          setisListening(false);
        };
      }
    }
  };

  const reply = () => {
    setisListening(false);
    setIsReplying(true);
  };

  const send = () => {
    setSending(true);
    Instance.post(`job-service-provider-offer/${jobId}`, {
      audioType: replyhex.mimeType,
      audioHex: replyhex.recordDataBase64,
    }).then(() => {
      mutate(`user-job/${jobId}`);
      setSending(false);
      setReplyhex(null);
      setIsReplying(false);
      setIsRecording(false);
      setisListening(false);

      history.push("/pitch-success");
    });
  };

  const recordingStart = () => {
    VoiceRecorder.requestAudioRecordingPermission()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));

    VoiceRecorder.startRecording()
      .then((result) => {
        setIsRecording(true);
      })
      .catch((error) => console.log(error));
  };

  const recordingStop = () => {
    VoiceRecorder.stopRecording()
      .then((result) => {
        console.log("-->>stop", JSON.stringify(result));

        setReplyhex(result.value);
        setIsRecording(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#EFEFEF] w-full rounded-xl">
      <div className="cursor-pointer">
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

        <div
          className={clsx(
            "flex flex-col gap-6 rounded-xl px-[15px] py-[14px] w-full",
            isReplying ? "bg-[#000]" : "bg-[#8532D8]"
          )}
        >
          {!open && (
            <div
              className="flex items-center justify-between text-white"
              onClick={() => {
                cancel();
                setOpen((open) => !open);
              }}
            >
              <div className="text-[12px] leading-[15px] font-bold">{area}</div>
              <div className=" flex flex-col">
                <div className="text-[10px] leading-[12px] font-bold">Max</div>
                <div className="text-[10px] leading-[12px] font-bold">£500</div>
              </div>
            </div>
          )}

          {open && (
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
                  ) : (
                    <PlayIcon />
                  )}
                  {(isListening || isRecording) && (
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
                <div
                  className="text-[#2B194C] text-[13px] leading-[16px] font-bold"
                  onClick={!isReplying ? reply : send}
                >
                  {isReplying ? "Send" : "Reply"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Loading open={sending} message="Replying..." />
    </div>
  );
}

export default Pitch;
