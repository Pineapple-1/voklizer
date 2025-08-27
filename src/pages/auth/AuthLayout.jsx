import {IonContent, IonPage,  useIonViewWillEnter} from "@ionic/react";
import {StatusBar, Style} from "@capacitor/status-bar";
import clsx from "clsx";
import {Footer} from "../../components/Footer.jsx";

function AuthLayout({children}) {
  useIonViewWillEnter(() => {
    StatusBar.setStyle({style: Style.Light});
    StatusBar.setBackgroundColor({color: "#F5F5F5"});
  });

  return (
    <IonPage>
      <IonContent  scrollY={false}>
        <div
          className={clsx(
            "h-full bg-gray/50 px-6 pb-10 flex flex-col pt-24",
          )}
        >
          <div className="flex-grow">{children}</div>


        </div>


          <Footer/>
      </IonContent>


    </IonPage>
  );
}

export default AuthLayout;
