import React from "react";
import Base from "../../layout/Base";
import Message from "./components/Message";
import MessageReplies from "./components/MessageReplies";
import useSwr from "swr";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function Replies() {
  const { jobId } = useParams();
  const { data: replies, isLoading: repliesLoading } = useSwr(
    `user-job/${jobId}`
  );

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
      <Loading open={repliesLoading} message={"Fetching Replies"} />
    </Base>
  );
}

export default Replies;
