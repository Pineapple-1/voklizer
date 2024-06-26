import UserHomeLayout from "../../layout/UserHomeLayout";
import { MusicBars } from "../../components/MusicBars";
import { motion } from "framer-motion";
import { useRef } from "react";

import { VoiceRecorder } from "capacitor-voice-recorder";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import Instance from "../../axios/Axios";
import Loading from "../../components/Loading";
import { useSWRConfig } from "swr";

function Play() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioHex, setAudioHex] = useState(null);
  const [jobPosting, setJobPosting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const history = useHistory();
  const { mutate } = useSWRConfig();

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

  const SendAudio = () => {
    setJobPosting(true);

    Instance.post("/add-job", {
      audioType: audioHex.mimeType,
      audioHex: audioHex.recordDataBase64,
    })
      .then((res) => {
        setAudioHex(null);
        setIsPlaying(false);
        audioRef.current = null;
        setJobPosting(false);
        mutate("job-notifications");
        history.push("/send-success");
      })
      .catch((e) => console.log("errors", JSON.stringify(e)));
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
              onClick={PlayAudio}
            >
              <img className="ml-3 " src="/Play.svg" alt="" />
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
                <img
                  className="w-[28px] h-[33px]"
                  src="/Stopwatch.svg"
                  alt=""
                />
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
            <div className="text-xs leading-3 text-black w-full text-center">
              Press to listen & Slide to send
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default Play;
