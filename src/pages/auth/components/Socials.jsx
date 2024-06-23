import { useState } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import { Capacitor } from "@capacitor/core";
import { useHistory, useLocation } from "react-router-dom";

import Instance from "../../../axios/Axios";
import { useAtomValue, useSetAtom } from "jotai";
import { fmcAtom, socialAtom } from "../../../state";
import Loading from "../../../components/Loading";
import { tokenSubject$ } from "./../TokenState";

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
FacebookLogin.initialize({ appId: "644429617838557" });

// const firebaseConfig = {
//   apiKey: "AIzaSyC_hSGTW8obPsehb_JEKKIGcasLtsXHCo0",
//   authDomain: "voklizer-dev.firebaseapp.com",
//   projectId: "voklizer-dev",
//   storageBucket: "voklizer-dev.appspot.com",
//   messagingSenderId: "680199080385",
//   appId: "1:680199080385:web:442d3af8a16c67d1c60740",
//   measurementId: "G-8Y7WJ3ERBE",
// };

function Socials({ setValue }) {
  // initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const fmcToken = useAtomValue(fmcAtom);
  const setSocial = useSetAtom(socialAtom);
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const signInGoogle = async () => {
    setLoading(true);
    if (Capacitor.getPlatform() !== "web") {
      const result = await GoogleAuth.signIn();

      const googleCredential = GoogleAuthProvider.credential(
        result?.authentication?.idToken,
        result?.authentication?.accessToken
      );
      const firebaseUserCredential = await signInWithCredential(
        auth,
        googleCredential
      );

      Instance.post("auth/login", {
        token: firebaseUserCredential.user.stsTokenManager.accessToken,
        fcmToken: fmcToken ?? "",
      }).then((res) => {
        setLoading(false);

        if (!res.data.registered) {
          if (location.pathname === "/register") {
            setValue(
              "firstName",
              firebaseUserCredential.user.displayName.split(" ")?.[0],
              {
                shouldValidate: true,
                shouldDirty: true,
              }
            );
            setValue(
              "lastName",
              firebaseUserCredential.user.displayName.split(" ")?.[1],
              {
                shouldValidate: true,
                shouldDirty: true,
              }
            );
            setValue("email", firebaseUserCredential.user.email, {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else {
            setSocial({
              firstname:
                firebaseUserCredential.user.displayName.split(" ")?.[0],
              lastname: firebaseUserCredential.user.displayName.split(" ")?.[1],
              email: firebaseUserCredential.user.email,
            });
            history.push("/register");
          }
        } else {
          tokenSubject$.next(res.data.token);
          history.push("/play");
        }
      });
    } else {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(token, credential, user);

        Instance.post("auth/login", {
          token: user.accessToken,
          fcmToken: fmcToken,
        }).then((res) => {
          setLoading(false);

          if (!res.data.registered) {
            if (location.pathname === "/register") {
              setValue("firstName", user.displayName.split(" ")?.[0], {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue("lastName", user.displayName.split(" ")?.[1], {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue("email", user.email, {
                shouldValidate: true,
                shouldDirty: true,
              });
            } else {
              setSocial({
                firstname: user.displayName.split(" ")?.[0],
                lastname: user.displayName.split(" ")?.[1],
                email: user.email,
              });
              history.push("/register");
            }
          } else {
            tokenSubject$.next(res.data.token);
            history.push("/play");
          }
        });
      });
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await FacebookLogin.login({
        permissions: ["public_profile", "email"],
      });

      if (result.accessToken) {
        console.log("Facebook", JSON.stringify(result));
      }
    } catch (error) {
      console.error("Error logging in with Facebook:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="bg-[#1877F2] flex items-center px-1.5 h-9 rounded-3xl"
        onClick={() => loginWithFacebook()}
      >
        <img src="/facebook.svg" alt="" />
        <div className="text-xs font-bold text-white flex-1 text-center ">
          Continue with Facebook
        </div>
      </div>

      <div
        className="bg-white flex items-center  h-9 rounded-3xl px-1.5"
        onClick={() => signInGoogle()}
      >
        <img src="/google.svg" alt="" />
        <div className="text-xs font-bold text-black/55 flex-1 text-center">
          Continue with Google
        </div>
      </div>

      <Loading open={loading} message="Gathering Info" />
    </div>
  );
}

export default Socials;
