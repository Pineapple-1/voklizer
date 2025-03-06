import {IonContent, IonPage, useIonViewWillEnter} from "@ionic/react";

import clsx from "clsx";
import {isPlatform} from "@ionic/react";
import BtmLogo from "../assets/logos/Logo-Alt.svg";
import {StatusBar, Style} from "@capacitor/status-bar";

function ServiceProviderRegistrationLayout({children}) {

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
        <div className={clsx("h-full bg-gray/50 px-6 pb-10 flex flex-col  pt-20")}>

          <div className="flex flex-col gap-5">
            <img
              className="w-[73px] h-[66px] m-auto"
              src={'/logos/Logo.svg'}
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
