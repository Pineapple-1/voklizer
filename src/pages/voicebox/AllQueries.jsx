import React from "react";
import useSwr from "swr";
import Base from "../../layout/Base";
import MessageGroup from "./components/MessageGroup";
import Loading from "../../components/Loading";

function Queries() {
  const { data, isLoading } = useSwr("user-jobs?page=1");
  return (
    <Base>
      {!isLoading && data?.jobs?.length === 0 ? (
        <div className="h-full flex flex-col gap-8 items-center justify-center">
          <img src="/no-message.svg" alt="" className="w-56 h-56 " />
          <div className=" capitalize">No Replies available at the moment!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8  py-5">
          {!isLoading && data?.jobs?.map((item) => <MessageGroup job={item} />)}
        </div>
      )}

      <Loading open={isLoading} message={"Fetching Queries"} />
    </Base>
  );
}

export default Queries;
