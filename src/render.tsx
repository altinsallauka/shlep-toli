import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { CookieNotice, PrivacyPage } from "./Privacy";
export { privacyText, privacyPath } from "./privacy-content";
import i18n from "./i18n";
export { metadata, origin, basePath, languages, pathFor, schema } from "./seo";
export async function render(language: string, privacy = false) {
  await i18n.changeLanguage(language);
  return renderToString(<>{privacy ? <PrivacyPage /> : <App />}<CookieNotice /></>);
}
