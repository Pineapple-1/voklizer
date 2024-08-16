import { useState } from "react";
import { useIonViewWillEnter, IonContent, IonPage } from "@ionic/react";

import HomeIcon from "../assets/icons/HomeIcon";
import BurgerIcon from "../assets/icons/BurgerIcon";

import { useHistory } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";
import Sidebar from "../components/Sidebar";

function UserHomeLayout({ children }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: "#F5F5F5" });
  };

  useIonViewWillEnter(() => {
    setStatusBarStyleLight();
  });

  return (
    <>
      <IonPage>
        <IonContent>
          <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
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

            <div className="flex flex-col gap-3 mt-5">
              <div>
                <img
                  className="w-[66px] h-[56px] m-auto"
                  src={'/logos/Logo.svg'}
                  alt="Voklizer logo at the top"
                />
              </div>

              <div className="flex flex-col justify-center items-center h-10">
                <div className="flex flex-col gap-2 items-center">
                  <img
                    className="h-[30px] w-[145px]"
                    src={'/logos/Logo-Alt.svg'}
                    alt="Voklizer logo at the bottom"
                  />
                  <div className="text-black text-[11px] leading-[11px] text-center">
                    It's that simple.
                  </div>
                </div>
              </div>
            </div>

            <div className="h-max flex flex-1 flex-col">{children}</div>
            <Sidebar open={isOpen} setOpen={setIsOpen} />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default UserHomeLayout;
