import UserHomeLayout from "../../layout/UserHomeLayout";
import MusicBars from "../../components/MusicBars";

import { VoiceRecorder } from "capacitor-voice-recorder";
import clsx from "clsx";

import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Play() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioHex, setAudioHex] = useState("");
  const [isPlaying, setIsPlaying] = useState("");
  const history = useHistory();

  const PlayAudio = () => {
    const audioRef = new Audio(`data:audio/aac;base64,${audioHex}`);
    audioRef.oncanplaythrough = () => {
      setIsPlaying(true);
      audioRef.play();
    };

    audioRef.onended = () => {
      setIsPlaying(false);
    };

    audioRef.audioRef.load();
  };

  const SendAudio = () => {
    history.push("/send-success");
  };

  const RecordStart = () => {
    VoiceRecorder.requestAudioRecordingPermission()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));

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
        console.log("-->>stop", JSON.stringify(result));

        setAudioHex(result.value.recordDataBase64);
        setIsRecording(false);
      })
      .catch((error) => console.log(error));
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
          {isRecording && (
            <>
              <div
                className={
                  "absolute -inset-4 animate-ping border border-purple w-40 h-40 rounded-full -z-10"
                }
              />
              <div
                className={
                  "absolute -inset-4 border border-purple w-40 h-40 rounded-full -z-10  animate-[ping_1s_linear_infinite]"
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
            <div className="bg-[#D9D9D960] rounded-xl  py-[9px] flex  gap-2 items-center  px-3 w-full">
              <button className="text-sm" onClick={() => setAudioHex("")}>
                Cancel
              </button>
              <div className="h-1.5 bg-purple rounded-2xl flex-1" />
              <button className="text-sm " onClick={SendAudio}>
                send
              </button>
            </div>
          ) : (
            <img className="w-[28px] h-[33px]" src="/Stopwatch.svg" alt="" />
          )}

          <div className="flex flex-col gap-6  justify-center ">
            {isRecording || isPlaying ? (
              <MusicBars isAnimating />
            ) : (
              <img src="/Ripple.svg" alt="" />
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
