import React from "react";
import PlayIcon from "../../../assets/icons/PlayIcon";
import Delivered from "../../../assets/icons/Delivered";
import Ticks from "../../../assets/icons/Ticks";
import useSwr from "swr";

function Message() {
  const { data, isLoading } = useSwr("user-jobs?page=1&limit=1");

  console.log("--->>", data, data?.jobs?.[0]?.messageLink);
  const listen = () => {
    const audio = new Audio(
      `https://storage.googleapis.com/voklizer-dev/${data?.jobs?.[0]?.messageLink}`
    );
    audio.play();
  };
  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col  w-[196px]">
          <div className="flex items-center gap-2 justify-end">
            <div className="text-[9px] text-[#A3A3A3] leading-[9px]">
              Delivered
            </div>
            <Delivered />
          </div>

          <div className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]">
            <div
              className="bg-[#D9D9D9] h-[42px] w-[42px] flex items-center justify-center rounded-full"
              onClick={listen}
            >
              <PlayIcon className="text-purple" />
            </div>
            <img
              className="w-[121.02px] h-[32px]"
              src="/Ripple.svg"
              alt="ripple"
            />
          </div>

          <div className="flex gap-1 mt-1.5 justify-end">
            <Ticks />
            <div className="text-[7px] leading-[9px] text-[#A3A3A3]">
              Sunday / 17:36
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-[196px] h-[56px] rounded-[35px] animate-pulse bg-[#c0c0c0] " />
      )}
    </>
  );
}

export default Message;
