import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { isPlatform } from "@ionic/react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin } from "@capacitor-community/facebook-login";

FacebookLogin.initialize({ appId: "644429617838557" });

function Socials() {
  const signInGoogle = async () => {
    try {
      if (isPlatform("ios") || isPlatform("android")) {
        console.log("in herea androwid");
        const result = await GoogleAuth.signIn();
        console.log("Google", JSON.stringify(result));
      } else {
        loginWithGoogle();
      }
    } catch (error) {
      console.log("Google Sign In Error", JSON.stringify(error.message));
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
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login Success:", response);
    },
    onFailure: (error) => {
      console.error("Login Error:", error);
    },
  });

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
    </div>
  );
}

export default Socials;
