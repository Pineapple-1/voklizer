import React from "react";
import Base from "../../layout/Base";
import Message from "./components/Message";
import MessageReplies from "./components/MessageReplies";
import useSwr from "swr";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useRef } from "react";

function Replies() {
  const { jobId } = useParams();
  const { data, isLoading } = useSwr(`user-job/${jobId}`);
  const vokRef = useRef();

  return (
    <Base>
      <div className="flex flex-col gap-10">
        <Message url={data?.job?.messageLink} vokRef={vokRef} />

        <div className="flex flex-col w-full justify-end items-end gap-5">
          {!isLoading &&
            data?.job?.offers?.map((item) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full justify-end items-end gap-5"
              >
                <MessageReplies offer={item} vokRef={vokRef} />
              </motion.div>
            ))}
        </div>
      </div>
      <Loading open={isLoading} message={"Fetching Replies"} />
    </Base>
  );
}

export default Replies;
