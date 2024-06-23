import React from "react";
import Base from "../../layout/Base";
import Message from "./components/Message";
import MessageReplies from "./components/MessageReplies";
import useSwr from "swr";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Replies() {
  const { JobId } = useParams();
  const { data: replies, isLoading: repliesLoading } = useSwr(
    `user-job/${JobId}`
  );

  console.log(JSON.stringify(replies));

  return (
    <Base>
      <div className="flex flex-col gap-10">
        <Message />

        <div className="flex flex-col w-full justify-end items-end gap-5">
          <AnimatePresence>
            {!repliesLoading &&
              replies?.job?.offers?.map((item) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-end items-end"
                >
                  <MessageReplies offer={item} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </Base>
  );
}

export default Replies;
