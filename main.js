(() => {
  "use strict";
  const S = window.SITE;
  if (!S) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ticks = (items) => `<ul class="ticks">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  const chips = (items) => `<ul class="chips">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  const safeUrl = (u) => (/^https?:\/\//i.test(u) ? u : "");

  /* Illustrative sketches (not screenshots). */
  const R = (c, x, y, w, h, rx = 2) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const ART = {
    site: () => [R("c", 16, 14, 288, 172, 4), R("a", 28, 26, 50, 8), R("d", 200, 26, 24, 8), R("d", 232, 26, 24, 8), R("b", 264, 24, 28, 12),
      R("a", 28, 56, 140, 14), R("a", 28, 76, 110, 14), R("d", 28, 100, 120, 6), R("b", 28, 116, 52, 14, 3), R("a", 188, 56, 104, 74, 3),
      R("a", 28, 146, 80, 30, 3), R("a", 120, 146, 80, 30, 3), R("a", 212, 146, 80, 30, 3)].join(""),
    store: () => {
      let s = R("c", 16, 14, 288, 172, 4);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
        s += R("a", 28 + i * 70, 28 + j * 78, 62, 44, 3) + R("d", 28 + i * 70, 78 + j * 78, 50, 5) + R("b", 28 + i * 70, 88 + j * 78, 24, 8);
      }
      return s + R("a", 240, 28, 54, 150, 3) + R("c", 246, 36, 42, 5) + R("c", 246, 48, 42, 5) + R("b", 246, 152, 42, 16, 3);
    },
    dashboard: () => {
      let s = R("c", 16, 14, 288, 172, 4) + R("a", 28, 26, 48, 148, 3) + R("d", 88, 26, 208, 8);
      for (let i = 0; i < 4; i++) s += R("a", 88, 44 + i * 18, 208, 12);
      [30, 50, 38, 64, 46, 72].forEach((h, i) => { s += R("b", 92 + i * 34, 170 - h, 22, h, 2); });
      return s;
    }
  };
  const art = (k) => `<div class="art"><svg viewBox="0 0 320 200" role="img" aria-label="Illustrative layout sketch, not a screenshot of working software">${ART[k]()}</svg></div>`;

  const section = (id, title, intro, body) =>
    `<section class="section" id="${id}" aria-labelledby="h-${id}"><div class="wrap section-grid"><div class="section-head"><h2 id="h-${id}">${esc(title)}</h2>${intro ? `<p>${esc(intro)}</p>` : ""}</div><div>${body}</div></div></section>`;

  const hero = () => `
<section class="hero" id="top" aria-labelledby="h-hero"><div class="wrap hero-grid">
  <div>
    <h1 id="h-hero">${esc(S.hero.headline)}</h1>
    <p class="lede">${esc(S.hero.intro)}</p>
    <div class="actions"><a class="btn btn-primary" href="#contact">Discuss a project</a><a class="btn btn-quiet" href="#projects">See selected projects</a></div>
    <ul class="disciplines" aria-label="Disciplines">${S.hero.disciplines.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
  </div>
  <aside class="brief" aria-labelledby="h-brief">
    <h2 id="h-brief">What are you building?</h2>
    <div class="tabs" role="tablist" aria-label="Project type">${S.brief.map((b, i) => `<button class="tab" role="tab" id="tab-${i}" type="button" aria-controls="brief-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(b.label)}</button>`).join("")}</div>
    <div id="brief-panel" role="tabpanel" aria-labelledby="tab-0"><div id="brief-list"></div><p class="brief-tools" id="brief-tools"></p></div>
    <a class="btn btn-primary" id="brief-go" href="#contact">Start this brief</a>
  </aside>
</div></section>`;

  const project = (p, i) => {
    const demo = safeUrl(p.demoUrl), repo = safeUrl(p.repoUrl);
    const links = demo || repo
      ? `<p class="links">${demo ? `<a href="${esc(demo)}" rel="noopener">Live demo</a>` : ""}${repo ? `<a href="${esc(repo)}" rel="noopener">Source code</a>` : ""}</p>`
      : `<p class="soon">Live demo and source code will be linked here when this project is built.</p>`;
    return `<article class="project${i === 0 ? " feature" : ""}">${art(p.art)}<div class="p-body">
      <p class="status">${esc(p.status)}</p><h3>${esc(p.name)}</h3><p class="cat">${esc(p.category)}</p>
      <div class="copy"><p>${esc(p.problem)}</p><p>${esc(p.solution)}</p></div>
      <details><summary>Planned features</summary>${ticks(p.features)}</details>${chips(p.stack)}${links}</div></article>`;
  };

  const service = (s) => `<article class="service"><h3>${esc(s.name)}</h3><p class="gets">${esc(s.gets)}</p>${ticks(s.deliverables)}<p class="small">Solves: ${esc(s.solves)}</p><p class="small">Suited to: ${esc(s.tech)}</p></article>`;

  const form = () => `
<form class="form" id="contact-form" novalidate>
  <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required aria-describedby="e-name"><p class="err" id="e-name"></p></div>
  <div class="field"><label for="f-email">Email address</label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email"><p class="err" id="e-email"></p></div>
  <div class="field"><label for="f-type">What do you need?</label>
    <select id="f-type" name="type" required aria-describedby="e-type"><option value="">Choose one</option>${TYPES().map((t) => `<option>${esc(t)}</option>`).join("")}</select><p class="err" id="e-type"></p></div>
  <div class="field"><label for="f-message">Project details</label><textarea id="f-message" name="message" required aria-describedby="e-message"></textarea><p class="err" id="e-message"></p></div>
  <div class="hp" aria-hidden="true"><label>Company<input name="company" tabindex="-1" autocomplete="off"></label></div>
  <div><button class="btn btn-primary" id="f-send" type="submit">Send message</button></div>
  <p class="status-msg" id="form-status" role="status" aria-live="polite"></p>
</form>`;

  const TYPES = () => [...S.brief.map((b) => b.formType), "Fix or improve an existing site", "Something else"];

  const contactBody = () => `${form()}${S.contact.email ? `<p class="fallback">Prefer email? <a href="mailto:${esc(S.contact.email)}">${esc(S.contact.email)}</a></p>` : ""}`;

  const render = () => {
    $("#main").innerHTML = hero()
      + section("projects", "Selected projects", S.projects.intro, `<div class="projects">${S.projects.items.map(project).join("")}</div>`)
      + section("services", "Services", S.services.intro, `<div class="services">${S.services.items.map(service).join("")}</div>`)
      + section("process", "How a project runs", S.process.intro, `<ol class="steps">${S.process.steps.map((s) => `<li><div><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></div></li>`).join("")}</ol>`)
      + section("about", "About", "", `<div class="about-text">${S.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div><div class="skills">${S.about.skills.map((g) => `<div><h3>${esc(g.group)}</h3>${chips(g.items)}</div>`).join("")}</div>`)
      + section("contact", "Contact", S.contactIntro, contactBody());

    const links = S.contact.links.filter((l) => safeUrl(l.url));
    $("#footer").innerHTML = `<div class="wrap"><div class="foot">
      <div><p class="mark"><span class="mark-dot" aria-hidden="true"></span><span>${esc(S.name)}</span></p><p>${esc(S.title)}${S.localName ? ` · ${esc(S.localName)}` : ""}</p><p>${esc(S.closing)}</p></div>
      <div><h2>Navigate</h2><ul><li><a href="#projects">Projects</a></li><li><a href="#services">Services</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul></div>
      <div>${links.length ? `<h2>Elsewhere</h2><ul>${links.map((l) => `<li><a href="${esc(l.url)}" rel="noopener">${esc(l.label)}</a></li>`).join("")}</ul>` : ""}</div>
    </div><p class="legal">© ${new Date().getFullYear()} ${esc(S.name)}. Project previews are illustrative sketches, not screenshots.</p></div>`;
    $$("[data-bind=name]").forEach((el) => { el.textContent = S.name; });
  };

  /* Navigation: mobile menu + active link */
  const setupNav = () => {
    const btn = $("#menu-btn"), nav = $("#nav");
    const setOpen = (open) => { nav.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); };
    btn.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); btn.focus(); } });
    if (!("IntersectionObserver" in window)) return;
    const links = $$("nav a:not(.btn)");
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + en.target.id)));
    }), { rootMargin: "-40% 0px -55% 0px" });
    ["projects", "services", "process", "about", "contact"].forEach((id) => io.observe($("#" + id)));
  };

  /* Brief starter tabs */
  const setupBrief = () => {
    const tabs = $$(".tab");
    const select = (i, focus) => {
      tabs.forEach((t, k) => { t.setAttribute("aria-selected", String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      $("#brief-list").innerHTML = ticks(S.brief[i].includes);
      $("#brief-tools").textContent = "Typical tools: " + S.brief[i].tools;
      $("#brief-panel").setAttribute("aria-labelledby", "tab-" + i);
      $("#brief-go").dataset.type = S.brief[i].formType;
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select((i + k + tabs.length) % tabs.length, true); }
        if (e.key === "Home") { e.preventDefault(); select(0, true); }
        if (e.key === "End") { e.preventDefault(); select(tabs.length - 1, true); }
      });
    });
    $("#brief-go").addEventListener("click", (e) => {
      $("#f-type").value = e.currentTarget.dataset.type || "";
      setTimeout(() => $("#f-name").focus({ preventScroll: true }), 400);
    });
    select(0);
  };

  /* Contact form */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const validate = (d) => {
    const e = {}, name = (d.name || "").trim(), msg = (d.message || "").trim();
    if (name.length < 2 || name.length > 100) e.name = "Enter your name (2 to 100 characters).";
    if (!EMAIL.test((d.email || "").trim()) || d.email.length > 200) e.email = "Enter a valid email address, for example name@company.com.";
    if (!TYPES().includes(d.type)) e.type = "Choose what you need.";
    if (msg.length < 20) e.message = "Describe your project in at least 20 characters so I can reply usefully.";
    else if (msg.length > 4000) e.message = "Keep the message under 4000 characters.";
    return e;
  };
  const showErrors = (errs) => {
    ["name", "email", "type", "message"].forEach((f) => {
      const input = $("#f-" + f);
      $("#e-" + f).textContent = errs[f] || "";
      if (errs[f]) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
    });
    const first = ["name", "email", "type", "message"].find((f) => errs[f]);
    if (first) $("#f-" + first).focus();
  };
  const setStatus = (kind, text, withFallback) => {
    const el = $("#form-status");
    el.className = "status-msg " + kind;
    el.textContent = text;
    if (withFallback && S.contact.email) {
      const a = document.createElement("a");
      a.href = "mailto:" + S.contact.email; a.textContent = S.contact.email;
      el.append(" You can also email ", a, ".");
    }
  };
  const setupForm = () => {
    const f = $("#contact-form"), btn = $("#f-send"), loadedAt = Date.now();
    f.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const data = Object.fromEntries(new FormData(f));
      const errs = validate(data);
      showErrors(errs);
      if (Object.keys(errs).length) { setStatus("error", "Some fields need attention. The first one is selected."); return; }
      btn.disabled = true; setStatus("", "Sending…");
      try {
        const res = await fetch(S.contact.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, t: loadedAt }) });
        const body = await res.json().catch(() => ({}));
        if (res.ok) { f.reset(); setStatus("ok", "Message sent. I will reply to " + data.email.trim() + "."); }
        else if (res.status === 400 && body.errors) { showErrors(body.errors); setStatus("error", "Some fields need attention. The first one is selected."); }
        else if (res.status === 503 || res.status === 404) setStatus("error", "The contact form is not set up on this site yet.", true);
        else setStatus("error", "Your message could not be sent. Please try again in a moment.", true);
      } catch {
        setStatus("error", "Could not reach the server. Check your connection and try again.", true);
      } finally { btn.disabled = false; }
    });
  };

  render(); setupNav(); setupBrief(); setupForm();
})();
