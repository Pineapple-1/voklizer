import PlayIcon from "../../../assets/icons/PlayIcon";
import Delivered from "../../../assets/icons/Delivered";
import Ticks from "../../../assets/icons/Ticks";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

function MessageGroup({ job }) {
  const history = useHistory();

  return (
    <>
      <div className={clsx("flex flex-col  w-full  flex-start")}>
        <div className="flex items-center gap-2 justify-between px-4 mb-2">
          <div className="flex gap-1 mt-1.5  items-center  ">
            <Ticks />
            <div className="text-[12px] leading-[15px] text-[#A3A3A3]">
              {format(job.createdAt, "EEEE / HH:mm")}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 ">
            <div className="text-[12px] text-[#A3A3A3] leading-[15px]">
              Delivered
            </div>
            <Delivered />
          </div>
        </div>

        <div
          className="border relative border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-start h-[56px] px-2.5"
          onClick={() => {
            history.push(`replies/${job.id}`);
          }}
        >
          <div className="bg-purple text-p1 text-white w-max rounded-[10px] cursor-pointer absolute  -bottom-4 mt-1  left-14 flex h-6 items-center justify-center px-3">
            {job.category}
          </div>
          <div className="bg-[#D9D9D9] h-[42px] w-[42px] flex items-center justify-center rounded-full">
            <PlayIcon className="text-purple" />
          </div>
          <div className="bg-black w-[21px] h-[21px] rounded-full text-white flex items-center justify-center text-[12px] leading-3 absolute -right-1 -bottom-1.5">
            {job.offerCount}
          </div>

          <img
            className="w-[121.02px] h-[32px]"
            src="/Ripple.svg"
            alt="ripple"
          />
        </div>
      </div>
    </>
  );
}

export default MessageGroup;
