import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  MapPin,
  Clock3,
  Truck,
  ShieldCheck,
  MoveUpRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  MessageSquare,
  Check,
  Navigation,
} from "lucide-react";
import "./i18n";
import { updateMetadata, pathFor, basePath } from "./seo";
const maps = "https://www.google.com/maps?cid=6100446268749439151";
const facebook = "https://www.facebook.com/AutoTransportuesToli/";
const photos = [
  "fleet",
  "sports-cars",
  "recovery",
  "roadside",
  "google-crane",
  "google-night",
  "google-field",
  "google-flood",
];
const galleryLabelIndices = [1, 2, 4, 5, 6, 8, 9, 10];
const photoUrl = (p: string) =>
  `${basePath}/images/${p}.${p.startsWith("google-") ? "webp" : "jpg"}`;
type Item = { title: string; text: string; tag?: string };
function Brand() {
  return (
    <a className="brand" href="#home" aria-label="TOLI — Home">
      <span className="brand-mark">
        T<span className="checkers" />
      </span>
      <span>
        <b>
          TOLI<span className="brand-dot">.</span>
        </b>
        <small>SHLEP AUTO BARTJE</small>
      </span>
    </a>
  );
}
export function App() {
  const { t, i18n } = useTranslation();
  const [contactVisible, setContactVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);
  const [menu, setMenu] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [request, setRequest] = useState<Record<string, string> | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const reviewRef = useRef<HTMLDivElement>(null);
  const services = t("services", { returnObjects: true }) as Item[];
  const steps = t("steps", { returnObjects: true }) as Item[];
  const labels = t("galleryLabels", { returnObjects: true }) as string[];
  useEffect(() => {
    updateMetadata(i18n.language);
  }, [i18n.language]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.animate(
              [
                { opacity: 0, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 600, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".section-heading,.service-card,.about-image,.about-copy,.gallery-item,.steps>div,.form-card,.faq-section",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (photo !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [photo]);
  useEffect(() => {
    if (request) reviewRef.current?.focus();
  }, [request]);
  const requestText = request
    ? `TOLI — ${t("request")}\n${t("name")}: ${request.name}\n${t("phoneInput")}: ${request.phone}\n${t("service")}: ${services[Number(request.service)].title}\n${t("pickup")}: ${request.pickup}\n${t("destination")}: ${request.destination || "—"}\n${t("message")}: ${request.message || "—"}`
    : "";
  const nav = [
    ["services", "navServices"],
    ["about", "navAbout"],
    ["gallery", "navGallery"],
    ["contact", "navContact"],
  ];
  return (
    <>
      <a className="skip" href="#main">
        {t("skip")}
      </a>
      <div className="topline">
        <div className="container">
          <span>
            <i className="status" />
            {t("available")}
          </span>
          <span>
            <MapPin size={12} />
            {t("local")}
          </span>
        </div>
      </div>
      <header>
        <div className="container header-inner">
          <Brand />
          <nav aria-label="Main" className={menu ? "open" : ""}>
            {nav.map(([id, key]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {t(key)}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <div className="languages" aria-label="Language">
              {[
                ["sq", "Shqip"],
                ["en", "English"],
                ["de", "Deutsch"],
              ].map(([lng, name]) => (
                <a
                  key={lng}
                  href={pathFor(lng)}
                  lang={lng}
                  hrefLang={lng}
                  title={name}
                  aria-label={name}
                  aria-current={i18n.language === lng ? "page" : undefined}
                >
                  {lng.toUpperCase()}
                </a>
              ))}
            </div>
            <a className="button small desktop-call" href="tel:+38344116446">
              <Phone size={15} />
              {t("call")}
            </a>
            <button
              className="menu"
              aria-label={t("menu")}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="line" />
              {t("heroEyebrow")}
            </div>
            <h1>
              {t("heroTop")}
              <br />
              <em>{t("heroBottom")}</em>
            </h1>
            <p>{t("heroText")}</p>
            <div className="hero-buttons">
              <a className="button" href="tel:+38344116446">
                <Phone size={18} />
                044 116 446
                <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#contact">
                {t("request")}
                <ArrowRight size={17} />
              </a>
            </div>
            <a className="hero-discover" href="#services">
              <span>↓</span>
              {t("discover")}
            </a>
          </div>
          <div className="hero-image">
            <img
              width="2048"
              height="1536"
              src={`${basePath}/images/corvette.jpg`}
              alt={labels[0]}
            />
            <div className="image-top">
              <span>
                <i className="status" />
                TOLI / AUTO TRANSPORT
              </span>
              <span>01 — 08</span>
            </div>
            <div className="image-caption">
              <div>
                <small>{t("heroCaption")}</small>
                <p>{t("heroSub")}</p>
              </div>
              <a href="#gallery" aria-label={t("navGallery")}>
                <ArrowUpRight />
              </a>
            </div>
            <div className="availability">
              <b>
                24<span>/</span>7
              </b>
              <span>{t("available")}</span>
            </div>
          </div>
        </section>
        <div className="trust-strip">
          <div className="container">
            {[Clock3, Truck, ShieldCheck].map((Icon, i) => (
              <div key={i}>
                <Icon size={21} />
                <span>{t(`strip${i + 1}`)}</span>
              </div>
            ))}
            <span className="strip-word">
              SHLEP AUTO BARTJE <b>TOLI</b>
            </span>
          </div>
        </div>
        <section className="section container" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("serviceEyebrow")}</p>
              <h2>{t("serviceTitle")}</h2>
            </div>
            <p className="section-intro">{t("serviceIntro")}</p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => {
              const Icon = [Truck, Navigation, MoveUpRight][i];
              return (
                <article className="service-card" key={i}>
                  <div className="card-top">
                    <Icon size={32} strokeWidth={1.4} />
                    <span>0{i + 1}</span>
                  </div>
                  <p className="micro">{s.tag}</p>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <a
                    href="#contact"
                    aria-label={`${t("request")} — ${s.title}`}
                  >
                    <ArrowUpRight size={22} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>
        <section className="about-section" id="about">
          <div className="container about-grid">
            <div className="about-image">
              <img
                width="2048"
                height="1536"
                src={`${basePath}/images/truck.jpg`}
                alt={labels[3]}
                loading="lazy"
              />
              <div className="about-stamp">
                <ShieldCheck size={30} />
                <b>TOLI</b>
                <small>AUTO BARTJE</small>
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">{t("aboutEyebrow")}</p>
              <h2>{t("aboutTitle")}</h2>
              <p>{t("aboutText")}</p>
              <p>{t("aboutText2")}</p>
              <div className="about-points">
                {[1, 2, 3].map((n) => (
                  <span key={n}>
                    <Check size={16} />
                    {t(`aboutPoint${n}`)}
                  </span>
                ))}
              </div>
              <a className="text-link" href="tel:+38344116446">
                044 116 446
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="section container" id="gallery">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("galleryEyebrow")}</p>
              <h2>{t("galleryTitle")}</h2>
              <p className="muted">{t("galleryText")}</p>
            </div>
            <a
              className="text-link"
              href={facebook}
              target="_blank"
              rel="noreferrer"
            >
              {t("allPhotos")}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="gallery">
            {photos.map((p, i) => (
              <button
                key={p}
                className={`gallery-item photo-${i}`}
                onClick={() => setPhoto(i)}
                aria-label={`${t("viewPhoto")}: ${labels[galleryLabelIndices[i]]}`}
              >
                <img
                  src={photoUrl(p)}
                  alt={labels[galleryLabelIndices[i]]}
                  loading="lazy"
                />
                <span>
                  <small>0{i + 1}</small>
                  {labels[galleryLabelIndices[i]]}
                  <ArrowUpRight size={19} />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="process">
          <div className="container">
            <div className="process-title">
              <p className="eyebrow">{t("processEyebrow")}</p>
              <h2>{t("processTitle")}</h2>
              <a href="tel:+38344116446" className="button">
                <Phone size={18} />
                {t("call")}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="steps">
              {steps.map((s, i) => (
                <div key={i}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="section container contact-grid"
          id="contact"
          ref={contactRef}
        >
          <div>
            <p className="eyebrow">{t("contactEyebrow")}</p>
            <h2>{t("contactTitle")}</h2>
            <p className="contact-intro muted">{t("contactText")}</p>
            <div className="contact-detail">
              <Phone />
              <div>
                <small>{t("phone")}</small>
                <a href="tel:+38344116446">044 116 446</a>
                <a href="tel:+38349116446">049 116 446</a>
              </div>
            </div>
            <a
              className="button whatsapp-direct"
              href="https://wa.me/38344116446"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare size={20} />
              {t("whatsappWrite")}
              <ArrowUpRight size={18} />
            </a>
            <div className="contact-detail">
              <Clock3 />
              <div>
                <small>{t("hours")}</small>
                <p>{t("hoursText")}</p>
              </div>
            </div>
            <a
              className="location-card"
              href={maps}
              target="_blank"
              rel="noreferrer"
            >
              <div className="map-art" aria-hidden="true">
                <i />
                <i />
                <i />
                <MapPin size={33} />
              </div>
              <div>
                <small>{t("location")}</small>
                <h3>{t("locationNote")}</h3>
                <p>{t("mapText")}</p>
                <span>
                  {t("directions")}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          </div>
          <div className="form-card">
            <span className="form-kicker">TOLI / {t("navContact")}</span>
            <h3>{t("formTitle")}</h3>
            <form
              hidden={request !== null}
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(
                  new FormData(e.currentTarget),
                ) as Record<string, string>;
                setRequest(data);
                setCopyStatus("");
              }}
            >
              <div className="form-row">
                <label>
                  {t("name")}
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  {t("phoneInput")}
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+383 …"
                    required
                    pattern="[+0-9() .\-]{6,25}"
                    maxLength={25}
                  />
                </label>
              </div>
              <fieldset className="service-picker">
                <legend>{t("service")}</legend>
                <div>
                  {services.map((s, i) => {
                    const Icon = [Truck, Navigation, MoveUpRight][i];
                    return (
                      <label className="service-choice" key={i}>
                        <input
                          type="radio"
                          name="service"
                          value={i}
                          defaultChecked={i === 0}
                        />
                        <span>
                          <Icon size={19} />
                          <span>{s.title}</span>
                          <span className="choice-dot">
                            <Check size={12} />
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <label>
                {t("pickup")}
                <input
                  name="pickup"
                  required
                  placeholder={t("pickupPlaceholder")}
                  maxLength={200}
                />
              </label>
              <label>
                {t("destination")} <small>({t("optional")})</small>
                <input
                  name="destination"
                  placeholder={t("destinationPlaceholder")}
                  maxLength={200}
                />
              </label>
              <label>
                {t("message")} <small>({t("optional")})</small>
                <textarea
                  name="message"
                  placeholder={t("messagePlaceholder")}
                  rows={3}
                  maxLength={1000}
                />
              </label>
              <button className="button submit" type="submit">
                {t("prepare")}
                <ArrowUpRight size={20} />
              </button>
              <p className="form-note">
                <MessageSquare size={17} />
                {t("formNote")}
              </p>
            </form>
            {request && (
              <div className="review" ref={reviewRef} tabIndex={-1}>
                <h4>{t("review")}</h4>
                <p>{t("reviewNote")}</p>
                <pre>{requestText}</pre>
                <a
                  className="button submit"
                  href={`https://wa.me/38344116446?text=${encodeURIComponent(requestText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare size={18} />
                  {t("whatsappOpen")}
                  <ArrowUpRight size={18} />
                </a>
                <div className="review-actions">
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(requestText);
                        setCopyStatus("copied");
                      } catch {
                        setCopyStatus("copyError");
                      }
                    }}
                  >
                    <Copy size={15} />
                    {t("copy")}
                  </button>
                  <button
                    onClick={() => {
                      setRequest(null);
                      setCopyStatus("");
                    }}
                  >
                    {t("edit")}
                  </button>
                </div>
                <p role="status">{copyStatus && t(copyStatus)}</p>
              </div>
            )}
          </div>
        </section>
        <section className="section container faq-section" id="faq">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("faqEyebrow")}</p>
              <h2>{t("faqTitle")}</h2>
            </div>
            <p className="section-intro">{t("localSeo")}</p>
          </div>
          <div className="faq-list">
            {(
              t("faqs", { returnObjects: true }) as { q: string; a: string }[]
            ).map((faq, i) => (
              <details key={i}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-top">
          <div>
            <Brand />
            <p>{t("footer")}</p>
          </div>
          <div className="footer-social">
            <a href={facebook} target="_blank" rel="noreferrer">
              Facebook
              <ArrowUpRight size={15} />
            </a>
            <a
              href="https://www.tiktok.com/@shlepautobartjetoli"
              target="_blank"
              rel="noreferrer"
            >
              TikTok
              <ArrowUpRight size={15} />
            </a>
            <a href={maps} target="_blank" rel="noreferrer">
              Google Maps
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} TOLI. {t("rights")}
          </span>
          <a href="#home">{t("top")} ↑</a>
        </div>
      </footer>
      <a
        hidden={contactVisible}
        className="mobile-call button"
        href="tel:+38344116446"
      >
        <Phone size={18} />
        {t("call")} · 044 116 446
      </a>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={t("navGallery")}
        onCancel={() => setPhoto(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPhoto(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setPhoto((p) => (p! + 1) % photos.length);
          if (e.key === "ArrowLeft")
            setPhoto((p) => (p! + photos.length - 1) % photos.length);
        }}
      >
        <button
          className="lightbox-close"
          aria-label={t("close")}
          onClick={() => setPhoto(null)}
        >
          <X />
        </button>
        {photo !== null && (
          <>
            <img
              src={photoUrl(photos[photo])}
              alt={labels[galleryLabelIndices[photo]]}
            />
            <div className="lightbox-controls">
              <button
                aria-label={t("previous")}
                onClick={() =>
                  setPhoto((photo + photos.length - 1) % photos.length)
                }
              >
                <ChevronLeft />
              </button>
              <p>
                {labels[galleryLabelIndices[photo]]}{" "}
                <small>
                  {photo + 1} / {photos.length}
                </small>
              </p>
              <button
                aria-label={t("next")}
                onClick={() => setPhoto((photo + 1) % photos.length)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
