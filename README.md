# Giorgi Giorgadze | Developer portfolio

A static portfolio site (HTML, CSS, JavaScript) with a serverless contact form. No build step and no runtime dependencies.

**Why not React + Vite?** The site is content-first with a few interactions (menu, tabs, form). Plain files load faster, need no toolchain to maintain, and deploy anywhere. Keep React for the demonstration projects, where it earns its place.

## Structure

```
public/                  Deployed site
  index.html             Page shell and SEO metadata
  site.config.js         ALL editable content (text, projects, services, links)
  assets/styles.css      Design tokens and layout
  assets/main.js         Rendering, menu, tabs, form handling
  favicon.svg, robots.txt
netlify/functions/contact.js   Contact form backend (validation, spam checks, email via Resend)
tests/contact.test.js    Unit tests for the backend
netlify.toml             Publish folder and security headers
.env.example             Required environment variables
```

## Run locally

Requires Node.js 18 or newer. There is nothing to install.

1. Preview the site only: `npx serve public` and open the printed address. The contact form will report that it is not set up.
2. Preview with the working form: copy `.env.example` to `.env`, fill it in (below), then run `npx netlify-cli dev`.
3. Run the tests: `npm test`

## Make it yours

Edit `public/site.config.js`:

- `contact.email`: public fallback address shown if the form fails (empty hides it).
- `contact.links`: add only profiles that exist (GitHub, Freelancer.com profile).
- `skills`, `services`, `projects`: remove anything you cannot demonstrate.
- When a project is built, set its `demoUrl` and `repoUrl` and change `status`.
- `localName`: your name in Georgian script, shown in the footer (optional).

## Contact form setup (Resend)

1. Create a free account at resend.com and an API key.
2. Verify a sending domain (needed to send to arbitrary addresses). Without one, Resend's test sender only delivers to your own account email, which is fine for testing.
3. Set `RESEND_API_KEY`, `CONTACT_TO` (where enquiries arrive), `CONTACT_FROM` (a verified sender) and, in production, `ALLOWED_ORIGIN` (your exact site URL).

Spam protection: hidden honeypot field, minimum-time check, server-side validation, origin check, size limit. This stops simple bots; for heavy abuse add a rate limiter or CAPTCHA (Cloudflare Turnstile is free).

## Deploy (Netlify, free tier)

1. Push this folder to a GitHub repository (`.env` is git-ignored).
2. In Netlify: Add new site > Import from Git. Settings are read from `netlify.toml`.
3. Add the environment variables above under Site configuration > Environment variables, then redeploy.
4. Submit a test message from the live site.
5. After you have a final domain: add `<link rel="canonical">`, a `sitemap.xml`, a `Sitemap:` line in `robots.txt`, and an `og:image` (1200x630 PNG) to `index.html`.

Costs: Netlify and Resend free tiers are enough for a portfolio; a custom domain is the only usual expense.

## Testing checklist

- [ ] Menu opens, closes (link click, Escape) and every nav link scrolls to its section
- [ ] Tabs in "What are you building?" work with mouse and arrow keys; "Start this brief" preselects the form type
- [ ] Form: empty, invalid email, short message each show an error and focus the first bad field
- [ ] Form: valid submit delivers an email and shows the success message
- [ ] Form: with env vars missing, a clear "not set up" message appears
- [ ] No horizontal scroll at 320, 390, 768, 1366 and 1920 px
- [ ] Full keyboard pass: visible focus on every control, skip link works
- [ ] Browser console shows no errors; Lighthouse run on the deployed URL

## Status

**Verified in this build:** JavaScript syntax checks pass; 10 backend unit tests pass (`npm test`).

**Not verified (no browser or network in the build environment):** visual layout, responsive behavior, accessibility audit, Lighthouse scores, real email delivery, deployment. Work through the checklist above and fix anything it finds.

**Known limitations:** content is rendered by JavaScript (search engines that run JS index it; add static HTML or a pre-render step if SEO becomes critical); project previews are illustrative sketches; the three projects are planned, not built; no per-project case-study pages yet.
