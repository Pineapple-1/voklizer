import { useState, useRef } from "react";
import { Slider, SliderThumb, SliderTrack } from "react-aria-components";
import PlayIcon from "../../../assets/icons/PlayIcon";
import clsx from "clsx";
import Star from "../../../assets/icons/Star";
import Ticks from "../../../assets/icons/Ticks";
import { IonContent, IonModal } from "@ionic/react";
import PersonIcon from "../../../assets/icons/PersonIcon";

function MessageReplies({ accepted, id }) {
  const [value, setValue] = useState(accepted ? 100 : 0);
  const modal = useRef();

  return (
    <div className={clsx("flex flex-col gap-3", value === 100 && "mr-6")}>
      <div
        className={clsx(
          "flex gap-3 items-end -mb-2",
          value === 100 ? "justify-start  ml-4" : "justify-end  mr-4"
        )}
        onClick={() => modal.current?.present()}
      >
        <div className="flex flex-col items-start">
          <div className="text-[6px] leading-[8px] text-[#8A8A8A]">
            Rochdale
          </div>
          <div className="text-[8px] leading-[10px] text-[#8A8A8A]">
            AB Solicitors
          </div>
        </div>

        <div className="bg-[#8532D8] text-[15px] leading-6 text-[#FFFFFF] flex rounded-lg items-center px-[7px] gap-1">
          <Star />
          <div>4.98</div>
        </div>
      </div>

      <Slider
        defaultValue={0}
        className="py-2 px-1 border border-[#ADADAD] rounded-[13px] w-[230px] relative h-[45px] bg-[#F1F1F1] z-10"
        value={value}
        onChange={setValue}
      >
        <SliderTrack>
          <SliderThumb
            className={clsx(
              " w-[61px] h-[61px]  flex items-center justify-center rounded-full mt-3  z-30",
              value === 100 ? "bg-[#000000]" : "bg-[#D9D9D9]"
            )}
          >
            <PlayIcon
              className={clsx(value === 100 ? "text-white" : "text-purple")}
            />
          </SliderThumb>
        </SliderTrack>
        <div
          className={clsx(
            "w-[196px] bg-[#fff] h-7 absolute z-20 rounded-[13px]",
            value === 100
              ? "flex flex-row-reverse items-center justify-between pl-5"
              : "flex items-center justify-center gap-2"
          )}
        >
          <img
            className={clsx(
              "w-[86px] h-[23px]",
              value === 100 ? "mr-4" : "ml-8"
            )}
            src="/Ripple.svg"
            alt=""
          />
          <div className="text-[10px] leading-3 text-[#000000]">From £500</div>
        </div>
      </Slider>
      <div className="flex gap-20">
        <div
          className={clsx(
            "text-[6px] leading-[8px] text-[#8A8A8A] -mt-2",
            value === 100 ? "ml-2" : "ml-6"
          )}
        >
          {value === 100 ? (
            <div className="flex gap-1">
              <Ticks />
              <div className="text-[7px] text-[#8A8A8A] leading-[8px]">
                Accepted
              </div>
            </div>
          ) : (
            "Slide to accept"
          )}
        </div>
        <div className="text-[6px] leading-[8px] text-[#8A8A8A] -mt-2">
          12/04/2024 - 11:40
        </div>
      </div>

      <IonModal
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={0.25}
        breakpoints={[0, 0.25, 0.5, 0.75]}
        handleBehavior="cycle"
      >
        <div className="bg-[#f5f5f5] h-screen p-6">
          <div className="flex justify-between">
            <div className="bg-blue-200 w-[131px] h-[247px] rounded-lg"></div>
            <div className="flex flex-col gap-5">
              <div className="flex bg-[#32C889] gap-1 items-center rounded-md justify-center w-[60px] h-[25px]">
                <Star className="text-white" />
                <div className="leading-[18px] text-[15px] text-white">4.8</div>
              </div>
              <div className="text-purple font-bold text-[16px] leading-5 w-24">
                AB Solicitors Ltd.
              </div>
              <div className="w-full bg-black h-0.5" />
              <div className="flex gap-1">
                <PersonIcon />
                <div className="text-purple text-[20px] leading-[25px] font-bold">
                  88%
                </div>
              </div>
              <div className="flex gap-1">
                <PersonIcon />
                <div className="text-purple text-[20px] leading-[25px] font-bold">
                  4%
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonModal>
    </div>
  );
}

export default MessageReplies;
