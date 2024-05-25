import React from "react";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";

import { StatusBar, Style } from "@capacitor/status-bar";

import { useHistory } from "react-router-dom";

function Base({ children }) {
  const history = useHistory();

  useIonViewWillEnter(() => {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: "#F5F5F550" });
  });

  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
          <div className="flex flex-col gap-5">
            <div className=" flex justify-between">
              <div onClick={() => history.push("/listing")}>
                <HomeIcon />
              </div>

              <div onClick={() => history.push("/login")}>
                <BurgerIcon />
              </div>
            </div>

            <div className="h-max flex flex-1 flex-col">{children}</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Base;
