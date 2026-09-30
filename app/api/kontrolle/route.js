import { createPublicKey, verify as cryptoVerify } from "node:crypto";

export const runtime = "nodejs";

/**
 * Alarm-Kanal für den täglichen Formular-Check (GitHub Actions, scripts/formular-check.cjs).
 * Der Lauf schickt ein GitHub-OIDC-Token mit — kein Secret im Repo nötig. Geprüft werden
 * Signatur, Aussteller, Zielgruppe, Repository und Ablauf; dann geht der Bericht per Resend an Sven.
 */
const AUD = "neo-heidelberg-kontrolle";
const ISS = "https://token.actions.githubusercontent.com";
const REPO = "Sven-Boop/Neo-Heidelberg";

const b64 = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

async function tokenPruefen(token) {
  const teile = String(token).split(".");
  if (teile.length !== 3) return "token_format";
  const header = JSON.parse(b64(teile[0]).toString("utf8"));
  const claims = JSON.parse(b64(teile[1]).toString("utf8"));
  if (header.alg !== "RS256") return "alg";
  if (claims.iss !== ISS) return "iss";
  if (claims.aud !== AUD) return "aud";
  if (claims.repository !== REPO) return "repo";
  if (typeof claims.exp !== "number" || claims.exp * 1000 < Date.now()) return "exp";
  const jwks = await fetch(`${ISS}/.well-known/jwks`, { cache: "no-store" }).then((r) => r.json());
  const jwk = (jwks.keys || []).find((k) => k.kid === header.kid);
  if (!jwk) return "kid";
  const key = createPublicKey({ key: jwk, format: "jwk" });
  const ok = cryptoVerify("RSA-SHA256", Buffer.from(`${teile[0]}.${teile[1]}`), key, b64(teile[2]));
  return ok ? null : "signatur";
}

export async function POST(req) {
  const { token, betreff, text } = (await req.json().catch(() => ({}))) || {};
  if (!token) return Response.json({ ok: false, error: "token_fehlt" }, { status: 401 });
  const fehler = await tokenPruefen(token).catch(() => "pruefung");
  if (fehler) return Response.json({ ok: false, error: fehler }, { status: 401 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, error: "resend_key_fehlt" }, { status: 500 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "NEO Kontrolle <neo@bliss-group.de>",
      to: ["sven@bliss-group.de"],
      subject: String(betreff || "neo-heidelberg.de Kontroll-Lauf").slice(0, 200),
      text: String(text || "(kein Text)").slice(0, 20000),
    }),
  });
  if (!res.ok) {
    console.error("[kontrolle] resend failed", res.status, await res.text().catch(() => ""));
    return Response.json({ ok: false, error: "mailer_error" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
