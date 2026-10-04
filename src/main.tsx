import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./style.css";
import { CookieNotice, PrivacyPage } from "./Privacy";
const isPrivacy = /\/privacy\/?$/.test(window.location.pathname);
const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    {isPrivacy ? <PrivacyPage /> : <App />}
    <CookieNotice />
  </React.StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
