"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// Einwilligung (Cookie-Hinweis) und Google-Tag für Google Ads, nach Vorbild hochzeit.bliss-group.de.
// Das Tag (gtag.js) lädt AUSSCHLIESSLICH nach „Akzeptieren“. Vorher und nach „Ablehnen“ wird nichts von
// Google geladen und kein Cookie gesetzt (Consent Mode v2 „basic“). Personalisierung und Remarketing
// bleiben aus. Gemessen werden Anfragen (Formulare, über window.blissMelde aus app/inlineScripts.js), Klicks zur
// Tischreservierung (Gastronaut), Anrufe (tel:) und E-Mails (mailto:, ohne Bewerbungen an personal@).
// Conversions laufen NUR über die Labels aus der Env (NEXT_PUBLIC_GADS_LABEL_<NAME>); ohne Label geht
// nur das normale Ereignis raus.

// ── Einstellungen dieser Seite ─────────────────────────────────────────────
const SPEICHER = "neo-consent"; // Schlüssel im localStorage
const EREIGNIS = "neo-consent-change";
const VERSION = 1; // erhöhen, wenn ein neuer Dienst dazukommt (dann wird neu gefragt)
const GUELTIG_MS = 365 * 24 * 60 * 60 * 1000; // nach zwölf Monaten neu fragen

export const ADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-11550875624";
export const ADS_LABELS = {
  anfrage: process.env.NEXT_PUBLIC_GADS_LABEL_ANFRAGE || "",
  anruf: process.env.NEXT_PUBLIC_GADS_LABEL_ANRUF || "",
  mail: process.env.NEXT_PUBLIC_GADS_LABEL_MAIL || "",
  reservierung: process.env.NEXT_PUBLIC_GADS_LABEL_RESERVIERUNG || "",
};

