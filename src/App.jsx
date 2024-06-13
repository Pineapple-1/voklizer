import { Suspense, useEffect, useState } from "react";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  useIonViewWillEnter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import {
  Play,
  ServiceProviderCompanyName,
  Register,
  Login,
  ForgetPass,
  ResetPass,
  Locale,
  SendSuccess,
  QueryListing,
  Replies,
  PitchSuccess,
  VokDiary,
} from "./routes";
import { ServiceProviderCompanyUser } from "./routes";
import { ServiceProviderCompanyRegistrationNumber } from "./routes";
import { ServiceProviderCompanyEmail } from "./routes";
import { ServiceProviderCompanyOtp } from "./routes";
import { ServiceProviderCompanyMobileNumber } from "./routes";
import { ServiceProviderCompanyLandLineNumber } from "./routes";
import { ServiceProviderCompanyAddress } from "./routes";
import { ServiceProviderCompanyPracticeArea } from "./routes";
import { Selection } from "./routes";
import { StatusBar, Style } from "@capacitor/status-bar";
import { PushNotifications } from "@capacitor/push-notifications";
import { VoiceRecorder } from "capacitor-voice-recorder";

import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
setupIonicReact({
  platform: {
    /** The default `desktop` function returns false for devices with a touchscreen.
     * This is not always wanted, so this function tests the User Agent instead.
     **/
    desktop: (win) => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          win.navigator.userAgent
        );
      return !isMobile;
    },
  },
});

import "./App.css";

function App({ token }) {
  useEffect(() => {
    const setStatusBarStyleLight = async () => {
      await StatusBar.setBackgroundColor({ color: "#F5F5F5" });
      await StatusBar.setStyle({ style: Style.Light });
    };

    setStatusBarStyleLight();
  });

  useIonViewWillEnter(() => {
    const setStatusBarColor = async () => {
      try {
        await StatusBar.setBackgroundColor({ color: "#F5F5F5" });
        await StatusBar.setStyle({ style: Style.Light });
      } catch (error) {
        console.error("Failed to set status bar color", error);
      }
    };

    setStatusBarColor();
  });

  const nullEntry = [];
  const [notifications, setnotifications] = useState(nullEntry);

  useEffect(() => {
    VoiceRecorder.requestAudioRecordingPermission()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));

    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
            console.log("Push Notification permission denied");
          } else {
            console.log("Push Notification permission granted");
            register();
          }
        });
      } else {
        register();
      }
    });
  }, []);

  const register = () => {
    console.log("Initializing HomePage");

    PushNotifications.register();

    PushNotifications.addListener("registration", (token) => {
      console.log("---->>>> Push registration success", JSON.stringify(token));
    });

    PushNotifications.addListener("registrationError", (error) => {
      console.log("Error on registration: " + JSON.stringify(error));
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        setnotifications((notifications) => [
          ...notifications,
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: "foreground",
          },
        ]);
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        setnotifications((notifications) => [
          ...notifications,
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: "action",
          },
        ]);
      }
    );
  };

  return (
    <>
      <IonApp>
        <Suspense>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/company-reg">
                <ServiceProviderCompanyName />
              </Route>
              <Route exact path="/user-name">
                <ServiceProviderCompanyUser />
              </Route>
              <Route exact path="/company-reg-num">
                <ServiceProviderCompanyRegistrationNumber />
              </Route>
              <Route exact path="/company-email">
                <ServiceProviderCompanyEmail />
              </Route>
              <Route exact path="/otp">
                <ServiceProviderCompanyOtp />
              </Route>
              <Route exact path="/mobile">
                <ServiceProviderCompanyMobileNumber />
              </Route>
              <Route exact path="/landline">
                <ServiceProviderCompanyLandLineNumber />
              </Route>
              <Route exact path="/address">
                <ServiceProviderCompanyAddress />
              </Route>
              <Route exact path="/practice-area">
                <ServiceProviderCompanyPracticeArea />
              </Route>

              <Route exact path="/">
                {!token && <Redirect to="/login" />}
                {token && <Redirect to="/play" />}
              </Route>

              <Route exact path="/play">
                <Play />
              </Route>

              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/selection">
                <Selection />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/forget-pass">
                <ForgetPass />
              </Route>
              <Route exact path="/reset-pass">
                <ResetPass />
              </Route>
              <Route exact path="/locale">
                <Locale />
              </Route>

              <Route exact path="/send-success">
                <SendSuccess />
              </Route>
              <Route exact path="/listing">
                <QueryListing />
              </Route>
              <Route exact path="/pitch-success">
                <PitchSuccess />
              </Route>
              <Route exact path="/replies">
                <Replies />
              </Route>

              <Route exact path="/diary">
                <VokDiary />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </Suspense>
      </IonApp>
    </>
  );
}

export default App;
