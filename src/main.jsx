import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./ionic.css";
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
          focusThrottleInterval: 300,
        }}
      >
        <App token={token} />
      </SWRConfig>
    </React.StrictMode>
  );
}

setup();
