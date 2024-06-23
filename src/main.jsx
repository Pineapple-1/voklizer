import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./ionic.css";
import { SWRConfig } from "swr";
import { storage } from "./storage";
import { initializeApp } from "firebase/app";




async function setup() {

  const firebaseConfig = {
    apiKey: "AIzaSyC_hSGTW8obPsehb_JEKKIGcasLtsXHCo0",
    authDomain: "voklizer-dev.firebaseapp.com",
    projectId: "voklizer-dev",
    storageBucket: "voklizer-dev.appspot.com",
    messagingSenderId: "680199080385",
    appId: "1:680199080385:web:442d3af8a16c67d1c60740",
    measurementId: "G-8Y7WJ3ERBE",
  };

  await storage.create();

  const [token] = await Promise.all([storage.get("token")]);

  const App = await import("./App").then((e) => e.default);
  const Instance = await import("./axios/Axios").then((e) => e.default);
  initializeApp(firebaseConfig)

  const container = document.getElementById("root");

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <SWRConfig
        value={{
          fetcher: (res) => Instance.get(res).then((r) => r.data),
          focusThrottleInterval: 300,
        }}
      >
        <App token={token} />
      </SWRConfig>
    </React.StrictMode>
  );
}

setup();
