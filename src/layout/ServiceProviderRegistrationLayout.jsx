import React from "react";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";

import Logo from "../assets/logos/Logo.svg";
import BtmLogo from "../assets/logos/Logo-Alt.svg";
import { useHistory } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";

function ServiceProviderRegistrationLayout({ children }) {
  const history = useHistory();

  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: "#F5F5F5" });
  };

  useIonViewWillEnter(() => {
    setStatusBarStyleLight();
  });

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

  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
          <div className="flex flex-col gap-5">
            <div className=" flex justify-between">
              <div onClick={() => history.push("/")}>
                <HomeIcon />
              </div>

              <div>
                <BurgerIcon />
              </div>
            </div>
            <img
              className="w-[73px] h-[66px] m-auto"
              src={Logo}
              alt="Voklizer logo at the top"
            />
          </div>
          <div className="h-max flex flex-1 flex-col justify-center">
            {children}
          </div>
          <div className="flex flex-col justify-center items-center h-10">
            <div className="flex flex-col gap-2 items-center">
              <img
                className="h-5 w-[105px]"
                src={BtmLogo}
                alt="Voklizer logo at the bottom"
              />
              <div className="text-black text-[7px] leading-[8px] w-20 text-left">
                Press, Record, Send & Its solved.
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ServiceProviderRegistrationLayout;
