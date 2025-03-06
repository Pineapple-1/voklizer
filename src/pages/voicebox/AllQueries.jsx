import useSwr from "swr";
import Base from "../../layout/Base";
import MessageGroup from "./components/MessageGroup";
import Loading from "../../components/Loading";
import {useRef} from "react";
import {useIonViewWillLeave} from "@ionic/react";
import {useAtom} from "jotai";
import {audioAtom} from "../../state";

function Queries() {
  const {data, isLoading} = useSwr("user-jobs?page=1");
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
      {!isLoading && data?.jobs?.length === 0 ? (
        <div className="h-full flex flex-col gap-8 items-center justify-center">
          <img src="/no-message.svg" alt="" className="w-56 h-56 "/>
          <div className=" capitalize">No Replies available at the moment!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8  py-5">
          {!isLoading && data?.jobs?.map((item) => <MessageGroup key={item.id} job={item} messageRef={messageRef}/>)}
        </div>
      )}

      <Loading open={isLoading} message={"Fetching Queries"}/>
    </Base>
  );
}

export default Queries;
