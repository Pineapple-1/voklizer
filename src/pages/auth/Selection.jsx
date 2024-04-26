import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

function Selection() {
  const history = useHistory();
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
                onClick={() => history.push("/")}
              >
                <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
                <div className="text-sm">Yes</div>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className=" text-white text-sm">Provide a service?</div>

              <button
                className="bg-[#000] rounded-xl flex justify-between items-center py-[9px] px-3 w-full"
                onClick={() => history.push("/company-reg")}
              >
                <div className="h-1.5 w-1/2 bg-white rounded-2xl"></div>
                <div className="text-sm text-white">Yes</div>
              </button>
            </div>
          </div>
          <img
            className="w-[105px] h-[100px]"
            src="/logos/Logo-Light.svg"
            alt=""
          />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Selection;
