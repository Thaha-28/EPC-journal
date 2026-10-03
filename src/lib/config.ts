export const siteConfig = {
  name: "Environmental Processes and Chemistry",
  shortName: "EPC",
  tagline: "Diamond open access for environmental chemistry and process science",
  description:
    "Environmental Processes and Chemistry is a diamond open access, peer reviewed journal publishing rigorous research on chemical processes in natural and engineered environments.",
  url: "https://epc-journal.org",
  contactEmail: process.env.CONTACT_FORM_EMAIL_TO || "editors@epc-journal.org",
  janeway: {
    baseUrl: (
      process.env.NEXT_PUBLIC_JANEWAY_BASE_URL ?? "https://epc-janeway-production.up.railway.app"
    ).replace(/\/$/, ""),
    journalCode: "epc",
  },
  issn: {
    online: "Pending Assignment",
    print: "Pending Assignment",
  },
  publisher: "Environmental Processes and Chemistry",
  nav: {
    primary: [
      { label: "Home", href: "/" },
      { label: "Current", href: "/current" },
      { label: "Archives", href: "/archives" },
    ],
    about: [
      { label: "Aims and Scope", href: "/aims-scope" },
      { label: "Editorial Board", href: "/editorial-board" },
      { label: "Publisher Details", href: "/publisher" },
      { label: "Author Guidelines", href: "/author-guidelines" },
      { label: "Editorial Policies", href: "/editorial-policies" },
      { label: "Open Access", href: "/open-access" },
      { label: "Contact", href: "/contact" },
    ],
  },
};


