import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Translator, Translate } from "react-auto-translate/lib/commonjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
const cacheProvider = {
  get: (language, key) =>
    ((JSON.parse(localStorage.getItem("translations")) || {})[key] || {})[
      language
    ],
  set: (language, key, value) => {
    const existing = JSON.parse(localStorage.getItem("translations")) || {
      [key]: {},
    };
    existing[key] = { ...existing[key], [language]: value };
    localStorage.setItem("translations", JSON.stringify(existing));
  },
};
root.render(
  <React.StrictMode>
    {/* <Translator
      cacheProvider={cacheProvider}
      from="en"
      to="es"
      googleApiKey="API_KEY"
    >
      <Translate> */}
    <App style={{ overFlowX: "hidden" }} />
    {/* </Translate>
    </Translator> */}
  </React.StrictMode>
);

reportWebVitals();
