import { useState } from "react";
import UserHomeLayout from "../layout/UserHomeLayout";
import MicIcon from "../assets/Mic.svg";
import MusicBars from "../components/MusicBars";
import Stopwatch from "../assets/Stopwatch.svg";
import PlayBtn from "../assets/Play.svg";
import Ripple from "../assets/Ripple.svg";
import { VoiceRecorder } from "capacitor-voice-recorder";

function Play() {
  const [record, setRecord] = useState(false);
  const [audioHex, setAudioHex] = useState("");

  const PlayAudio = () => {

      const audioRef = new Audio(`data:audio/aac;base64,${audioHex}`);
      audioRef.oncanplaythrough = () => audioRef.play();
      audioRef.load();
      
 
  };

  const RecordStop = () => {
    VoiceRecorder.stopRecording()
      .then((result) => {
        console.log("-->>stop", JSON.stringify(result));
        setAudioHex(result.value.recordDataBase64)
      })
      .catch((error) => console.log(error));

    setRecord(!record);
  };

  const RecordStart = () => {
    VoiceRecorder.requestAudioRecordingPermission()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));

    VoiceRecorder.startRecording()
      .then((result) => console.log("-->>start", JSON.stringify(result)))
      .catch((error) => console.log(error));

    setRecord(!record);
  };

  return (
    <UserHomeLayout>
      <div className="flex flex-col items-center h-full justify-between">
        <div className="bg-purple w-10 h-10 rounded-3xl" onClick={() => RecordStop()} >stop</div>
        <div className="bg-pink-100 w-10 h-10 rounded" onClick={() => PlayAudio()} >play</div>

        <div
          className="w-[132px] h-[132px] bg-[#161A1D] rounded-full flex items-center justify-center "
          onClick={() => RecordStart()}
        >
          {record ? (
            <img className="ml-3" src={PlayBtn} alt="" />
          ) : (
            <img src={MicIcon} alt="" />
          )}
        </div>
        <div className="flex flex-col gap-3 items-center">
          <img className="w-[28px] h-[33px]" src={Stopwatch} alt="" />
          <div className="flex flex-col gap-6 ">
            {record ? <MusicBars isAnimating /> : <img src={Ripple} alt="" />}
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
