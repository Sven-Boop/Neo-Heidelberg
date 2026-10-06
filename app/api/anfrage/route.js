export const runtime = "nodejs";

/**
 * NEO Anfrageformular (Events, Firmen, Gruppen, Hochzeit) — Versand per Resend.
 * Absender neo@bliss-group.de (Domain bliss-group.de ist bei Resend verifiziert),
 * Empfänger info@neo-heidelberg.de + sales@bliss-group.de, Antwort-Adresse = Gast.
 * Ohne RESEND_API_KEY -> 503; der Client bietet dann den mailto-Weg an.
 *
 * Kontroll-Lauf (GitHub Actions, scripts/formular-check.cjs) schickt zusätzlich _kontrolle=1:
 * derselbe Weg, die Mail geht dann an die Resend-Testadresse statt in ein Postfach.
 * Sven bekommt nur noch Mails, wenn etwas nicht klappt (Sven, 06.10.2026) — den Alarm
 * schickt /api/kontrolle.
 */
const ABSENDER = "NEO Heidelberg <neo@bliss-group.de>";
const ZIELE = ["info@neo-heidelberg.de", "sales@bliss-group.de"];
const KONTROLLE_ZIEL = "delivered@resend.dev";

function datumDE(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

export async function POST(req) {
  let fd;
  try {
    fd = await req.formData();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  // Längen kappen — schützt die Mail-Zustellung vor Riesen-Payloads
  const get = (k, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

  // Honeypot: Menschen sehen das Feld nicht — ist es gefüllt, war es ein Bot.
  // Der Bot bekommt "ok", damit er kein Feedback zum Nachjustieren erhält.
  if (get("_honey")) return Response.json({ ok: true });

  const anlass = get("anlass", 80);
  const name = get("name", 120);
  const email = get("mail");
  const telefon = get("telefon", 60);
  const datum = datumDE(get("datum", 20));
  const gaeste = get("gaeste", 10);
  const nachricht = get("nachricht", 5000);
  const quelle = get("quelle", 40);
  const lang = get("lang", 5) === "en" ? "EN" : "DE";
  const kontrolle = get("_kontrolle") === "1";

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "name_email_required" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[anfrage] RESEND_API_KEY fehlt");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const heute = new Date().toLocaleDateString("de-DE", { timeZone: "Europe/Berlin" });
  const betreff = kontrolle
    ? `✓ Formular-Check neo-heidelberg.de OK – ${heute}`
    : `Anfrage NEO — ${anlass || "Anfrage"} · ${name}${datum ? " · " + datum : ""}`;
  const text = [
    kontrolle
      ? "Automatischer Kontroll-Lauf: Das Anfrageformular auf neo-heidelberg.de funktioniert.\n"
      : "Neue Anfrage über neo-heidelberg.de\n",
    `Anlass: ${anlass || "—"}`,
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${telefon || "—"}`,
    `Wunschdatum: ${datum || "—"}`,
    `Gäste: ${gaeste || "—"}`,
    "",
    "Nachricht:",
    nachricht || "(keine)",
    "",
    `— Formular: ${quelle || "Website"} · Sprache: ${lang} · Antworten geht direkt an den Gast.`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: ABSENDER,
      to: kontrolle ? [KONTROLLE_ZIEL] : ZIELE,
      reply_to: email,
      subject: betreff.slice(0, 200),
      text,
    }),
  }).catch(() => null);

  if (res && res.ok) return Response.json({ ok: true });
  console.error("[anfrage] resend failed", res?.status, await res?.text().catch(() => ""));
  return Response.json({ ok: false, error: "mailer_error" }, { status: 502 });
}
