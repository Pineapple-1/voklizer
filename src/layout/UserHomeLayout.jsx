import React from "react";
import {
  useIonViewWillEnter,
  IonContent,
  IonPage,
  IonMenuButton,
  IonMenu,
  IonMenuToggle
} from "@ionic/react";
import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";
import CardIcon from "../assets/icons/CardIcon";

import Logo from "../assets/logos/Logo.svg";
import BtmLogo from "../assets/logos/Logo-Alt.svg";
import PersonIcon from "../assets/icons/PersonIcon";
import WalletIcon from "../assets/icons/WalletIcon";
import SupportIcon from "../assets/icons/SupportIcon";
import SpeakerIcon from "../assets/icons/SpeakerIcon";
import HomeIconSm from "../assets/icons/HomeIconSm";


import { useHistory } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";

function UserHomeLayout({ children }) {
  const history = useHistory();

  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: "#FFFFFF" });
  };

  useIonViewWillEnter(() => {
    setStatusBarStyleLight();
  });

  return (
    <>
      <IonMenu contentId="main-content">
        <div className="bg-[#EEEEEE] h-screen pl-9 pr-4">
          <div className="flex flex-col gap-7">
            <div className="flex justify-between">
              <div className="text-[#CCCCCC] text-[20px] leading-[23px] w-24 mt-7">
                It's that simple.
              </div>
              <IonMenuToggle>
              <div className="text-[40px] leading-[50px] ">x</div>
              </IonMenuToggle>

            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-5">
                <HomeIconSm />
                <SpeakerIcon />
                <CardIcon />
                <PersonIcon />
                <WalletIcon />
                <SupportIcon />
              </div>
              <div className="w-[2px] h-[226px] bg-black"></div>
              <div className="flex flex-col gap-4">
                <div
                  className="text-[20px] leading-6 text-[#000] font-semibold"
                  onClick={() => history.push("/")}
                >
                  Home
                </div>
                <div
                  className="text-[20px] leading-6 text-[#000] font-semibold"
                  onClick={() => history.push("/replies")}
                >
                  Voice Box
                </div>
                <div className="text-[20px] leading-6 text-[#000] font-semibold">
                  Billing Info
                </div>
                <div className="text-[20px] leading-6 text-[#000] font-semibold">
                  Account
                </div>
                <div className="text-[20px] leading-6 text-[#000] font-semibold">
                  Wallet
                </div>
                <div className="text-[20px] leading-6 text-[#000] font-semibold">
                  Support
                </div>
              </div>
            </div>
            <div
              className="text-[20px] leading-6 text-[#000] font-semibold"
              onClick={() => history.push("/login")}
            >
              Logout
            </div>
            <div
              className="text-[20px] leading-6 text-[#000] font-semibold"
              onClick={() => history.push("/listing")}
            >
              Listings
            </div>
          </div>
        </div>
      </IonMenu>

      <IonPage id="main-content">
        <IonContent>
          <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
            <div className="flex flex-col gap-5">
              <div className=" flex justify-between">
                <div onClick={() => history.push("/")}>
                  <HomeIcon />
                </div>

                <div>
                  <IonMenuButton>
                    <BurgerIcon />
                  </IonMenuButton>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <div>
                  <img
                    className="w-[42px] h-[38px] m-auto"
                    src={Logo}
                    alt="Voklizer logo at the top"
                  />
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
            </div>
            <div className="h-max flex flex-1 flex-col">{children}</div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default UserHomeLayout;
