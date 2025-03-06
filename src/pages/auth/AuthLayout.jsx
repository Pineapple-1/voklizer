import {IonContent, IonPage, useIonViewWillEnter} from "@ionic/react";
import {StatusBar, Style} from "@capacitor/status-bar";
import clsx from "clsx";

function AuthLayout({children}) {
  useIonViewWillEnter(() => {
    StatusBar.setStyle({style: Style.Light});
    StatusBar.setBackgroundColor({color: "#F5F5F5"});
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          className={clsx(
            "h-full bg-gray/50 px-6 pb-10 flex flex-col pt-24",
          )}
        >
          <div className="flex-grow">{children}</div>

          <div className="flex flex-col justify-center items-center">
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
