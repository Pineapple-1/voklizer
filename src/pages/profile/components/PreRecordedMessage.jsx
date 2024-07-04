import PlayIcon from "../../../assets/icons/PlayIcon";
import Delivered from "../../../assets/icons/Delivered";
import Ticks from "../../../assets/icons/Ticks";
import { MusicBarsSmall } from "../../../components/MusicBars";
import clsx from "clsx";
import Pause from "../../../assets/icons/Pause";

import { useRef, useState } from "react";

function PreRecordedMessage({ url }) {
  const [audioState, setAudioState] = useState({
    isPaused: false,
    isPlaying: false,
    url: null,
  });
  const ref = useRef();

  const listen = () => {
    if (audioState.url === url) {
      if (audioState.isPaused) {
        ref.current?.play();
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: url,
        });
      } else {
        ref.current?.pause();

        setAudioState({
          isPaused: true,
          isPlaying: true,
          url: url,
        });
      }
    } else {
      if (ref?.current) {
        ref.current?.pause();
        ref.current = null;
      }
      ref.current = new Audio(
        `https://storage.googleapis.com/voklizer-dev/${url}`
      );

      ref.current.oncanplaythrough = () => {
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: url,
        });
        ref.current.play();
      };

      ref.current.onended = () => {
        setAudioState({
          isPaused: false,
          isPlaying: false,
          url: null,
        });
      };

      ref.current.load();
    }
  };

  return (
    <>
      <div className={clsx("flex flex-col  w-[196px]")}>
        <div
          className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]"
          onClick={() => listen()}
        >
          <div className="bg-[#D9D9D9] h-[42px] w-[42px] flex items-center justify-center rounded-full">
            {audioState.isPlaying && audioState.url === url ? (
              audioState.isPaused ? (
                <PlayIcon className={"text-purple"} />
              ) : (
                <Pause className={"w-8 h-8 text-purple"} />
              )
            ) : (
              <PlayIcon className={"text-purple"} />
            )}
          </div>

          {audioState.isPlaying &&
          audioState.url === url &&
          !audioState.isPaused ? (
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
      </div>
    </>
  );
}

export default PreRecordedMessage;