// Welche Links welches Ereignis auslösen (Prüfung auf das href-Attribut)
const ZIELE = [
  { ziel: "anruf", passt: (h) => /^tel:/i.test(h) },
  // Bewerbungen (personal@) sind keine Gäste-Anfrage
  { ziel: "mail", passt: (h) => /^mailto:/i.test(h) && !/^mailto:personal@/i.test(h) },
  // Tischreservierung bei Gastronaut (öffnet in neuem Tab, die Seite bleibt stehen)
  { ziel: "reservierung", passt: (h) => /reservation\.gastronaut\.ai\//i.test(h) },
];

// Deutsch und Englisch (/en …): Sprache nach dem Pfad
const TEXTE = {
  de: {
    region: "Hinweis zu Cookies",
    frage: "Dürfen wir mit Google Ads messen, ob unsere Anzeigen zu Reservierungen und Anfragen führen?",
    zusatz: "Ohne personalisierte Werbung, jederzeit widerrufbar.",
    datenschutz: "Datenschutz",
    impressum: "Impressum",
    ja: "Akzeptieren",
    nein: "Ablehnen",
    linkDatenschutz: "/datenschutz/",
    linkImpressum: "/impressum/",
  },
  en: {
    region: "Cookie notice",
    frage: "May we use Google Ads to measure whether our ads lead to reservations and enquiries?",
    zusatz: "No personalised advertising, you can withdraw at any time.",
    datenschutz: "Privacy",
    impressum: "Imprint",
    ja: "Accept",
    nein: "Decline",
    linkDatenschutz: "/en/datenschutz/",
    linkImpressum: "/en/impressum/",
  },
};
const sprache = () => (/^\/en(\/|$)/.test(window.location.pathname) ? "en" : "de");

// ── Gespeicherte Entscheidung ──────────────────────────────────────────────
// localStorage ist technisch notwendig, um die Entscheidung zu merken (§ 25 Abs. 2 TDDDG).
export function consentLesen() {
  try {
    const roh = localStorage.getItem(SPEICHER);
    if (!roh) return null;
    const e = JSON.parse(roh);
    if (e.v !== VERSION || Date.now() - e.ts > GUELTIG_MS) return null;
    return e.wert === "ja" || e.wert === "nein" ? e.wert : null;
  } catch {
    return null;
  }
}

function consentSetzen(wert) {
  try {
    if (wert) localStorage.setItem(SPEICHER, JSON.stringify({ v: VERSION, wert, ts: Date.now() }));
    else localStorage.removeItem(SPEICHER);
  } catch {}
  window.dispatchEvent(new CustomEvent(EREIGNIS, { detail: wert }));
}

// Beim Widerruf die Google-Cookies der eigenen Domain entfernen
function werbeCookiesLoeschen() {
  const ga = document.cookie.split(";").map((c) => c.trim().split("=")[0]).filter((n) => n.startsWith("_ga"));
  const namen = ["_gcl_au", "_gcl_aw", "_gcl_dc", "_gcl_gb", "_gcl_ag", "_gcl_gs", ...ga];
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
  for (const n of namen) {
    for (const d of domains) document.cookie = `${n}=; Max-Age=0; path=/${d ? "; domain=" + d : ""}`;
  }
}

// „Cookie-Einstellungen“: Entscheidung zurücknehmen und den Hinweis wieder zeigen. War Google erlaubt,
// erst dem geladenen Tag die Einwilligung entziehen, Cookies löschen und neu laden, damit das Tag verschwindet.
export function einstellungenOeffnen() {
  const vorher = consentLesen();
  consentSetzen(null);
  if (vorher === "ja") {
    window.gtag?.("consent", "update", { ad_storage: "denied", ad_user_data: "denied", analytics_storage: "denied" });
    werbeCookiesLoeschen();
    window.location.reload();
  }
}

// ── Klick-ID aus einer Anzeige (gclid) ─────────────────────────────────────
// Wird nur im Arbeitsspeicher der geöffneten Seite gehalten. Stimmt jemand erst nach einem Seitenwechsel zu,
// schreibt das Laden des Tags die Klick-ID kurz zurück in die Adresse, damit Google die Anzeige zuordnen kann.
const KLICK_IDS = ["gclid", "gbraid", "wbraid"];
let herkunft = null;

function herkunftMerken() {
  if (herkunft !== null || typeof window === "undefined") return;
  const q = new URLSearchParams(window.location.search);
  herkunft = KLICK_IDS.filter((p) => q.get(p)).map((p) => [p, q.get(p).slice(0, 500)]);
}

function kampagneEinblenden() {
  herkunftMerken();
  if (!herkunft || !herkunft.length) return null;
  const url = new URL(window.location.href);
  if (KLICK_IDS.some((p) => url.searchParams.has(p))) return null;
  for (const [p, w] of herkunft) url.searchParams.set(p, w);
  const pfad = window.location.pathname;
  try {
    window.history.replaceState(window.history.state, "", url);
  } catch {
    return null;
  }
  let geladen = false;
  let frist = false;
  let erledigt = false;
  const versuch = () => {
    if (erledigt || !geladen || !frist) return;
    erledigt = true;
    if (window.location.pathname !== pfad) return;
    const jetzt = new URL(window.location.href);
    for (const [p, w] of herkunft) if (jetzt.searchParams.get(p) === w) jetzt.searchParams.delete(p);
    try {
      window.history.replaceState(window.history.state, "", jetzt);
    } catch {}
  };
  setTimeout(() => {
    frist = true;
    versuch();
  }, 4000);
  setTimeout(() => {
    geladen = frist = true;
    versuch();
  }, 12000);
  return () =>
    setTimeout(() => {
      geladen = true;
      versuch();
    }, 1000);
}

// ── Messpunkte ─────────────────────────────────────────────────────────────
// Meldet ein Ereignis an Google Ads, aber nur, wenn das Tag nach Einwilligung geladen ist.
export function melde(ziel, extra = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const daten = { ...extra, transport_type: "beacon" };
  window.gtag("event", ziel, daten);
  const label = ADS_LABELS[ziel];
  if (label) window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, ...daten });
}

// Wie melde(), wartet aber höchstens etwa 1,2 s auf Googles Bestätigung. Für Ereignisse direkt vor einem
// Seitenwechsel (Anfrage → /danke). Ohne Einwilligung oder bei blockiertem Tag geht es sofort weiter.
export function meldeUndWarte(ziel, extra = {}, frist = 1200) {
  return new Promise((weiter) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return weiter();
    const label = ADS_LABELS[ziel];
    let offen = label ? 2 : 1;
    let erledigt = false;
    const ende = () => {
      if (erledigt) return;
      erledigt = true;
      clearTimeout(notfall);
      weiter();
    };
    const einer = () => {
      offen -= 1;
      if (offen <= 0) ende();
    };
    const notfall = setTimeout(ende, frist + 300);
    const daten = { ...extra, transport_type: "beacon", event_timeout: frist };
    window.gtag("event", ziel, { ...daten, event_callback: einer });
    if (label) window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, ...daten, event_callback: einer });
    if (!window.google_tag_manager) ende();
  });
}

