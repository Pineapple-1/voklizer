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

          <div className="flex flex-col justify-center items-center ">
            <img
              className="w-[122px] h-[98px]"
              src="/logos/Logo-Alt-Auth.svg"
              alt=""
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AuthLayout;
