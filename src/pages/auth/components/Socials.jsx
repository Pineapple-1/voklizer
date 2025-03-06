import {useState} from "react";
import {SocialLogin} from '@capgo/capacitor-social-login';


import {Capacitor} from "@capacitor/core";
import {useHistory, useLocation} from "react-router-dom";

import Instance from "../../../axios/Axios";
import {useAtomValue, useSetAtom} from "jotai";
import {fmcAtom, socialAtom} from "../../../state";
import Loading from "../../../components/Loading";
import {tokenSubject$} from "./../TokenState";
import {storage} from "../../../storage";
import {auth} from "../../../firebase";


import {
  GoogleAuthProvider, signInWithCredential, signInWithPopup
} from "firebase/auth";

SocialLogin.initialize({
  google: {
    webClientId: '680199080385-2tgqhj0ht8ve12v5c6d5eq2la8s7uu17.apps.googleusercontent.com',
    iOSClientId: '680199080385-gqgfjd8d6vuv1b90hsbit2fh23r9d3k7.apps.googleusercontent.com'
  }, facebook: {
    appId: '644429617838557', clientToken: 'efd14d1c5bfde5a579bcbc5feb4b1dbb',
  }
});


function Socials({setValue, setRemovePassword}) {
  const fmcToken = useAtomValue(fmcAtom);
  const provider = new GoogleAuthProvider();

  const setSocial = useSetAtom(socialAtom);
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const signInGoogle = async () => {
    setLoading(true);
    if (Capacitor.getPlatform() !== "web") {
      const result = await SocialLogin.login({
        provider: 'google', options: {
          scopes: ['email', 'profile'], forceRefreshToken: true
        }
      });

      const googleCredential = GoogleAuthProvider.credential(result?.result?.idToken, result?.result.accessToken?.token);

      const firebaseUserCredential = await signInWithCredential(auth, googleCredential);

      Instance.post("auth/login/", {
        token: firebaseUserCredential.user.stsTokenManager.accessToken, fcmToken: fmcToken ?? "",
      }).then((res) => {
        setLoading(false);

        if (!res.data.registered) {
          if (location.pathname === "/register") {
            setRemovePassword(true);

            setValue("firstName", firebaseUserCredential.user.displayName.split(" ")?.[0], {
              shouldValidate: true, shouldDirty: true,
            });
            setValue("lastName", firebaseUserCredential.user.displayName.split(" ")?.[1], {
              shouldValidate: true, shouldDirty: true,
            });
            setValue("email", firebaseUserCredential.user.email, {
              shouldValidate: true, shouldDirty: true,
            });
          } else {
            setSocial({
              firstname: firebaseUserCredential.user.displayName.split(" ")?.[0],
              lastname: firebaseUserCredential.user.displayName.split(" ")?.[1],
              email: firebaseUserCredential.user.email,
            });
            history.push("/register?hidepass=true");
          }
        } else {
          tokenSubject$.next(res.data.token);
          storage.set("user", res.data);

          history.push("/landing");
        }
      }).catch((err) => {
        console.log(JSON.stringify("error", err));
      });
    } else {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(token, credential, user);

        Instance.post("auth/login/", {
          token: user.accessToken, fcmToken: fmcToken,
        }).then((res) => {
          setLoading(false);

          if (!res.data.registered) {
            if (location.pathname === "/register") {
              setRemovePassword(true);

              setValue("firstName", user.displayName.split(" ")?.[0], {
                shouldValidate: true, shouldDirty: true,
              });
              setValue("lastName", user.displayName.split(" ")?.[1], {
                shouldValidate: true, shouldDirty: true,
              });
              setValue("email", user.email, {
                shouldValidate: true, shouldDirty: true,
              });
            } else {
              setSocial({
                firstname: user.displayName.split(" ")?.[0],
                lastname: user.displayName.split(" ")?.[1],
                email: user.email,
              });
              history.push("/register?hidepass=true");
            }
          } else {
            tokenSubject$.next(res.data.token);
            storage.set("user", res.data);

            history.push("/landing");
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

  return (<div className="flex flex-col gap-4">
    <div
      className="bg-[#1877F2] flex items-center px-1.5 h-9 rounded-3xl"
      onClick={() => {
      }}
    >
      <img src="/facebook.svg" alt=""/>
      <div className="text-sm font-bold text-white flex-1 text-center ">
        Continue with Facebook
      </div>
    </div>

    <div
      className="bg-white flex items-center  h-9 rounded-3xl px-1.5"
      onClick={() => signInGoogle()}
    >
      <img src="/google.svg" alt=""/>
      <div className="text-sm font-bold text-black/55 flex-1 text-center">
        Continue with Google
      </div>
    </div>

    <Loading open={loading} message="Gathering Info"/>
  </div>);
}


export default Socials;
