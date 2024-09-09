import React from "react";

function Meet({ meet }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="bg-purple text-white rounded-md pl-1.5 text-[11px] pr-4">
          {meet.date}
        </div>
        <div className="text-[10px]">{meet.title}</div>
      </div>
      <div className="flex justify-between">
        <div>{meet.description}</div>

        <div className="flex gap-3 items-center justify-center">
          <div>{meet.startTime}</div>
          <span className="font-bold">&gt;</span>

          <div>{meet.endTime}</div>
        </div>
      </div>
      <hr className="bg-purple h-0.5" />
    </div>
  );
}

export default Meet;
