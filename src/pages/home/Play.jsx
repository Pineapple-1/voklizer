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

  const [file, setFile] = useState("");

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
    Instance.post("/add-job", {
      audioType: audioHex.mimeType,
      audioHex: audioHex.recordDataBase64,
    })
      .then((res) => {
        console.log("res -->>", JSON.stringify(res));
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
