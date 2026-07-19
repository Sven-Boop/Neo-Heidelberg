import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * NEO Newsletter — Double-Opt-In, Schritt 2.
 * Prüft die HMAC-Signatur aus der Bestätigungsmail, nimmt die Adresse in die
 * Resend-Audience auf, benachrichtigt das NEO-Team und zeigt eine gebrandete
 * Bestätigungsseite im NEO-Look.
 */
const BASE = "https://neo-heidelberg.de";

function expected(email, secret) {
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}

function valid(email, token, secret) {
  const exp = expected(email, secret);
  if (!token || token.length !== exp.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(exp));
  } catch {
    return false;
  }
}

function page(lang, ok) {
  const c = ok
    ? lang === "en"
      ? { h: "You’re in.", p: "Your NEO newsletter subscription is confirmed. See you soon.", b: "Back to neo-heidelberg.de" }
      : { h: "Bestätigt.", p: "Deine Anmeldung zum NEO-Newsletter ist bestätigt. Bis bald.", b: "Zurück zu neo-heidelberg.de" }
    : lang === "en"
      ? { h: "Link invalid.", p: "This confirmation link is invalid or incomplete. Please subscribe again on our website.", b: "Back to neo-heidelberg.de" }
      : { h: "Link ungültig.", p: "Dieser Bestätigungslink ist ungültig oder unvollständig. Bitte melde dich erneut auf unserer Website an.", b: "Zurück zu neo-heidelberg.de" };
  const eyebrow = ok ? (lang === "en" ? "Newsletter · Confirmed" : "Newsletter · Bestätigt") : "Newsletter";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${c.h}</title><style>
:root{color-scheme:dark}
*{box-sizing:border-box;margin:0}
body{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:22px;padding:40px 24px;background:#161b22;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#AAC8DA}
h1{font-weight:800;font-size:clamp(38px,7vw,80px);line-height:1;letter-spacing:-.02em}
p{max-width:46ch;font-size:16px;line-height:1.7;color:#ccd5df}
a{margin-top:8px;display:inline-block;padding:14px 26px;border-radius:999px;background:#AAC8DA;color:#161b22;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;transition:opacity .2s}
a:hover{opacity:.85}
</style></head><body>
<div class="eyebrow">${eyebrow}</div>
<h1>${c.h}</h1>
<p>${c.p}</p>
<a href="${BASE}${lang === "en" ? "/en" : "/"}">${c.b}</a>
</body></html>`;
}

export async function GET(req) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("e") || "").trim();
  const token = url.searchParams.get("t") || "";
  const lang = url.searchParams.get("l") === "en" ? "en" : "de";
  const name = (url.searchParams.get("n") || "").trim().slice(0, 120);
  const secret = process.env.NEWSLETTER_SECRET || "";
  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;

  const good =
    !!secret &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    valid(email, token, secret);

  if (!good) {
    return new Response(page(lang, false), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (key && audience) {
    await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, first_name: name || undefined, unsubscribed: false }),
    }).catch(() => {});
  }
  if (key) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "NEO Heidelberg <onboarding@resend.dev>",
        to: [process.env.NEWSLETTER_TO || "info@neo-heidelberg.de"],
        subject: "NEO-Newsletter: Anmeldung bestätigt (Double-Opt-In)",
        text: `Bestätigte Newsletter-Anmeldung: ${name ? name + " · " : ""}${email}`,
      }),
    }).catch(() => {});
  }

  return new Response(page(lang, true), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
