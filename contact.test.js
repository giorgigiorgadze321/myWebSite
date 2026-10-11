"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { handler, validate } = require("../netlify/functions/contact.js");

const good = { name: "Ana K", email: "ana@example.com", type: "Online store", message: "I need a small online shop with a cart.", t: Date.now() - 10000 };
const post = (body, headers = {}) => handler({ httpMethod: "POST", headers, body: JSON.stringify(body) });
const setEnv = () => { delete process.env.ALLOWED_ORIGIN; Object.assign(process.env, { RESEND_API_KEY: "test", CONTACT_TO: "me@example.com", CONTACT_FROM: "site@example.com" }); };
const clearEnv = () => ["RESEND_API_KEY", "CONTACT_TO", "CONTACT_FROM", "ALLOWED_ORIGIN"].forEach((k) => delete process.env[k]);

test("validate rejects bad input", () => {
  const { errors } = validate({ name: "A", email: "nope", type: "x", message: "short" });
  assert.deepEqual(Object.keys(errors).sort(), ["email", "message", "name", "type"]);
});
test("validate accepts good input", () => assert.deepEqual(validate(good).errors, {}));
test("GET is rejected", async () => assert.equal((await handler({ httpMethod: "GET" })).statusCode, 405));
test("503 when not configured", async () => { clearEnv(); assert.equal((await post(good)).statusCode, 503); });
test("400 with field errors", async () => { setEnv(); const r = await post({ ...good, email: "bad" }); assert.equal(r.statusCode, 400); assert.ok(JSON.parse(r.body).errors.email); });
test("honeypot returns 200 without sending", async () => {
  setEnv(); let called = false; global.fetch = async () => { called = true; return { ok: true }; };
  const r = await post({ ...good, company: "Spam Inc" }); assert.equal(r.statusCode, 200); assert.equal(called, false);
});
test("too-fast submit is dropped", async () => {
  setEnv(); let called = false; global.fetch = async () => { called = true; return { ok: true }; };
  await post({ ...good, t: Date.now() }); assert.equal(called, false);
});
test("origin mismatch is forbidden", async () => { setEnv(); process.env.ALLOWED_ORIGIN = "https://mysite.example"; assert.equal((await post(good, { origin: "https://evil.example" })).statusCode, 403); });
test("sends email via provider", async () => {
  setEnv(); let sent;
  global.fetch = async (url, opts) => { sent = { url, opts }; return { ok: true, status: 200 }; };
  const r = await post({ ...good, name: "Ana\nBcc: x@evil.example" });
  assert.equal(r.statusCode, 200);
  const payload = JSON.parse(sent.opts.body);
  assert.ok(!/[\r\n]/.test(payload.subject));
  assert.equal(payload.reply_to, "ana@example.com");
});
test("502 when provider fails", async () => { setEnv(); global.fetch = async () => ({ ok: false, status: 500 }); assert.equal((await post(good)).statusCode, 502); });
