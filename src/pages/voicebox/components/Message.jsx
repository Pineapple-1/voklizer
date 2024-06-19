import { useState } from "react";
import PlayIcon from "../../../assets/icons/PlayIcon";
import Delivered from "../../../assets/icons/Delivered";
import Ticks from "../../../assets/icons/Ticks";
import useSwr from "swr";
import { MusicBarsSmall } from "../../../components/MusicBars";
import clsx from "clsx";

function Message() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data, isLoading } = useSwr("user-jobs?page=1&limit=1");

  const listen = () => {
    if (!isPlaying) {
      const audio = new Audio(
        `https://storage.googleapis.com/voklizer-dev/${data?.jobs?.[0]?.messageLink}`
      );

      audio.oncanplaythrough = () => {
        console.log("in play through");
        setIsPlaying(true);
        audio.play();
      };

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.load();
    }
  };
  return (
    <>
      <div
        className={clsx(
          "flex flex-col  w-[196px]",
          isLoading && "animate-pulse"
        )}
      >
        <div className="flex items-center gap-2 justify-end">
          <div className="text-[9px] text-[#A3A3A3] leading-[9px]">
            Delivered
          </div>
          <Delivered />
        </div>

        <div
          className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]"
          onClick={() => !isLoading && listen()}
        >
          <div className="bg-[#D9D9D9] h-[42px] w-[42px] flex items-center justify-center rounded-full">
            <PlayIcon className="text-purple" />
          </div>

          {isPlaying ? (
            <div className="w-[121.02px] h-[32px] flex items-center justify-center -ml-1">
              <MusicBarsSmall isAnimating />
            </div>
          ) : (
            <img
              className="w-[121.02px] h-[32px]"
              src="/Ripple.svg"
              alt="ripple"
            />
          )}
        </div>

        <div className="flex gap-1 mt-1.5 justify-end">
          <Ticks />
          <div className="text-[7px] leading-[9px] text-[#A3A3A3]">
            Sunday / 17:36
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
