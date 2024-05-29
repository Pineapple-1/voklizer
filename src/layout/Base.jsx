import React from "react";
import {
  useIonViewWillEnter,
  IonContent,
  IonPage,
  IonMenuButton,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";

import { StatusBar, Style } from "@capacitor/status-bar";

import { useHistory } from "react-router-dom";

import CardIcon from "../assets/icons/CardIcon";

import PersonIcon from "../assets/icons/PersonIcon";
import WalletIcon from "../assets/icons/WalletIcon";
import SupportIcon from "../assets/icons/SupportIcon";
import SpeakerIcon from "../assets/icons/SpeakerIcon";
import HomeIconSm from "../assets/icons/HomeIconSm";

function Base({ children }) {
  const history = useHistory();

  useIonViewWillEnter(() => {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: "#FFFFFF" });
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

      <IonPage>
        <IonContent>
          <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
            <div className="flex flex-col gap-5">
              <div className=" flex justify-between">
                <div onClick={() => history.push("/")}>
                  <HomeIcon />
                </div>

                <div className="">
                  <IonMenuButton>
                    <BurgerIcon />
                  </IonMenuButton>
                </div>
              </div>

              <div className="h-max flex flex-1 flex-col">{children}</div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Base;
