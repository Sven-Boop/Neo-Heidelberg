import { createHmac } from "node:crypto";

/**
 * NEO Newsletter — Double-Opt-In, Schritt 1.
 * Die Anmeldung nimmt niemanden direkt auf, sondern schickt eine
 * Bestätigungs-E-Mail mit signiertem Link an die Adresse. Erst der Klick
 * (siehe confirm/route.js) nimmt die Adresse in die Resend-Audience auf.
 * Ohne RESEND_API_KEY/NEWSLETTER_SECRET -> 503, der Client fällt auf mailto zurück.
 */
const BASE = "https://neo-heidelberg.de";

function sign(email, secret) {
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}

export async function POST(req) {
  let raw;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "bad_json" }, { status: 400 });
  }
  const data = raw || {};
  const email = typeof data.email === "string" ? data.email.trim().slice(0, 200) : "";
  const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
  const lang = data.lang === "en" ? "en" : "de";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return Response.json({ error: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const secret = process.env.NEWSLETTER_SECRET;
  if (!key || !secret) return Response.json({ error: "not_configured" }, { status: 503 });

  const link = `${BASE}/api/newsletter/confirm?e=${encodeURIComponent(email)}&t=${sign(
    email,
    secret,
  )}&l=${lang}&n=${encodeURIComponent(name)}`;

  const hello = name
    ? lang === "en"
      ? `Hi ${name},`
      : `Hallo ${name},`
    : lang === "en"
      ? "Hi,"
      : "Hallo,";

  const copy =
    lang === "en"
      ? {
          subject: "Please confirm your NEO newsletter subscription",
          text: `${hello}\n\nalmost done — please confirm with one click that you'd like to receive the NEO Heidelberg newsletter:\n\n${link}\n\nIf you didn't sign up, simply ignore this email; nothing happens without your confirmation.\n\nNEO Bar & Restaurant · Heidelberg`,
        }
      : {
          subject: "Bitte bestätige deine Anmeldung zum NEO-Newsletter",
          text: `${hello}\n\nfast geschafft — bitte bestätige mit einem Klick, dass du den Newsletter von NEO Heidelberg erhalten möchtest:\n\n${link}\n\nWenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach; ohne Bestätigung passiert nichts.\n\nNEO Bar & Restaurant · Heidelberg`,
        };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "NEO Heidelberg <onboarding@resend.dev>",
      to: [email],
      subject: copy.subject,
      text: copy.text,
    }),
  });

  if (!res.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
