import { useHistory } from "react-router-dom";
import UserHomeLayout from "../../layout/UserHomeLayout";
import Error from "../../assets/icons/Error";
import { Geolocation } from "@capacitor/geolocation";
import { useIonViewWillEnter } from "@ionic/react";
import { VoiceRecorder } from "capacitor-voice-recorder";

import {
  NativeSettings,
  AndroidSettings,
  IOSSettings,
} from "capacitor-native-settings";

function MicError() {
  const history = useHistory();


  return (
    <UserHomeLayout>
      <div className="h-full flex flex-col items-center justify-end px-4 bg-gray-100">
        <div className="flex flex-col items-center  justify-between h-full">
          <div />
          <div />
          <div className="flex flex-col gap-4 items-center">
            <Error />
            <div>
              <div className="text-[20px]">Voice Input</div>
              <div className="text-[20px]">Permission Error!</div>
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
              <div className="text-[13px]">Press Here To</div>
              <div className="text-[13px]">Enable Voice Input</div>
            </div>
          </div>
        </div>
      </div>
    </UserHomeLayout>
  );
}

export default MicError;
