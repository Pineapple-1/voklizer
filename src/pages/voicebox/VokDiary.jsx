import { useState } from "react";

import { useIonViewWillEnter, IonContent, IonPage } from "@ionic/react";

import HomeIcon from "../../assets/icons/HomeIcon";
import BurgerIcon from "../../assets/icons/BurgerIcon";
import Book from "../../assets/icons/Book";
import Pointer from "../../assets/icons/Pointer";

import { useHistory } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";

import Calender from "./components/Calender";
import MeetingInfo from "./components/MeetingInfo";
import Sidebar from "../../components/Sidebar";


function VokDairy() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);


  const history = useHistory();

  useIonViewWillEnter(() => {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: "#F5F5F5" });
  });

  return (
    <>
      <IonPage>
        <IonContent>
          <div className="h-full bg-gray/50 py-10 flex flex-col">
            <div className="flex flex-col gap-5">
              <div className="px-6  flex justify-between items-center pb-3">
                <div onClick={() => history.push("/")}>
                  <HomeIcon />
                </div>

                <div onClick={() => setIsOpen((open) => !open)}>
                  <BurgerIcon />
                </div>
              </div>
              <div className="h-max flex flex-1 flex-col">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center px-6 ">
                    <div className="flex flex-col gap-2 relative">
                      <div className="text-[13px] leading-[16px] text-[#030303]">
                        Calendar View
                      </div>
                      <div className="h-0.5 bg-black w-full" />
                      <div className="absolute top-5 -right-6">
                        <Pointer />
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Book />
                      <div className="text-[#030303] text-[20px] leading-[21px] w-[61px]">
                        Vok Diary
                      </div>
                    </div>
                  </div>
                  <Calender mode="single" selected={date} onSelect={setDate} />
                  <MeetingInfo />
                  <MeetingInfo />
                </div>
              </div>
            </div>
            <Sidebar open={isOpen} setOpen={setIsOpen} />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default VokDairy;
