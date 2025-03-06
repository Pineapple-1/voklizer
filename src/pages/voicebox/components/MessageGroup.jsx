import PlayIcon from "../../../assets/icons/PlayIcon";
import Pause from "../../../assets/icons/Pause";

import Delivered from "../../../assets/icons/Delivered";
import Ticks from "../../../assets/icons/Ticks";
import clsx from "clsx";
import {useHistory} from "react-router-dom";
import {format} from "date-fns";
import {useAtom} from "jotai";
import {audioAtom} from "../../../state";

function MessageGroup({job, messageRef}) {
  const history = useHistory();


  const [audioState, setAudioState] = useAtom(audioAtom);

  const listen = () => {
    if (audioState.url === job.messageLink) {
      if (audioState.isPaused) {
        messageRef.current.play();
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: job.messageLink,
        });
      } else {
        messageRef.current?.pause();

        setAudioState({
          isPaused: true,
          isPlaying: true,
          url: job.messageLink,
        });
      }
    } else {
      if (messageRef?.current) {
        messageRef.current?.pause();
        messageRef.current = null;
      }
      messageRef.current = new Audio(
        `https://storage.googleapis.com/voklizer-dev/${job.messageLink}`
      );

      messageRef.current.oncanplaythrough = () => {
        setAudioState({
          isPaused: false,
          isPlaying: true,
          url: job.messageLink,
        });
        messageRef.current.play();
      };

      messageRef.current.onended = () => {
        setAudioState({
          isPaused: false,
          isPlaying: false,
          url: null,
        });
      };

      messageRef.current.load();
    }
  };


  return (
    <>
      <div className={clsx("flex flex-col  w-full  flex-start")}>
        <div className="flex items-center gap-2 justify-between px-4 mb-2">
          <div className="flex gap-1 mt-1.5  items-center  ">
            <Ticks/>
            <div className="text-[12px] leading-[15px] text-[#A3A3A3]">
              {format(job.createdAt, "EEEE / HH:mm")}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 ">
            <div className="text-[12px] text-[#A3A3A3] leading-[15px]">
              Delivered
            </div>
            <Delivered/>
          </div>
        </div>

        <div
          className="relative flex gap-[18px] bg-[#ececec] rounded-[35px]  items-center justify-start h-[56px] pl-2.5">
          <div
            className="bg-purple text-p1 text-white w-max rounded-[10px] cursor-pointer absolute  -bottom-4 mt-1  left-14 flex h-6 items-center justify-center px-3 ">
            {job.category}
          </div>
          <div
            className="bg-[#D9D9D9] h-[42px] w-[42px] flex items-center justify-center rounded-full shrink-0"
            onClick={() => listen()}
          >
            {audioState.isPlaying &&
            audioState.url === job.messageLink ? (
              audioState.isPaused ? (
                <PlayIcon className="text-purple"/>
              ) : (
                <Pause className="w-8 h-8 text-purple "/>
              )
            ) : (
              <PlayIcon className="text-purple"/>
            )}


          </div>

          <div className="flex items-center justify-between w-full">
            <img
              className="w-[96px] h-[24px]"
              src="/ripples-pink.svg"
              alt="ripple"
            />

            <div
              className="bg-[#E9D3FE] text-purple rounded-[35px] h-[56px] flex flex-col items-center justify-center px-3 py-[14px]"
              onClick={() => {
                history.push(`replies/${job.id}`);
              }}
            >
              <div className="flex gap-2 items-center justify-between">
                <div className="text-[24px] leading-[30px]">
                  {job.offerCount}
                </div>
                <div className="flex flex-col items-start">
                  <div className=" text-[12px] leading-0 ">Press here to</div>
                  <div className="text-[14px] -mt-1"> see replies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageGroup;
