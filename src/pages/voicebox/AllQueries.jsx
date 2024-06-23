import React from "react";
import useSwr from "swr";
import Base from "../../layout/Base";
import MessageGroup from "./components/MessageGroup";

function Queries() {
  const { data, isLoading } = useSwr("user-jobs?page=1&limit=10");
  console.log(data);

  return (
    <Base>
      <div className="flex flex-col gap-8">
        {!isLoading ? (
          data.jobs.map((item) => (
            <MessageGroup url={item.messageLink} jobId={item.id} />
          ))
        ) : (
          <>
            <div className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]  w-56 animate-pulse mt-7" />
            <div className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]  w-56 animate-pulse mt-4" />
            <div className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]  w-56 animate-pulse mt-4" />{" "}
            <div className="border border-[#ADADAD] flex gap-[9px] bg-[#F1F1F1] rounded-[35px]  items-center justify-center h-[56px]  w-56 animate-pulse mt-4" />
          </>
        )}
      </div>
    </Base>
  );
}

export default Queries;
