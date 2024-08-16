import React from "react";
import Star from "../../../assets/icons/Star";
import { useHistory } from "react-router-dom";

function Reel({ id, name, place, thumbnail }) {
  const history = useHistory();
  return (
    <div
      className="flex flex-col gap-2 relative flex-shrink-0 "
      onClick={() => history.push(`/player/${id}`)}
    >
      <div className="rounded-lg border-2 border-black relative  overflow-hidden">
        <img className="w-[132px] h-[180px] " src={thumbnail} alt="" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex  justify-between">
          <div className="text-xs font-bold">{name}</div>

          <div className="px-1 py-0.5 flex justify-between bg-purple rounded-bl-lg rounded-tl-lg border-r-2 border-black items-center absolute bottom-[52px] right-0 gap-1">
            <div className="text-xs text-white font-bold">4.98</div>
            <Star />
          </div>
        </div>

        <div className="text-xs text-[#B1B1B1]">{place}</div>
      </div>
    </div>
  );
}

export default Reel;
