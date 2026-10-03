export type JournalAuthor = {
  id?: number;
  givenName?: string;
  familyName?: string;
  fullName?: string;
  affiliation?: string;
  orcid?: string;
};

export type JournalArticle = {
  id: number;
  title: string;
  abstract?: string;
  authors: JournalAuthor[];
  doi?: string;
  keywords?: string[];
  datePublished?: string;
  section?: string;
  pages?: string;
  galleys?: { label: string; url: string; fileType?: string }[];
  issueId?: number;
  /** Canonical Janeway URL. Only set for articles served by the live API. */
  janewayUrl?: string;
  /** Sanitized full-text HTML from the Janeway render/HTML galley, if any. */
  contentHtml?: string;
};

export type JournalIssue = {
  id: number;
  title: string;
  volume?: string;
  number?: string;
  year?: string;
  datePublished?: string;
  coverUrl?: string;
  description?: string;
  articles: JournalArticle[];
};

// Static journal content served directly by the frontend.
export const journalIssues: JournalIssue[] = [
  {
    id: 1,
    title: "Volume 1, Number 1 (2026)",
    volume: "1",
    number: "1",
    year: "2026",
    datePublished: "2026-03-15",
    description:
      "Inaugural issue. Processes at interfaces, contaminant fate, and sustainable chemistry for environmental systems.",
    articles: [
      {
        id: 101,
        title:
          "Photochemical transformation of perfluoroalkyl substances at the air water interface",
        abstract:
          "We investigate interfacial photolysis pathways of selected PFAS under simulated sunlight and report quantum yields and product distributions relevant to atmospheric water films.",
        authors: [
          { fullName: "A. Rahman", affiliation: "Dept. of Environmental Chemistry, Univ. of Dhaka" },
          { fullName: "S. L. Chen", affiliation: "Institute for Atmospheric Chemistry, ETH Zurich" },
        ],
        doi: "10.0000/epc.2026.1.101",
        keywords: ["PFAS", "photochemistry", "air water interface"],
        datePublished: "2026-03-15",
        section: "Research Articles",
        pages: "1-14",
        galleys: [{ label: "PDF", url: "#", fileType: "application/pdf" }],
        issueId: 1,
      },
      {
        id: 102,
        title: "Microplastic aging and sorption of hydrophobic organics in estuarine gradients",
        abstract:
          "Aging experiments across salinity gradients show systematic changes in surface chemistry and sorption capacity for PAHs, with implications for transport modeling.",
        authors: [
          { fullName: "M. J. Alvarez", affiliation: "Marine Sciences, Univ. of Barcelona" },
          { fullName: "K. Osei", affiliation: "Coastal Research Lab, Ghana" },
        ],
        doi: "10.0000/epc.2026.1.102",
        keywords: ["microplastics", "sorption", "estuaries"],
        datePublished: "2026-03-15",
        section: "Research Articles",
        pages: "15-32",
        galleys: [{ label: "PDF", url: "#", fileType: "application/pdf" }],
        issueId: 1,
      },
      {
        id: 103,
        title: "Electrochemical recovery of phosphate from municipal wastewater: a pilot comparison",
        abstract:
          "Pilot scale electrochemical cells are compared for phosphate recovery efficiency, energy demand, and precipitate purity across operational modes.",
        authors: [
          { fullName: "L. Weber", affiliation: "TU Berlin, Urban Water Systems" },
        ],
        doi: "10.0000/epc.2026.1.103",
        keywords: ["phosphate recovery", "electrochemistry", "wastewater"],
        datePublished: "2026-03-15",
        section: "Research Articles",
        pages: "33-48",
        galleys: [{ label: "PDF", url: "#", fileType: "application/pdf" }],
        issueId: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Volume 1, Number 2 (2026) - In Preparation",
    volume: "1",
    number: "2",
    year: "2026",
    datePublished: "2026-06-01",
    description: "Special collection on low carbon synthesis and green solvents.",
    articles: [
      {
        id: 201,
        title: "Life cycle assessment of bio derived solvents for extraction processes",
        abstract:
          "Comparative LCA of bio derived solvents shows trade offs in cumulative energy demand and aquatic toxicity that depend on feedstock and purification route.",
        authors: [
          { fullName: "P. Nakamura", affiliation: "Kyoto University" },
          { fullName: "J. Patel", affiliation: "Imperial College London" },
        ],
        doi: "10.0000/epc.2026.1.201",
        keywords: ["LCA", "green solvents", "bio based"],
        datePublished: "2026-06-01",
        section: "Research Articles",
        pages: "1-18",
        galleys: [{ label: "PDF", url: "#", fileType: "application/pdf" }],
        issueId: 2,
      },
    ],
  },
];

// Live Janeway backend (Railway). Falls back to the static journalIssues
// above whenever the API is unreachable, so pages never break.
const JANEWAY_BASE = (
  process.env.NEXT_PUBLIC_JANEWAY_BASE_URL ?? "https://epc-janeway-production.up.railway.app"
).replace(/\/$/, "");
const JANEWAY_API = `${JANEWAY_BASE}/epc/api`;

type JanewayFrozenAuthor = {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  institution?: string;
};

type JanewayGalley = {
  label?: string;
  path?: string;
  type?: string;
};

type JanewayArticle = {
  pk: number;
  title: string;
  abstract?: string;
  frozenauthors?: JanewayFrozenAuthor[];
  keywords?: { word: string }[];
  section?: string;
  date_published?: string;
  render_galley?: JanewayGalley | null;
  galleys?: JanewayGalley[];
};

type JanewayIssue = {
  pk: number;
  volume: number;
  issue: string;
  issue_title?: string;
  date?: string;
  issue_description?: string;
  cover_image?: string;
  articles?: (number | string)[];
};

import sanitizeHtml from "sanitize-html";

function stripHtml(html?: string): string | undefined {
  if (!html) return undefined;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim() || undefined;
}

/** Galley looks like rendered full text (HTML/XML), not a PDF. */
function isHtmlGalley(g?: JanewayGalley | null): boolean {
  if (!g?.path) return false;
  const type = (g.type ?? "").toLowerCase();
  const path = g.path.toLowerCase();
  return (
    type.includes("html") ||
    type.includes("xml") ||
    type.includes("xhtml") ||
    path.endsWith(".html") ||
    path.endsWith(".htm") ||
    path.endsWith(".xml") ||
    path.endsWith(".xhtml")
  );
}

function sanitizeArticleHtml(html: string): string {
  const clean = sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "h1",
      "h2",
      "img",
      "figure",
      "figcaption",
      "section",
      "article",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "sub",
      "sup",
      "hr",
      "caption",
      "colgroup",
      "col",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
      col: ["span"],
    },
    allowedSchemes: ["http", "https", "mailto", "doi"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });
  // Absolutize Janeway-relative asset links so images resolve.
  return clean.replace(/(src|href)="\/(?!\/)/g, `$1="${JANEWAY_BASE}/`);
}

/**
 * Fetch the rendered full text of an article from its Janeway HTML galley.
 * Returns sanitized HTML, or undefined when there is no HTML galley
 * (e.g. PDF-only articles — those are served via galley download links).
 * Same-origin (Janeway) URLs only; capped size + timeout.
 */
async function fetchGalleyHtml(
  renderGalley: JanewayGalley | null | undefined,
  galleys: JanewayGalley[] | undefined,
): Promise<string | undefined> {
  const candidate =
    (renderGalley && isHtmlGalley(renderGalley) ? renderGalley : undefined) ??
    (galleys ?? []).find(isHtmlGalley);
  if (!candidate?.path) return undefined;
  const url = candidate.path.startsWith("http")
    ? candidate.path
    : `${JANEWAY_BASE}${candidate.path}`;
  if (!url.startsWith(JANEWAY_BASE)) return undefined;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    let res: Response;
    try {
      res = await fetch(url, { signal: ctrl.signal, next: { revalidate: 600 } });
    } finally {
      clearTimeout(timer);
    }
    if (!res.ok) return undefined;
    const text = await res.text();
    if (text.length > 500_000) return undefined;
    if (!/<(p|h1|h2|h3|div|table|section|article|figure)\b/i.test(text)) return undefined;
    const clean = sanitizeArticleHtml(text);
    return clean.trim() ? clean : undefined;
  } catch {
    return undefined;
  }
}

function pkFromUrl(url: number | string): number | null {
  if (typeof url === "number") return url;
  const m = String(url).match(/\/(\d+)\/?$/);
  return m ? Number(m[1]) : null;
}

async function janewayGet<T>(path: string): Promise<T> {
  const res = await fetch(`${JANEWAY_API}${path}`, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`Janeway ${path}: ${res.status}`);
  return (await res.json()) as T;
}

function mapArticle(a: JanewayArticle, issueId?: number): JournalArticle {
  const authors = (a.frozenauthors ?? []).map((f) => {
    const fullName = [f.first_name, f.middle_name, f.last_name].filter(Boolean).join(" ").trim();
    return { fullName: fullName || "Author", affiliation: f.institution || undefined };
  });
  const galleys = (a.galleys ?? [])
    .map((g) => ({
      label: g.label || "File",
      url: g.path?.startsWith("http") ? g.path : g.path ? `${JANEWAY_BASE}${g.path}` : "#",
      fileType: g.type || undefined,
    }))
    .filter((g) => g.url !== "#");
  return {
    id: a.pk,
    title: a.title,
    abstract: stripHtml(a.abstract),
    authors,
    keywords: (a.keywords ?? []).map((k) => k.word).filter(Boolean),
    datePublished: a.date_published?.slice(0, 10),
    section: a.section || undefined,
    galleys: galleys.length > 0 ? galleys : undefined,
    issueId,
    janewayUrl: `${JANEWAY_BASE}/epc/article/id/${a.pk}/`,
  };
}

function mapIssue(
  issue: JanewayIssue,
  articlesByPk: Map<number, JanewayArticle>,
): JournalIssue {
  const pks = (issue.articles ?? [])
    .map(pkFromUrl)
    .filter((p): p is number => p !== null);
  const articles = pks
    .map((pk) => articlesByPk.get(pk))
    .filter((a): a is JanewayArticle => Boolean(a))
    .map((a) => mapArticle(a, issue.pk));
  const date = issue.date?.slice(0, 10);
  return {
    id: issue.pk,
    title: issue.issue_title || `Volume ${issue.volume}, Number ${issue.issue}`,
    volume: String(issue.volume ?? ""),
    number: String(issue.issue ?? ""),
    year: date?.slice(0, 4),
    datePublished: date,
    coverUrl: issue.cover_image
      ? issue.cover_image.startsWith("http")
        ? issue.cover_image
        : `${JANEWAY_BASE}${issue.cover_image}`
      : undefined,
    description: stripHtml(issue.issue_description),
    articles,
  };
}

async function fetchLiveIssues(): Promise<JournalIssue[]> {
  const [{ results: rawIssues }, { results: rawArticles }] = await Promise.all([
    janewayGet<{ results: JanewayIssue[] }>("/issues/"),
    janewayGet<{ results: JanewayArticle[] }>("/articles/"),
  ]);
  const articlesByPk = new Map(rawArticles.map((a) => [a.pk, a] as const));
  const issues = rawIssues.map((i) => mapIssue(i, articlesByPk));
  // Newest first, matching the static fallback order.
  issues.sort((a, b) => (b.datePublished ?? "").localeCompare(a.datePublished ?? ""));
  if (issues.length === 0) throw new Error("Janeway returned no issues");
  return issues;
}

export async function getIssues(): Promise<JournalIssue[]> {
  try {
    return await fetchLiveIssues();
  } catch {
    return journalIssues;
  }
}

export async function getCurrentIssue(): Promise<JournalIssue | null> {
  try {
    const issues = await fetchLiveIssues();
    try {
      const journals = await janewayGet<{ results: { current_issue?: number | string }[] }>(
        "/journals/",
      );
      const currentPk = pkFromUrl(journals.results[0]?.current_issue ?? "");
      const current = issues.find((i) => i.id === currentPk);
      if (current) return current;
    } catch {
      // Fall through to newest issue.
    }
    return issues[0] ?? null;
  } catch {
    return journalIssues[0] ?? null;
  }
}

export async function getIssueById(id: string | number): Promise<JournalIssue | null> {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;
  try {
    const issues = await fetchLiveIssues();
    return issues.find((i) => i.id === numeric) ?? null;
  } catch {
    return journalIssues.find((i) => i.id === numeric) ?? null;
  }
}

export async function getArticleById(id: string | number): Promise<JournalArticle | null> {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;
  try {
    const article = await janewayGet<JanewayArticle>(`/articles/${numeric}/`);
    // Attach its issue id when known.
    let ownerId: number | undefined;
    try {
      const issues = await fetchLiveIssues();
      ownerId = issues.find((i) => i.articles.some((a) => a.id === numeric))?.id;
    } catch {
      // No issue context; continue without it.
    }
    const mapped = mapArticle(article, ownerId);
    // Full text from the Janeway HTML galley when the article has one.
    // PDF-only articles keep abstract + galley download links.
    try {
      const contentHtml = await fetchGalleyHtml(article.render_galley, article.galleys);
      if (contentHtml) return { ...mapped, contentHtml };
    } catch {
      // Fall through to metadata-only article.
    }
    return mapped;
  } catch {
    for (const issue of journalIssues) {
      const found = issue.articles.find((a) => a.id === numeric);
      if (found) return found;
    }
    return null;
  }
}

export async function getRecentArticles(limit = 6): Promise<JournalArticle[]> {
  try {
    const issues = await fetchLiveIssues();
    return issues.flatMap((i) => i.articles).slice(0, limit);
  } catch {
    return journalIssues.flatMap((i) => i.articles).slice(0, limit);
  }
}
