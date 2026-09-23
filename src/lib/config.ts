export const siteConfig = {
  name: "Environmental Processes and Chemistry",
  shortName: "EPC",
  tagline: "Diamond open access for environmental chemistry and process science",
  description:
    "Environmental Processes and Chemistry is a diamond open access, peer reviewed journal publishing rigorous research on chemical processes in natural and engineered environments.",
  url: "https://epc-journal.org",
  ojsBaseUrl: process.env.NEXT_PUBLIC_OJS_BASE_URL || "",
  ojsApiToken: process.env.OJS_API_TOKEN || "",
  contactEmail: process.env.CONTACT_FORM_EMAIL_TO || "editors@epc-journal.org",
  ojsLinks: {
    base: process.env.NEXT_PUBLIC_OJS_BASE_URL
      ? process.env.NEXT_PUBLIC_OJS_BASE_URL.replace(/\/api\/v1\/?$/, "").replace(/\/index\.php\/.*$/, "")
      : "https://epc-ojs-production.up.railway.app",
    login: "/index.php/epc/login",
    register: "/index.php/epc/user/register",
    submission: "/index.php/epc/submission/wizard",
    search: "/index.php/epc/search",
    dashboard: "/index.php/epc/dashboard",
    mySubmissions: "/index.php/epc/dashboard/mySubmissions",
    profile: "/index.php/epc/user/profile",
    editorial: "/index.php/epc/dashboard/editorial",
  },
  issn: {
    online: "XXXX-XXXX",
    print: "XXXX-XXXX",
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
      { label: "Author Guidelines", href: "/author-guidelines" },
      { label: "Editorial Policies", href: "/editorial-policies" },
      { label: "Open Access", href: "/open-access" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export function getOjsUrl(path: string) {
  const base = siteConfig.ojsLinks.base.replace(/\/$/, "");
  return `${base}${path}`;
}

export function getOjsHost() {
  return siteConfig.ojsLinks.base.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
