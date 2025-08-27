import {IonContent, IonFooter, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from "@ionic/react";

import clsx from "clsx";
import {isPlatform} from "@ionic/react";
import BtmLogo from "../assets/logos/Logo-Alt.svg";
import {StatusBar, Style} from "@capacitor/status-bar";
import {Footer} from "../components/Footer.jsx";

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
            <IonContent scrollY={false}>
                <div className={clsx("h-full bg-gray/50 px-6 pb-10 flex flex-col  pt-20 ")}>
                    <div className="text-center font-semibold mb-9">
                        Company Details
                    </div>
                    <div className="h-max flex flex-1 flex-col justify-start pb-14">
                        {children}
                    </div>
                </div>

                <Footer />
            </IonContent>

        </IonPage>
    );
}

export default ServiceProviderRegistrationLayout;
