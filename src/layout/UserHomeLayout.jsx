import {useState} from "react";
import {useIonViewWillEnter, IonContent, IonPage, } from "@ionic/react";

import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";

import {useHistory} from "react-router-dom";
import {StatusBar, Style} from "@capacitor/status-bar";
import Sidebar from "../components/Sidebar";
import {isPlatform} from "@ionic/react";
import clsx from "clsx";
import {Footer} from "../components/Footer.jsx";


function UserHomeLayout({children}) {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);


    const setStatusBarStyleLight = async () => {
        await StatusBar.setStyle({style: Style.Light});
        await StatusBar.setBackgroundColor({color: "#F5F5F5"});
    };

    useIonViewWillEnter(() => {
        setStatusBarStyleLight();
    });


    return (<>
        <IonPage>
            <IonContent>
                <div
                    className={clsx("h-full bg-gray/50 px-6 pb-10 flex flex-col ", isPlatform("ios") ? "pt-16" : "pt-10")}>
                    <div className="flex flex-col gap-5">
                        <div className=" flex justify-between">
                            <div onClick={() => history.push("/landing")}>
                                <HomeIcon />
                            </div>

                            <div onClick={() => setIsOpen((open) => !open)}>
                                <BurgerIcon />
                            </div>
                        </div>
                    </div>


                    <div className="h-max flex flex-1 flex-col ">{children}</div>
                    <Sidebar open={isOpen} setOpen={setIsOpen} />
                </div>



            </IonContent>
        </IonPage>
    </>);
}

export default UserHomeLayout;
