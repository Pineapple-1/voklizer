import {Suspense, useEffect, useState} from "react";
import {IonApp, IonRouterOutlet, setupIonicReact, useIonViewWillEnter,} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router-dom";
import {CapacitorStripeProvider} from "@capacitor-community/stripe/dist/esm/react/provider";

import {
  AllReplies,
  Billing,
  EditCompanyInfo,
  Error,
  ForgetPass,
  Landing,
  Locale,
  LocationError,
  Login,
  MicError,
  PaymentError,
  PitchSuccess,
  Play,
  Profile,
  Queries,
  QueryListing,
  ReelPlayer,
  Register,
  Replies,
  ResetPass,
  Selection,
  SendSuccess,
  ServiceProviderAddress,
  ServiceProviderEmailWebsite,
  ServiceProviderLandLineNumber,
  ServiceProviderName,
  ServiceProviderOtp,
  ServiceProviderPracticeArea,
  ServiceProviderPreferredLanguage,
  ServiceProviderRegistrationNumber,
  ServiceProviderVideo,
  VokDiary,
  Wallet
} from "./routes";
import {StatusBar, Style} from "@capacitor/status-bar";
import {PushNotifications} from "@capacitor/push-notifications";
import {VoiceRecorder} from "capacitor-voice-recorder";
import {fmcAtom} from "./state";
import {useSetAtom} from "jotai";
import {useSWRConfig} from "swr";

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

import "./App.css";
import Instance from "./axios/Axios";


setupIonicReact({
  platform: {
    desktop: (win) => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          win.navigator.userAgent
        );
      return !isMobile;
    },
  },
});

function App({token}) {
  const {mutate} = useSWRConfig();
  const [notifications, setnotifications] = useState([]);


  const setFMC = useSetAtom(fmcAtom);


  useIonViewWillEnter(() => {
    const setStatusBarColor = async () => {
      await StatusBar.setBackgroundColor({color: "#F5F5F5"});
      await StatusBar.setStyle({style: Style.Light});
    };

    setStatusBarColor();
  });

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
    PushNotifications.register();
    PushNotifications.addListener("registration", (fmcToken) => {
      console.log("Fcm registered", JSON.stringify(fmcToken));

      setFMC(fmcToken.value);
      token &&
      Instance.post("auth/add-fcm-token/", {fcmToken: fmcToken.value});
    });

    PushNotifications.addListener("registrationError", (error) => {
      console.log("Error on registration: " + JSON.stringify(error));
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        mutate("job-notifications?page=1");

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
        window.location.href = "/listing";

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

  const paths = [
    {
      path: "/preferred-language",
      component: <ServiceProviderPreferredLanguage/>,
    },
    {
      path: "/reg-name",
      component: <ServiceProviderName/>,
    },

    {
      path: "/reg-num",
      component: <ServiceProviderRegistrationNumber/>,
    },
    {
      path: "/reg-email",
      component: <ServiceProviderEmailWebsite/>,
    },
    {
      path: "/otp",
      component: <ServiceProviderOtp/>,
    },
    {
      path: "/landline",
      component: <ServiceProviderLandLineNumber/>,
    },
    {
      path: "/address",
      component: <ServiceProviderAddress/>,
    },
    {
      path: "/practice-area",
      component: <ServiceProviderPracticeArea/>,
    },

    {
      path: "/video",
      component: <ServiceProviderVideo/>,
    },

    {
      path: "/play",
      component: <Play/>,
    },
    {
      path: "/register",
      component: <Register/>,
    },
    {
      path: "/selection",
      component: <Selection/>,
    },
    {
      path: "/login",
      component: <Login/>,
    },

    {
      path: "/forget-pass",
      component: <ForgetPass/>,
    },

    {
      path: "/reset-pass",
      component: <ResetPass/>,
    },

    {
      path: "/locale",
      component: <Locale/>,
    },

    {
      path: "/send-success",
      component: <SendSuccess/>,
    },

    {
      path: "/listing",
      component: <QueryListing/>,
    },
    {
      path: "/pitch-success",
      component: <PitchSuccess/>,
    },
    {
      path: "/queries",
      component: <Queries/>,
    },
    {
      path: "/replies/:jobId",
      component: <Replies/>,
    },
    {
      path: "/diary",
      component: <VokDiary/>,
    },
    {
      path: "/profile",
      component: <Profile/>,
    },
    {
      path: "/billing",
      component: <Billing/>,
    },
    {
      path: "/wallet",
      component: <Wallet/>,
    },
    {
      path: "/error",
      component: <Error/>,
    },
    {
      path: "/landing",
      component: <Landing/>,
    },
    {
      path: "/player/:id",
      component: <ReelPlayer/>,
    },
    {
      path: '/payment-error',
      component: <PaymentError/>
    },
    {
      path: "/location-error",
      component: <LocationError/>
    },
    {
      path: "/mic-error",
      component: <MicError/>
    },
    {
      path: "/all-replies",
      component: <AllReplies/>
    },
    {
      path: "/edit-company-info",
      component: <EditCompanyInfo/>
    }
  ];

  return (
    <>
      <CapacitorStripeProvider
        publishableKey={import.meta.env.VITE_STRIPE}
        fallback={<p>Loading...</p>}
      >
        <IonApp>
          <Suspense>
            <IonReactRouter>
              <IonRouterOutlet>
                {paths.map((item) => (
                  <Route key={item.path} exact path={item.path}>
                    {item.component}
                  </Route>
                ))}
                <Route exact path="/">
                  {!token && <Redirect to="/login"/>}
                  {token && <Redirect to="/play"/>}
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </Suspense>
        </IonApp>
      </CapacitorStripeProvider>
    </>
  );
}

export default App;
