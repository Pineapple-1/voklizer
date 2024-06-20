import { useState } from "react";

import { useIonViewWillEnter, IonContent, IonPage } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useHistory } from "react-router-dom";

import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";

import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

function Base({ children }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: "#F5F5F5" });
  };

  // const backButtonHandler = () => {
  //   ev.detail.register(200, () => {
  //     history.go(-1);
  //   });
  // };

  // useEffect(() => {
  //   document.addEventListener("ionBackButton", backButtonHandler);
  //   return () => {
  //     document.removeEventListener("ionBackButton", backButtonHandler);
  //   };
  // });

  // document.addEventListener("ionBackButton", (ev) => {
  //   ev.detail.register(10, () => {
  //     console.log("Handler was called!");
  //   });
  // });

  useIonViewWillEnter(() => {
    setStatusBarStyleLight();
  });
  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
          <div className="flex flex-col gap-5">
            <div className=" flex justify-between items-center">
              <div onClick={() => history.push("/")}>
                <HomeIcon />
              </div>

              <div onClick={() => setIsOpen((open) => !open)}>
                <BurgerIcon />
              </div>
            </div>

            <div className="flex flex-col">{children}</div>
          </div>
          <Sidebar open={isOpen} setOpen={setIsOpen} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Base;
