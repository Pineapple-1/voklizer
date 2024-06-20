import React from "react";
import Base from "../../layout/Base";
import Message from "./components/Message";
import MessageReplies from "./components/MessageReplies";
import useSwr from "swr";

function Replies() {
  const { data } = useSwr("user-jobs?page=1&limit=1");

  const { data: replies, isLoading: repliesLoading } = useSwr(
    data&&`user-job/${data?.jobs?.[0]?.id}`
  );


  console.log(JSON.stringify(replies))

  return (
    <Base>
      <div className="flex flex-col gap-10">
        <Message />

        <div className="flex flex-col w-full justify-end items-end gap-5">
          {!repliesLoading &&
            replies?.job?.offers?.map((item) => <MessageReplies offer={item} />)}
        </div>
      </div>
    </Base>
  );
}

export default Replies;
