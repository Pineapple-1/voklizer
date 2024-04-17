import { useState } from "react";
import UserHomeLayout from "../layout/UserHomeLayout";
import MicIcon from "../assets/Mic.svg";
import MusicBars from "../components/MusicBars";
import Stopwatch from "../assets/Stopwatch.svg";
import PlayBtn from "../assets/Play.svg";
import Ripple from "../assets/Ripple.svg";

function Play() {
  const [record, setRecord] = useState(false);
  return (
    <UserHomeLayout>
      <div className="flex flex-col items-center h-full justify-between">
        <div />
        <div
          className="w-[132px] h-[132px] bg-[#161A1D] rounded-full flex items-center justify-center "
          onClick={() => setRecord(!record)}
        >
          {record ? (
            <img src={MicIcon} alt="" />
          ) : (
            <img className="ml-3" src={PlayBtn} alt="" />
          )}
        </div>
        <div className="flex flex-col gap-3 items-center">
          <img className="w-[28px] h-[33px]" src={Stopwatch} alt="" />
          <div className="flex flex-col gap-6 ">
            {record ? <img src={Ripple} alt="" /> : <MusicBars isAnimating />}
            <div className="text-[10px] leading-3 text-black w-full text-center">
              Press to listen & Slide to send
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default Play;
