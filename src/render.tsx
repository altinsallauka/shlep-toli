import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import i18n from "./i18n";
export { metadata, origin, basePath, languages, pathFor, schema } from "./seo";
export async function render(language: string) {
  await i18n.changeLanguage(language);
  return renderToString(<App />);
}
