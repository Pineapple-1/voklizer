import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";
import { storage } from "../../storage";
import Instance from "../../axios/Axios";

import { useAtomValue } from "jotai";
import { userAtom } from "../../state";
import Loading from "../../components/Loading";
import { useState } from "react";
import { tokenSubject$ } from "./TokenState";
import {GeometricButton} from "../../components/GeometricButton.jsx";

function Selection() {
  const history = useHistory();
  const user = useAtomValue(userAtom);

  const [creatingUser, setCreatingUser] = useState(false);

  useIonViewWillEnter(() => {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: "#8532D8" });
  });

  console.log(user);
  const register = (role) => {
    setCreatingUser(true);

    Instance.post("auth/register/", {
      ...user,
      role: role,
    })
      .then((res) => {
        tokenSubject$.next(res.data.token);
        storage.set("token", res.data.token);
        storage.set("user", res.data.data);
        role === "user"
          ? history.push("/landing")
          : history.push("/preferred-language");
      })
      .finally(() => {
        setCreatingUser(false);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <div className="bg-purple h-full flex flex-col items-center justify-between py-10">
          <div />
          <div className="text-white text-[40px] leading-[38px] w-24">
            <div className=" w-28 ml-2">Do you?</div>
          </div>
          <div className="w-5/6 flex flex-col gap-6">


            <div className="flex flex-col gap-2.5">
              <GeometricButton
                variant="secondary"
                cut="right"
                width="100%"
                className="w-full"
                onClick={() => register("user")}
              >
                  Need a service?
              </GeometricButton>

            </div>
            <div className="flex flex-col gap-2">
              <GeometricButton
                variant="dark"
                cut="right"
                width="100%"
                className="w-full"
                onClick={() => register("serviceProvider")}
              >
                  Provide a service?
              </GeometricButton>
            </div>
          </div>
          <img
            className="w-[122px] h-[100px]"
            src="/logos/Logo-Light.svg"
            alt=""
          />
        </div>
        <Loading open={creatingUser} message={"Signing Up"} />
      </IonContent>
    </IonPage>
  );
}

export default Selection;
