import useSwr from "swr";
import Base from "../../layout/Base";
import Loading from "../../components/Loading";
import {useRef} from "react";
import MessageAndReply from "./components/MessageAndReply.jsx";
import {useAtom} from "jotai";
import {audioAtom} from "../../state.js";
import {useIonViewWillLeave} from "@ionic/react";

export default function AllReplies() {
  const {data, isLoading} = useSwr("service-provider-offers");
  const messageRef = useRef()

  const [_, setAudioState] = useAtom(audioAtom);


  useIonViewWillLeave(() => {
    console.log("leaving.........");
    setTimeout(() => {
      messageRef.current.pause()
      messageRef.current = null
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
    <Base>
      {!isLoading && data?.offers?.length === 0 ? (
        <div className="h-full flex flex-col gap-3 items-center justify-center">
          <img src="/no-message.svg" alt="" className="w-56 h-56 "/>
          <div className=" capitalize">No Replies available at the moment!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8  py-5">
          {!isLoading && data?.offers?.map((item) => <MessageAndReply key={item.id} job={item}
                                                                      messageRef={messageRef}/>)}
        </div>
      )}

      <Loading open={isLoading} message={"Fetching Queries"}/>
    </Base>
  );
}


