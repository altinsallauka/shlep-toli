export const origin = "https://altinsallauka.github.io";
export const basePath = "/shlep-toli";
export const languages = ["sq", "en", "de"] as const;
export const pathFor = (lang: string) => basePath + (lang === "sq" ? "/" : `/${lang}/`);
export const metadata = {
  sq: {
    title: "Shlep & Auto Bartje TOLI në Kosovë | Malishevë 24/7",
    description:
      "Shlep, auto bartje, karrotrec dhe transport veturash nga Bellanica, Malishevë, Kosovë. Asistencë rrugore 24/7. Telefon & WhatsApp: +383 44 116 446.",
    locale: "sq_AL",
  },
  en: {
    title: "TOLI Towing Kosovo | 24/7 Roadside Assistance, Malishevë",
    description:
      "TOLI towing and vehicle transport in Kosovo, based in Bellanicë, Malishevë. Flatbed transport and crane recovery. Call or WhatsApp +383 44 116 446.",
    locale: "en_GB",
  },
  de: {
    title: "TOLI Abschleppdienst Kosovo | Pannenhilfe Malishevë 24/7",
    description:
      "Abschleppdienst und Fahrzeugtransport im Kosovo aus Bellanicë, Malishevë. Pannenhilfe und Bergung mit Kran. Telefon & WhatsApp: +383 44 116 446.",
    locale: "de_DE",
  },
};
export function schema(lang: string) {
  const key = (languages as readonly string[]).includes(lang)
    ? (lang as keyof typeof metadata)
    : "sq";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutomotiveBusiness",
        "@id": `${origin}${basePath}/#business`,
        name: "Shlep Auto Bartje TOLI",
        url: origin + basePath + "/",
        description: metadata[key].description,
        image: [origin + basePath + "/images/corvette.jpg", origin + basePath + "/images/truck.jpg"],
        telephone: "+38344116446",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bellanicë, Malishevë",
          postalCode: "24000",
          addressCountry: "XK",
        },
        hasMap: "https://www.google.com/maps?cid=6100446268749439151",
        sameAs: [
          "https://www.facebook.com/AutoTransportuesToli/",
          "https://www.tiktok.com/@shlepautobartjetoli",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+38344116446",
            contactType: "customer service",
          },
          {
            "@type": "ContactPoint",
            telephone: "+38349116446",
            contactType: "customer service",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}${basePath}/#website`,
        url: origin + basePath + "/",
        name: "Shlep Auto Bartje TOLI",
        inLanguage: ["sq", "en", "de"],
        publisher: { "@id": `${origin}${basePath}/#business` },
      },
      {
        "@type": "WebPage",
        "@id": origin + pathFor(key) + "#page",
        url: origin + pathFor(key),
        name: metadata[key].title,
        description: metadata[key].description,
        inLanguage: key,
        isPartOf: { "@id": `${origin}${basePath}/#website` },
        about: { "@id": `${origin}${basePath}/#business` },
      },
    ],
  };
}
export function updateMetadata(lang: string) {
  const key = (languages as readonly string[]).includes(lang)
    ? (lang as keyof typeof metadata)
    : "sq";
  const data = metadata[key];
  document.documentElement.lang = key;
  document.title = data.title;
  const set = (selector: string, content: string) =>
    document.querySelector(selector)?.setAttribute("content", content);
  set('meta[name="description"]', data.description);
  set('meta[property="og:title"]', data.title);
  set('meta[property="og:description"]', data.description);
  set('meta[property="og:url"]', origin + pathFor(key));
  set('meta[property="og:locale"]', data.locale);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", origin + pathFor(key));
}
