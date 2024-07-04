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
        storage.set("user", res.data);

        setRole(role);
        role === "user"
          ? history.push("/play")
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
              <div className=" text-white text-sm">Need a service?</div>
              <button
                className="bg-[#fff] rounded-xl flex justify-between items-center py-[9px] px-3 w-full"
                onClick={() => register("user")}
              >
                <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
                <div className="text-sm">Yes</div>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className=" text-white text-sm">Provide a service?</div>

              <button
                className="bg-[#000] rounded-xl flex justify-between items-center py-[9px] px-3 w-full"
                onClick={() => register("serviceProvider")}
              >
                <div className="h-1.5 w-1/2 bg-white rounded-2xl"></div>
                <div className="text-sm text-white">Yes</div>
              </button>
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
