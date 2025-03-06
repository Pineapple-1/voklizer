import UserHomeLayout from "../../layout/UserHomeLayout";

import Pitch from "./components/Pitch";
import useSwr from "swr";
import Loading from "../../components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import {useRef, useState} from "react";
import {useIonViewWillLeave} from "@ionic/react";
import {useAtom} from "jotai";
import {audioAtom} from "../../state";

function QueryListing() {
  const { data, isLoading } = useSwr("job-notifications?page=1");
  const queryRef = useRef();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [_, setAudioState] = useAtom(audioAtom);



  useIonViewWillLeave(() => {
    console.log("leaving.........");
    setTimeout(() => {
      queryRef.current.pause()
      queryRef.current = null
    }, 0);

    setTimeout(() => {
      setAudioState({
        isPaused: false,
        isPlaying: false,
        url: null,
      });
    }, 0);
  });



  return (
    <UserHomeLayout>
      {!isLoading && data.data.length === 0 ? (
        <div className="h-full flex flex-col gap-8 items-center justify-center">
          <img src="/empty-notifications.svg" alt="" className="w-56 h-56 " />
          <div className=" capitalize">No Leads available at the moment!</div>
        </div>
      ) : (
        <motion.div
          layout
          transition={{
            layout: { duration: 0.3 },
          }}
          className="flex flex-col items-center h-full justify-end gap-6 my-6"
        >
          <AnimatePresence initial={false}>
            {!isLoading &&
              data.data.map((item, index) => (
                <Pitch
                  key={item.id}
                  location={"Lahore"}
                  area={item.category}
                  index={index}
                  focus={index === focusedIndex}
                  setFocusedIndex={setFocusedIndex}
                  url={item.userMessageLink}
                  jobId={item.jobId}
                  queryRef={queryRef}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      )}

      <Loading open={isLoading} message={"Fetching jobs"} />
    </UserHomeLayout>
  );
}

export default QueryListing;
