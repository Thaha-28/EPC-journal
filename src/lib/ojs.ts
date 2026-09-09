import { siteConfig } from "./config";

export type OjsAuthor = {
  id?: number;
  givenName?: string;
  familyName?: string;
  fullName?: string;
  affiliation?: string;
  orcid?: string;
};

export type OjsArticle = {
  id: number;
  title: string;
  abstract?: string;
  authors: OjsAuthor[];
  doi?: string;
  keywords?: string[];
  datePublished?: string;
  section?: string;
  pages?: string;
  galleys?: { label: string; url: string; fileType?: string }[];
  issueId?: number;
};

export type OjsIssue = {
  id: number;
  title: string;
  volume?: string;
  number?: string;
  year?: string;
  datePublished?: string;
  coverUrl?: string;
  description?: string;
  articles: OjsArticle[];
};

// Fallback mock data used when OJS is not configured or unreachable.
// This lets the frontend be built and previewed before OJS is live.
export const mockIssues: OjsIssue[] = [
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

function getApiBase(): string | null {
  const raw = siteConfig.ojsBaseUrl?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

async function ojsFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const base = getApiBase();
  if (!base) return null;
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (siteConfig.ojsApiToken) {
    headers.Authorization = `Bearer ${siteConfig.ojsApiToken}`;
  }
  try {
    const res = await fetch(url, {
      ...init,
      headers: { ...headers, ...(init?.headers as Record<string, string> | undefined) },
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as T;
    return data;
  } catch {
    return null;
  }
}

// Minimal mappers that handle both real OJS shapes and mock fallback.
// Real OJS 3.4 returns { items: [...] } for collections. We normalize to our types.
export async function getIssues(): Promise<OjsIssue[]> {
  const data = await ojsFetch<unknown>("/issues");
  if (!data) return mockIssues;

  // Try to map plausible OJS response shapes
  const maybe = data as { items?: unknown[]; data?: unknown[] };
  const items = maybe.items ?? maybe.data;
  if (Array.isArray(items) && items.length > 0) {
    // If shape looks like real issues, attempt best effort mapping
    const mapped = items.map(mapRawIssue).filter(Boolean) as OjsIssue[];
    if (mapped.length > 0) return mapped;
  }
  return mockIssues;
}

export async function getCurrentIssue(): Promise<OjsIssue | null> {
  const current = await ojsFetch<unknown>("/issues/current");
  if (current && typeof current === "object") {
    const mapped = mapRawIssue(current);
    if (mapped) return mapped;
  }
  const issues = await getIssues();
  return issues[0] ?? null;
}

export async function getIssueById(id: string | number): Promise<OjsIssue | null> {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;
  const data = await ojsFetch<unknown>(`/issues/${numeric}`);
  if (data && typeof data === "object") {
    const mapped = mapRawIssue(data);
    if (mapped) return mapped;
  }
  const issues = await getIssues();
  return issues.find((i) => i.id === numeric) ?? null;
}

export async function getArticleById(id: string | number): Promise<OjsArticle | null> {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) return null;

  // Try submissions endpoint first
  const sub = await ojsFetch<unknown>(`/submissions/${numeric}`);
  if (sub && typeof sub === "object") {
    const mapped = mapRawSubmission(sub, numeric);
    if (mapped) return mapped;
  }

  // Fallback search in mock issues
  for (const issue of mockIssues) {
    const found = issue.articles.find((a) => a.id === numeric);
    if (found) return found;
  }
  return null;
}

export async function getRecentArticles(limit = 6): Promise<OjsArticle[]> {
  const issues = await getIssues();
  const all = issues.flatMap((i) => i.articles);
  return all.slice(0, limit);
}

// Best effort mappers. Do not throw. Return null if unrecognizable.
function mapRawIssue(raw: unknown): OjsIssue | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  // Direct mock shape already matches
  if (typeof r.id === "number" && Array.isArray(r.articles)) {
    return raw as OjsIssue;
  }
  // OJS API shape
  const id = Number(r.id ?? r.issueId ?? 0);
  if (!id) return null;
  const volume = String(r.volume ?? r.vol ?? "");
  const number = String(r.number ?? r.num ?? "");
  const year = String(r.year ?? r.datePublished ?? "").slice(0, 4) || undefined;
  const title =
    (r.title as string) ||
    (r.identification as string) ||
    `Volume ${volume || "?"} ${number ? `Number ${number}` : ""}`.trim();
  return {
    id,
    title: typeof title === "string" ? title : `Issue ${id}`,
    volume: volume || undefined,
    number: number || undefined,
    year,
    datePublished: (r.datePublished as string) || (r.publishedAt as string) || undefined,
    coverUrl: (r.coverImageUrl as string) || (r.coverUrl as string) || undefined,
    description: (r.description as string) || undefined,
    articles: Array.isArray(r.articles)
      ? (r.articles.map((a) => mapRawSubmission(a, id)).filter(Boolean) as OjsArticle[])
      : [],
  };
}

function mapRawSubmission(raw: unknown, issueId?: number): OjsArticle | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const id = Number(r.id ?? r.submissionId ?? 0);
  if (!id) return null;
  // Title may be localized object { en: "..." }
  const rawTitle = r.title as unknown;
  let title = "";
  if (typeof rawTitle === "string") title = rawTitle;
  else if (rawTitle && typeof rawTitle === "object") {
    const t = rawTitle as Record<string, string>;
    title = t.en ?? t.en_US ?? Object.values(t)[0] ?? "";
  }
  if (!title) title = (r.name as string) || `Article ${id}`;

  const authorsRaw = (r.authors as unknown[]) ?? (r.authorString as unknown);
  let authors: OjsAuthor[] = [];
  if (Array.isArray(authorsRaw)) {
    authors = authorsRaw.map((a) => {
      if (typeof a === "string") return { fullName: a };
      if (a && typeof a === "object") {
        const o = a as Record<string, unknown>;
        const given = (o.givenName as string) || (o.firstName as string) || "";
        const family = (o.familyName as string) || (o.lastName as string) || "";
        const full =
          (o.fullName as string) ||
          (o.name as string) ||
          [given, family].filter(Boolean).join(" ") ||
          "Author";
        return {
          fullName: full,
          affiliation: (o.affiliation as string) || undefined,
          orcid: (o.orcid as string) || undefined,
        };
      }
      return { fullName: "Author" };
    });
  } else if (typeof authorsRaw === "string") {
    authors = (authorsRaw as string).split(";").map((s: string) => ({ fullName: s.trim() })).filter((a: { fullName: string }) => Boolean(a.fullName));
  }
  if (authors.length === 0) authors = [{ fullName: "EPC Authors" }];

  const doi = (r.doi as string) || (r.pubId as string) || undefined;
  const abstractRaw = r.abstract as unknown;
  let abstract: string | undefined;
  if (typeof abstractRaw === "string") abstract = abstractRaw;
  else if (abstractRaw && typeof abstractRaw === "object") {
    const a = abstractRaw as Record<string, string>;
    abstract = a.en ?? a.en_US ?? Object.values(a)[0];
  }

  return {
    id,
    title,
    abstract,
    authors,
    doi,
    keywords: Array.isArray(r.keywords) ? (r.keywords as string[]) : undefined,
    datePublished: (r.datePublished as string) || (r.publishedAt as string) || undefined,
    section: (r.section as string) || undefined,
    pages: (r.pages as string) || undefined,
    galleys: Array.isArray(r.galleys)
      ? (r.galleys as Array<Record<string, unknown>>).map((g) => ({
          label: String(g.label ?? g.name ?? "PDF"),
          url: String(g.url ?? g.galleyUrl ?? "#"),
          fileType: (g.fileType as string) || undefined,
        }))
      : [{ label: "PDF", url: "#", fileType: "application/pdf" }],
    issueId,
  };
}
