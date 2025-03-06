import {useState} from "react";

import {useIonViewWillEnter, IonContent, IonPage, useIonViewWillLeave} from "@ionic/react";
import {StatusBar, Style} from "@capacitor/status-bar";
import {useHistory} from "react-router-dom";

import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";
import clsx from "clsx";
import {isPlatform} from "@ionic/react";

import Sidebar from "../components/Sidebar";


function Base({children}) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);


  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({style: Style.Light});
    await StatusBar.setBackgroundColor({color: "#F5F5F5"});
  };

  useIonViewWillEnter(() => {
    setStatusBarStyleLight();
  });

  return (
    <IonPage>
      <IonContent>

        <div className={clsx("h-full bg-gray/50 px-6 pb-10 flex flex-col ", isPlatform("ios") ? "pt-16" : "pt-10")}>

          <div className="flex h-full flex-col gap-5">
            <div className=" flex justify-between items-center">
              <div onClick={() => history.push("/landing")}>
                <HomeIcon/>
              </div>

              <div onClick={() => setIsOpen((open) => !open)}>
                <BurgerIcon/>
              </div>
            </div>

            <div className="h-max flex flex-1 flex-col">{children}</div>
          </div>
          <Sidebar open={isOpen} setOpen={setIsOpen}/>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Base;
