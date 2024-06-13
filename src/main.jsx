import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./ionic.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SWRConfig } from "swr";
import { storage } from "./storage";

async function setup() {
  await storage.create();

  const [token] = await Promise.all([storage.get("token")]);

  const App = await import("./App").then((e) => e.default);
  const Instance = await import("./axios/Axios").then((e) => e.default);

  const container = document.getElementById("root");

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <SWRConfig
        value={{
          fetcher: (res) => Instance.get(res).then((r) => r.data),
          focusThrottleInterval: 30000,
        }}
      >
        <GoogleOAuthProvider clientId="916564216176-6jdbhubb15qpc588lg9a1e0lflga6ghg.apps.googleusercontent.com">
          <App token={token} />
        </GoogleOAuthProvider>
      </SWRConfig>
    </React.StrictMode>
  );
}

setup();
