import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { isPlatform } from "@ionic/react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

import { FacebookLogin } from "@capacitor-community/facebook-login";

import Textbox from "../components/Textbox";
import BtmLogo from "../assets/logos/Logo-Alt.svg";

// FACEBOOK_APP_ID=1180339380074058
// FACEBOOK_APP_SECRET=082bd8cba0c91373e8410bba9387b906
// FACEBOOK_APP_CALLBACK = http://localhost:3301/auth/facebook/callback

{
  /* <string name="facebook_app_id">644429617838557</string>
<string name="facebook_client_token">efd14d1c5bfde5a579bcbc5feb4b1dbb</string> */
}

FacebookLogin.initialize({ appId: "644429617838557" });

function Register() {
  const FACEBOOK_PERMISSIONS = ["public_profile", "email"];

  const [user, setUser] = useState(null);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login Success:", response);
      // Handle successful login here
    },
    onFailure: (error) => {
      console.error("Login Error:", error);
      // Handle login failure here
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const signInGoogle = async () => {
    try {
      if (isPlatform("ios") || isPlatform("android")) {
        const result = await GoogleAuth.signIn();
        setUser(result);
      } else {
        console.log("web");
        loginWithGoogle();
      }
      console.log("-->>", JSON.stringify(user));
    } catch (error) {
      console.log("Google Sign In Error", JSON.stringify(error));
    }
  };

  async function loginWithFacebook() {
    try {
      const result = await FacebookLogin.login({
        permissions: FACEBOOK_PERMISSIONS,
      });

      if (result.accessToken) {
        console.log(`Facebook access token is `, result);
      }
    } catch (error) {
      console.error("Error logging in with Facebook:", error);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gray/50 px-6 py-10 flex flex-col">
          <div className="flex flex-col gap-5">
            <div className=" flex justify-between flex-col gap-8">
              <div className="text-2xl leading-8 w-full text-center">
                Sign Up
              </div>

              <form
                className="flex justify-between flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Textbox
                  name="firstName"
                  placeholder="First Name"
                  variant="dark"
                  {...register("firstName", { required: true })}
                />

                <Textbox
                  name="lastName"
                  placeholder="Last Name"
                  variant="dark"
                  {...register("lastName", { required: true })}
                />
                <Textbox
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  variant="dark"
                  {...register("mobileNumber", { required: true })}
                />
                <Textbox
                  name="emailAddress"
                  placeholder="Email Address"
                  variant="dark"
                  {...register("emailAddress", { required: true })}
                />
                <button
                  className="bg-[#D9D9D960] rounded-lg flex justify-between items-center py-2.5 px-3"
                  type="submit"
                >
                  <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
                  <div className="text-sm">Register</div>
                </button>
              </form>
            </div>

            <div className=" text-lg text-center ">OR</div>

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
            </div>
          </div>
          <div className="h-max flex flex-1 flex-col" />

          <div className="flex flex-col justify-center items-center gap-3">
            <img className="w-[42px] h-[38px]" src="./voklizer.svg" alt="" />
            <div className="flex flex-col gap-2 items-center">
              <img
                className="h-5 w-[105px]"
                src={BtmLogo}
                alt="Voklizer logo at the bottom"
              />
              <div className="text-black text-[7px] leading-[8px] w-20 text-left">
                Press, Record, Send & Its solved.
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Register;
