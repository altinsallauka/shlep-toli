import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pathFor, languages } from './seo';
import { privacyCopy, privacyPath } from './privacy-content';
const storageKey = 'toli-privacy-notice-v1';
export function PrivacyLinks() {
  const { i18n } = useTranslation();
  const text = privacyCopy(i18n.language);
  return <div className="privacy-links"><a href={privacyPath(i18n.language)}>{text.title}</a><button type="button" onClick={() => window.dispatchEvent(new Event('toli:privacy-open'))}>{text.settings}</button></div>;
}
export function CookieNotice() {
  const { i18n } = useTranslation();
  const text = privacyCopy(i18n.language);
  const [visible, setVisible] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    try { setVisible(localStorage.getItem(storageKey) !== 'acknowledged'); } catch { setVisible(true); }
    const reopen = () => { returnFocus.current = document.activeElement as HTMLElement; setVisible(true); requestAnimationFrame(() => panel.current?.focus()); };
    window.addEventListener('toli:privacy-open', reopen);
    return () => window.removeEventListener('toli:privacy-open', reopen);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('privacy-notice-open', visible);
    return () => document.body.classList.remove('privacy-notice-open');
  }, [visible]);
  function dismiss() {
    try { localStorage.setItem(storageKey, 'acknowledged'); } catch { /* The notice also works when storage is unavailable. */ }
    setVisible(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
  }
  if (!visible) return null;
  return <aside className="cookie-notice" aria-labelledby="cookie-title" ref={panel} tabIndex={-1}>
    <div><h2 id="cookie-title">{text.settings}</h2><p>{text.notice} <a href={privacyPath(i18n.language)}>{text.title} ↗</a></p></div>
    <button type="button" className="button" onClick={dismiss}>{text.okay}</button>
  </aside>;
}
export function PrivacyPage() {
  const { i18n } = useTranslation();
  const text = privacyCopy(i18n.language);
  useEffect(() => { document.documentElement.lang = i18n.language; document.title = `${text.title} | TOLI`; }, [i18n.language, text.title]);
  return <><header className="privacy-header container"><a className="privacy-brand" href={pathFor(i18n.language)}>TOLI<span>.</span></a><nav className="languages" aria-label="Language">{languages.map(lang => <a key={lang} href={privacyPath(lang)} hrefLang={lang} aria-current={lang === i18n.language ? 'page' : undefined}>{lang === 'sq' ? 'SQ' : lang.toUpperCase()}</a>)}</nav></header>
    <main className="privacy-page container"><a className="privacy-back" href={pathFor(i18n.language)}>← {text.back}</a><p className="eyebrow">TOLI · {text.updated}</p><h1>{text.title}</h1><p className="privacy-intro">{text.intro}</p>
      {text.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      <section><h2>{text.links}</h2><ul>{[
        ['GitHub', 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'],
        ['WhatsApp', 'https://www.whatsapp.com/legal/privacy-policy'],
        ['Google Maps', 'https://policies.google.com/privacy'],
        ['Facebook', 'https://www.facebook.com/privacy/policy/'],
        ['TikTok', 'https://www.tiktok.com/legal/page/eea/privacy-policy/en']
      ].map(([name, href]) => <li key={name}><a href={href} target="_blank" rel="noopener noreferrer">{name} ↗</a></li>)}</ul></section>
      <a className="button" href="tel:+38344116446">+383 44 116 446</a>
    </main><footer className="privacy-footer container"><PrivacyLinks/><a href={pathFor(i18n.language)}>{text.back} ↑</a></footer></>;
}
