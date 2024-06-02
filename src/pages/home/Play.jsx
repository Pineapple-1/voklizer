import UserHomeLayout from "../../layout/UserHomeLayout";
import MusicBars from "../../components/MusicBars";

import { VoiceRecorder } from "capacitor-voice-recorder";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import Instance from "../../axios/Axios";

import { useEffect } from "react";




function Play() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioHex, setAudioHex] = useState(null);

  const [isPlaying, setIsPlaying] = useState("");
  const history = useHistory();

  const PlayAudio = () => {
    const audioRef = new Audio(
      `data:${audioHex.mimeType};base64,${audioHex.recordDataBase64}`
    );
    audioRef.oncanplaythrough = () => {
      console.log("in play through");
      setIsPlaying(true);
      audioRef.play();
    };

    audioRef.onended = () => {
      setIsPlaying(false);
    };

    audioRef.load();
  };

  const SendAudio = () => {

    // console.log(typeof audioHex.mimeType, typeof audioHex.recordDataBase64);
    const body = {
      "audioType":"audio/aac",
      "audioHex": "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"
    }
    Instance.post("/add-job", body)
      .then(() => {
        history.push("/send-success");
      })
      .catch((e) => console.log("errors", JSON.stringify(e)));
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

        setAudioHex(result.value);
        console.log("-->>>", result.value.mimeType);
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

  // useEffect(() => {
  //   StatusBar.setStyle({ style: Style.Light });
  //   StatusBar.setBackgroundColor({ color: "#F5F5F5" });
  // });

  return (
    <UserHomeLayout>
      <div className="flex flex-col items-center h-full justify-end  w-full  gap-12">
        <button onClick={SendAudio}>send again</button>
        <div className="relative flex justify-center items-center">
          {isRecording && (
            <>
              <div
                className={
                  "absolute -inset-4 animate-ping border border-purple w-40 h-40 rounded-full -z-10 "
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
            <div className="h-[40px] flex items-center justify-center w-full">
              <div className="bg-[#D9D9D960] rounded-xl  py-[9px] flex  gap-2 items-center  px-3 w-full">
                <button className="text-sm" onClick={() => setAudioHex(null)}>
                  Cancel
                </button>
                <div className="h-1.5 bg-purple rounded-2xl flex-1" />
                <button className="text-sm " onClick={SendAudio}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[40px] flex items-center justify-center w-full">
              <img className="w-[28px] h-[33px]" src="/Stopwatch.svg" alt="" />
            </div>
          )}

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
