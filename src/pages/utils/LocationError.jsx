import { useHistory } from "react-router-dom";
import UserHomeLayout from "../../layout/UserHomeLayout";
import Goback from "../../assets/icons/Goback";
import Error from "../../assets/icons/Error";
import { Geolocation } from "@capacitor/geolocation";
import { useIonViewWillEnter } from "@ionic/react";

import {
  NativeSettings,
  AndroidSettings,
  IOSSettings,
} from "capacitor-native-settings";

function LocationError() {
  const history = useHistory();

  useIonViewWillEnter(async () => {

    const locationPermission = await Geolocation.requestPermissions();
    const hasNoLocation =
      !locationPermission || locationPermission.location !== "granted";

    if (!hasNoLocation) {
      console.log("given");
      history.push("/play")
    }
  });

  return (
    <UserHomeLayout>
      <div className="h-full flex flex-col items-center justify-end px-4 bg-gray-100">
        <div className="flex flex-col items-center  justify-between h-full">
          <div />
          <div />
          <div className="flex flex-col gap-4 items-center">
            <Error />
            <div>
              <div className="text-[20px]">Location</div>
              <div className="text-[20px]">Error!</div>
            </div>
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={async () => {
              await NativeSettings.open({
                optionAndroid: AndroidSettings.ApplicationDetails, 
                optionIOS: IOSSettings.App
              })
              
            }}
          >
            <div>
              <div className="text-sm">Press Here To</div>
              <div className="text-sm">Enable Location</div>
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default LocationError;
