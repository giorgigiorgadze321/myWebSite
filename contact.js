"use strict";

const TYPES = [
  "Business website", "Online store", "Dashboard or web app",
  "Fix or improve an existing site", "Something else"
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body)
});
const clean = (v) => (typeof v === "string" ? v.replace(/\r\n/g, "\n").trim() : "");

// Mirrors the checks in public/assets/main.js. The server is the source of truth.
function validate(b) {
  const errors = {};
  const name = clean(b.name), email = clean(b.email), type = clean(b.type), message = clean(b.message);
  if (name.length < 2 || name.length > 100) errors.name = "Enter your name (2 to 100 characters).";
  if (!EMAIL.test(email) || email.length > 200) errors.email = "Enter a valid email address, for example name@company.com.";
  if (!TYPES.includes(type)) errors.type = "Choose what you need.";
  if (message.length < 20) errors.message = "Describe your project in at least 20 characters so I can reply usefully.";
  else if (message.length > 4000) errors.message = "Keep the message under 4000 characters.";
  return { errors, values: { name, email, type, message } };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method_not_allowed" });

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM, ALLOWED_ORIGIN } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return json(503, { error: "not_configured" });

  const headers = event.headers || {};
  const origin = headers.origin || headers.Origin;
  if (ALLOWED_ORIGIN && origin !== ALLOWED_ORIGIN) return json(403, { error: "forbidden" });
  if ((event.body || "").length > 20000) return json(413, { error: "too_large" });

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "bad_json" }); }
  if (!body || typeof body !== "object") return json(400, { error: "bad_json" });

  // Spam traps: a filled honeypot or an instant submit gets a quiet success and no email.
  if (clean(body.company) || Date.now() - Number(body.t) < 3000) return json(200, { ok: true });

  const { errors, values } = validate(body);
  if (Object.keys(errors).length) return json(400, { errors });

  const subject = `New enquiry: ${values.type} from ${values.name}`.replace(/[\r\n]+/g, " ").slice(0, 150);
  const text = `Name: ${values.name}\nEmail: ${values.email}\nType: ${values.type}\n\n${values.message}\n`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: CONTACT_FROM, to: [CONTACT_TO], reply_to: values.email, subject, text })
    });
    if (!res.ok) { console.error("Email provider returned", res.status); return json(502, { error: "send_failed" }); }
    return json(200, { ok: true });
  } catch (err) {
    console.error("Email request failed:", err && err.message);
    return json(502, { error: "send_failed" });
  }
};

exports.validate = validate;
