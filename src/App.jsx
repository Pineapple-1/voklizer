import { Suspense, useEffect } from "react";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  useIonViewDidEnter,
  IonPage,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

import {
  Play,
  ServiceProviderCompanyName,
  Register,
  Login,
  ForgetPass,
  ResetPass,
  Locale,
  SendSuccess,
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
setupIonicReact();

import "./App.css";

function App() {


  useEffect(() => {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: "#F5F5F550" });
  });

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
              <Route exact path='/listing'>

              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </Suspense>
      </IonApp>
    </>
  );
}

export default App;