// ── Bausteine ──────────────────────────────────────────────────────────────
// Rückmeldung „Tag ist geladen“ an kampagneEinblenden(); wird VOR dem Einfügen des Tags gesetzt
let tagGeladen = null;
let kampagneVersucht = false;

function GoogleTag() {
  const fertig = () => {
    tagGeladen?.();
    tagGeladen = null;
  };
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${ADS_ID}', { allow_ad_personalization_signals: false });`}
      </Script>
      <Script
        id="google-tag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        onLoad={fertig}
        onError={fertig}
      />
    </>
  );
}

function Hinweis() {
  const ref = useRef(null);
  const TEXT = TEXTE[sprache()];
  useEffect(() => {
    const html = document.documentElement;
    const setzen = () => html.style.setProperty("--einw-h", `${ref.current?.offsetHeight || 0}px`);
    setzen();
    html.classList.add("einw-offen");
    const beobachter = typeof ResizeObserver === "function" ? new ResizeObserver(setzen) : null;
    if (ref.current) beobachter?.observe(ref.current);
    window.addEventListener("resize", setzen);
    return () => {
      beobachter?.disconnect();
      window.removeEventListener("resize", setzen);
      html.classList.remove("einw-offen");
      html.style.removeProperty("--einw-h");
    };
  }, []);
  return (
    <div className="einw" role="region" aria-label={TEXT.region} ref={ref}>
      <div className="einw-in">
        <p className="einw-text">
          <strong>{TEXT.frage}</strong> {TEXT.zusatz}{" "}
          <span className="einw-links">
            <a href={TEXT.linkDatenschutz}>{TEXT.datenschutz}</a> · <a href={TEXT.linkImpressum}>{TEXT.impressum}</a>
          </span>
        </p>
        <div className="einw-knoepfe">
          <button type="button" className="einw-knopf" onClick={() => consentSetzen("ja")}>
            {TEXT.ja}
          </button>
          <button type="button" className="einw-knopf" onClick={() => consentSetzen("nein")}>
            {TEXT.nein}
          </button>
        </div>
      </div>
    </div>
  );
}

// Steht einmal im Root-Layout: Hinweis, Google-Tag nach Einwilligung, Klick-Messpunkte und der
// Knopf „Cookie-Einstellungen“ (jedes Element mit data-cookie-einstellungen öffnet den Hinweis wieder).
export function Einwilligung() {
  const [stand, setStand] = useState(undefined); // undefined = noch nicht gelesen (Server-HTML ohne Hinweis)

  useEffect(() => {
    herkunftMerken();
    const lesen = () => {
      const wert = consentLesen();
      // Erst die gemerkte Klick-ID zurück in die Adresse, DANN das Tag laden
      if (wert === "ja" && !kampagneVersucht) {
        kampagneVersucht = true;
        tagGeladen = kampagneEinblenden();
      }
      setStand(wert);
    };
    lesen();
    window.addEventListener(EREIGNIS, lesen);
    window.blissMelde = melde;

    const klick = (e) => {
      const ziel = e.target instanceof Element ? e.target : null;
      if (!ziel) return;
      if (ziel.closest("[data-cookie-einstellungen]")) {
        e.preventDefault();
        einstellungenOeffnen();
        return;
      }
      const markiert = ziel.closest("[data-ziel]");
      if (markiert) return melde(markiert.getAttribute("data-ziel"), { seite: window.location.pathname });
      const a = ziel.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const treffer = ZIELE.find((z) => z.passt(href));
      if (treffer) melde(treffer.ziel, { seite: window.location.pathname, ...(treffer.extra ? treffer.extra(href) : {}) });
    };
    document.addEventListener("click", klick, true);
    return () => {
      window.removeEventListener(EREIGNIS, lesen);
      document.removeEventListener("click", klick, true);
    };
  }, []);

  return (
    <>
      {stand === null && <Hinweis />}
      {stand === "ja" && <GoogleTag />}
    </>
  );
}
