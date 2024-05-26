import React, { useRef } from "react";
import Base from "../../layout/Base";
import Message from "./components/Message";
import MessageReplies from "./components/MessageReplies";

function Replies() {
  return (
    <Base>
      <div className="flex flex-col gap-10">
        <Message />

        <div className="flex flex-col w-full justify-end items-end gap-5">
          <MessageReplies />
          <MessageReplies accepted />
          <MessageReplies />
        </div>
      </div>
    </Base>
  );
}

export default Replies;
