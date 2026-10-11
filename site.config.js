
window.SITE = {
  name: "Giorgi Giorgadze",
  localName: "",
  title: "Full-Stack Developer",

  contact: {
    email: "",
    formEndpoint: "/.netlify/functions/contact",
    links: []
  },

  hero: {
    headline: "I build websites and web apps that small businesses can rely on.",
    intro: "Giorgi Giorgadze, full-stack developer. Business sites, online stores and management dashboards: scoped clearly, built to be maintained, and delivered with the setup notes your team needs.",
    disciplines: ["HTML and CSS", "JavaScript", "React", "Tailwind CSS", "Node.js", "SQL"]
  },

  brief: [
    { label: "Business website", formType: "Business website",
      includes: ["Pages designed for phones first, then tablets and desktops", "A contact form that emails you and filters spam", "Search and social sharing metadata", "Setup on your hosting, with a short handover note"],
      tools: "HTML, CSS and JavaScript, or React with Tailwind CSS" },
    { label: "Online store", formType: "Online store",
      includes: ["Product pages with search, filters and sorting", "A cart that keeps its contents between visits", "An order flow from cart to confirmation", "Payments through a provider account you own"],
      tools: "React, Tailwind CSS, Node.js and an SQL database" },
    { label: "Dashboard", formType: "Dashboard or web app",
      includes: ["Sign-in with different access levels", "Records you can add, edit, search and sort", "Forms checked in the browser and on the server", "A database with setup scripts"],
      tools: "React, Node.js, a REST API and an SQL database" }
  ],

  projects: {
    intro: "Three demonstration projects, each aimed at work clients commonly ask for. They are planned, not built yet, and each one gets its own demo and source links when it ships.",
    items: [
      { name: "Service-business website", category: "Business website", art: "site",
        status: "Planned demonstration",
        problem: "Local businesses lose enquiries when their site is slow on phones or the contact form fails without anyone noticing.",
        solution: "A fast, responsive site whose contact form validates input, blocks spam and emails the owner.",
        features: ["Responsive layouts from 320 px upward", "Form checks in the browser and on the server", "Spam protection that needs no CAPTCHA", "Search and social sharing metadata", "Keyboard-friendly navigation"],
        stack: ["HTML", "CSS", "JavaScript", "Node.js"], demoUrl: "", repoUrl: "" },
      { name: "Small-shop storefront", category: "Online store", art: "store",
        status: "Planned demonstration",
        problem: "Small shops need customers to browse and order without a heavy platform they do not need.",
        solution: "A product catalog with search and filters, a cart that persists, and an order flow. Real payments need a provider account.",
        features: ["Search, category filters and sorting", "Cart that survives page reloads", "Order summary and confirmation step"],
        stack: ["React", "Tailwind CSS", "Node.js", "SQL"], demoUrl: "", repoUrl: "" },
      { name: "Bookings and orders dashboard", category: "Management application", art: "dashboard",
        status: "Planned demonstration",
        problem: "Owners track bookings or orders in spreadsheets and chat threads, which stops working as volume grows.",
        solution: "A sign-in protected dashboard backed by a database, with role-based access.",
        features: ["Authentication and roles", "Add, edit, search, sort and paginate records", "Validation on client and server", "Database setup scripts"],
        stack: ["React", "Node.js", "REST API", "SQL"], demoUrl: "", repoUrl: "" }
    ]
  },

  services: {
    intro: "Each service is a defined result, not a list of tools.",
    items: [
      { name: "Business websites", gets: "A professional site that works on every screen and brings enquiries to your inbox.",
        solves: "An outdated, slow or hard-to-use online presence.",
        deliverables: ["Responsive pages and content structure", "Working contact form", "SEO basics and social previews", "Deployment and handover notes"],
        tech: "HTML, CSS, JavaScript, React, Tailwind CSS" },
      { name: "Landing pages", gets: "A focused page built around one action, such as a sign-up or an enquiry.",
        solves: "Campaigns that send visitors to a page that does not convert or loads slowly.",
        deliverables: ["Single-page design and build", "Form or call-to-action wiring", "Performance and accessibility checks"],
        tech: "HTML, CSS, JavaScript, Tailwind CSS" },
      { name: "Frontend development", gets: "Your design or idea turned into clean, maintainable interface code.",
        solves: "Interfaces that break on some devices or are hard for the next developer to change.",
        deliverables: ["Reusable components", "Responsive and keyboard-accessible layouts", "Documented code structure"],
        tech: "React, JavaScript, Tailwind CSS" },
      { name: "Full-stack applications", gets: "A web application with a backend, a database and a usable interface.",
        solves: "Manual work in spreadsheets, messages and email that should live in one system.",
        deliverables: ["Interface, API and database", "Sign-in and access levels where needed", "Setup scripts and README"],
        tech: "React, Node.js, SQL databases" },
      { name: "API integration", gets: "Your site or app connected to the services you already use.",
        solves: "Data copied by hand between tools, or features that need an outside service.",
        deliverables: ["Secure server-side integration", "Error handling for when the service is down", "Configuration notes for keys and settings"],
        tech: "Node.js, REST APIs" },
      { name: "Fixes and maintenance", gets: "Bugs diagnosed and fixed, and a site kept fast and up to date.",
        solves: "Layouts that break, slow pages and features that stopped working.",
        deliverables: ["Written diagnosis of the cause", "Fixes with a summary of changes", "Performance improvements where they matter"],
        tech: "JavaScript, CSS, Node.js, SQL" }
    ]
  },

  process: {
    intro: "A short, predictable sequence, with plain-language updates at each step.",
    steps: [
      { name: "Requirements and scope", text: "We agree what the project must do, who uses it and what is out of scope, in writing." },
      { name: "Planning and technical design", text: "I choose the simplest suitable tools and outline the pages, data and features before building." },
      { name: "Implementation", text: "I build in small steps you can review, keeping the code organized and maintainable." },
      { name: "Testing and refinement", text: "I test the main workflows, on phones and desktops, and fix what turns up." },
      { name: "Deployment and handover", text: "I put it live and hand over the code, setup notes and how to make common changes." }
    ]
  },

  about: {
    paragraphs: [
      "I'm a full-stack developer who works across the interface, the server and the database, so one person can take a project from requirements to a live site.",
      "My approach is structured: define the scope, plan the technical design, build in small testable steps and document how it works. I write code another developer can pick up, and I explain decisions in plain language."
    ],
    skills: [
      { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Responsive design", "Accessible markup"] },
      { group: "Backend", items: ["Node.js", "REST APIs", "Authentication", "Input validation"] },
      { group: "Data", items: ["SQL databases", "Database integration"] },
      { group: "Practice", items: ["Debugging", "Performance optimization", "Maintenance"] }
    ]
  },

  contactIntro: "Tell me what you need and what it should achieve. I reply by email.",
  closing: "Have a project in mind? Send the details and I will reply by email."
};
