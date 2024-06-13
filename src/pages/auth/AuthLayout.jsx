import React from "react";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

function AuthLayout({ children }) {

  useIonViewWillEnter(() => {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: "#F5F5F5" });
  });
  
  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gray/50 px-6 py-10 flex flex-col justify-between gap-5">
          {children}

          <div className="flex flex-col justify-center items-center gap-3">
            <img className="w-[42px] h-[38px]" src="./voklizer.svg" alt="" />

            <div className="flex flex-col gap-2 items-center">
              <img
                className="h-5 w-[105px]"
                src="/logos/Logo-Alt.svg"
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

export default AuthLayout;
