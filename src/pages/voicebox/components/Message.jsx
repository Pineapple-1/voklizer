import PlayIcon from "../../../assets/icons/PlayIcon";
import Delivered from "../../../assets/icons/Delivered";
import Ticks from "../../../assets/icons/Ticks";
import { MusicBarsSmall } from "../../../components/MusicBars";
import clsx from "clsx";
import { useAtom } from "jotai";
import { audioAtom } from "../../../state";
import Pause from "../../../assets/icons/Pause";
import { format } from "date-fns";

function Message({ job, vokRef }) {
  const [audioState, setAudioState] = useAtom(audioAtom);

  const listen = () => {
    if (audioState.url === job?.messageLink) {
      if (audioState.isPaused) {
        vokRef.current?.play();
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: job?.messageLink,
        });
      } else {
        vokRef.current?.pause();

        setAudioState({
          isPaused: true,
          isPlaying: true,
          url: job?.messageLink,
        });
      }
    } else {
      if (vokRef?.current) {
        vokRef.current?.pause();
        vokRef.current = null;
      }
      vokRef.current = new Audio(
        `https://storage.googleapis.com/voklizer-dev/${job?.messageLink}`
      );

      vokRef.current.oncanplaythrough = () => {
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: job?.messageLink,
        });
        vokRef.current.play();
      };

      vokRef.current.onended = () => {
        setAudioState({
          isPaused: false,
          isPlaying: false,
          url: null,
        });
      };

      vokRef.current.load();
    }
  };

  return (
    <>
      <div className={clsx("flex flex-col  w-[196px]")}>
        <div className="flex items-center gap-2 justify-end">
          <div className="text-[12px]  text-[#8A8A8A] leading-[9px]">
            Delivered
          </div>
          <Delivered />
        </div>

        <div
          className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]"
          onClick={() => listen()}
        >
          <div className="bg-[#D9D9D9] h-[42px] w-[42px] flex items-center justify-center rounded-full shrink-0">
            {audioState.isPlaying && audioState.url === job?.messageLink ? (
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
          audioState.url === job?.messageLink &&
          !audioState.isPaused ? (
            <div className="w-[125.02px] h-[32px] flex items-center justify-center -ml-1">
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
          <div className="text-[12px] leading-[9px] text-[#8A8A8A]">
            {format(job?.createdAt ?? new Date(), "EEEE / HH:mm")}
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
