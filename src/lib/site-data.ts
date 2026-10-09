export const site = {
  name: "Priscilla Kuti-Ukaegbu",
  fullName: "Priscilla Kuti-Ukaegbu",
  shortName: "PKU",
  bookTitle: "Dear Bank Alert",
  bookSubtitle: "A Student's Guide to Creating Your First Independent Source of Income",
  launchNote: "Launch event: October 29, 2026. Public sales begin October 30, 2026. Preorders open in October; exact date TBD.",
  description:
    "My digital home for books, letters, resources, programmes, and the work still ahead.",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Start Here", to: "/start-here" },
  { label: "About", to: "/about" },
  { label: "Work With Me", to: "/work-with-me" },
  { label: "Books", to: "/books" },
  { label: "Resources", to: "/resources" },
  { label: "Writing", to: "/writing" },
  { label: "Contact", to: "/contact" },
] as const;

export const startHerePathways = [
  {
    homePrompt: "I need one clear conversation.",
    pagePrompt: "“I need help thinking through one specific problem.”",
    homeDirection: "Something is stuck, messy or unclear and you want focused thinking around the actual problem.",
    pageDirection: "Book a private 1:1 Strategy & Advisory session with me.",
    homeCta: "BOOK A PRIVATE SESSION",
    pageCta: "BOOK A PRIVATE SESSION",
    to: "/work-with-me",
    tone: "pink",
  },
  {
    homePrompt: "I want ongoing support.",
    pagePrompt: "“I want ongoing teaching and a stronger growth environment.”",
    homeDirection: "You want deeper teaching, implementation, useful resources and a more intentional growth environment.",
    pageDirection: "PKU Pro is my paid growth layer for deeper teaching, guided implementation, resources and community.",
    homeCta: "EXPLORE PKU PRO",
    pageCta: "EXPLORE PKU PRO",
    to: "/work-with-me",
    tone: "white",
  },
  {
    homePrompt: "I’m a student and I need to learn how to earn.",
    pagePrompt: "“I’m a student and I want to learn how to make money.”",
    homeDirection: "You want to build a real source of income before graduation instead of waiting for adult life to surprise you.",
    pageDirection: "Dear Bank Alert is built to help you develop your first real source of income while you are still in school.",
    homeCta: "DISCOVER DEAR BANK ALERT",
    pageCta: "DISCOVER DEAR BANK ALERT",
    to: "/dear-bank-alert",
    tone: "charcoal",
  },
  {
    homePrompt: "I want something I can work through myself.",
    pagePrompt: "“I want to work through something at my own pace.”",
    homeDirection: "Masterclasses, devotionals, worksheets, recordings and practical resources — no live call required.",
    pageDirection: "Go into the Digital Vault and choose the resource that matches the problem in front of you.",
    homeCta: "ENTER THE DIGITAL VAULT",
    pageCta: "ENTER THE DIGITAL VAULT",
    to: "/resources",
    tone: "blush",
  },
  {
    homePrompt: "I just want to read and think with you.",
    pagePrompt: "“I want to understand how you think first.”",
    homeDirection: "Essays, stories, ideas and the occasional long detour that somehow still lands somewhere useful.",
    pageDirection: "Good. I probably would too.\n\nStart with my letters.",
    homeCta: "READ GOOD MORNINGS WITH KUKU",
    pageCta: "READ GOOD MORNINGS WITH KUKU",
    to: "/writing",
    tone: "white",
  },
  {
    homePrompt: "I have an idea for us.",
    pagePrompt: "“I want to work with you on something bigger.”",
    homeDirection: "Speaking, teaching, partnerships, collaborations and projects that make sense for the work I care about.",
    pageDirection: "Speaking, teaching, partnerships, institutional work and thoughtful collaborations live here.",
    homeCta: "PARTNER WITH ME",
    pageCta: "PARTNER WITH ME",
    to: "/contact",
    tone: "teal",
  },
] as const;

export const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Start Here", to: "/start-here" },
      { label: "About", to: "/about" },
      { label: "Work With Me", to: "/work-with-me" },
      { label: "Writing", to: "/writing" },
      { label: "Resources", to: "/resources" },
      { label: "Programmes", to: "/programmes" },
    ],
  },
  {
    title: "Books & commerce",
    links: [
      { label: "Books", to: "/books" },
      { label: "Dear Bank Alert", to: "/dear-bank-alert" },
      { label: "Cart", to: "/cart" },
      { label: "Account", to: "/account" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Partners", to: "/partners" },
      { label: "Reader outcomes", to: "/reader-outcomes" },
      { label: "Submit outcome", to: "/reader-outcomes/submit" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy-policy" },
      { label: "Terms", to: "/terms" },
      { label: "Consent", to: "/consent" },
    ],
  },
] as const;

export const ecosystemTerritories = [
  "Healing and growth",
  "Economic agency",
  "Leadership",
  "Execution",
  "Purpose and faith",
  "Institution-building",
];

export const dbaJourney = [
  "Notice problems and demand",
  "Understand useful value",
  "Build and validate an offer",
  "Sell, deliver, and follow up",
  "Calculate profit and repeat",
];

export const resourceTypes = [
  "Worksheets",
  "Diagnostic tools",
  "Opportunity audits",
  "Offer validation tools",
  "Pricing and margin tools",
  "30-day action plan",
];

export const contentCategories = [
  "Articles",
  "Essays",
  "Good Mornings With Kuku",
  "Book excerpts",
  "Announcements",
];

export const partnerTypes = [
  "Students",
  "Campus ambassadors",
  "Creators and influencers",
  "Financial and business educators",
  "Coaches and community leaders",
  "Institutional partners",
];

export const futureAdminRoutes = [
  "/admin/overview",
  "/admin/orders",
  "/admin/fulfilment",
  "/admin/products",
  "/admin/customers",
  "/admin/content",
  "/admin/affiliates",
  "/admin/commissions",
  "/admin/outcomes",
  "/admin/analytics",
  "/admin/team",
  "/admin/settings",
];
