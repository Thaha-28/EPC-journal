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
  // Try live OJS submissions (published) first - more reliable for recent
  const subsData = await ojsFetch<{ items: unknown[]; itemsMax: number }>(`/submissions?status=3&count=${limit}`);
  if (subsData && Array.isArray(subsData.items) && subsData.items.length > 0) {
    const mapped = subsData.items.map((s) => mapRawSubmission(s)).filter(Boolean) as OjsArticle[];
    if (mapped.length > 0) return mapped.slice(0, limit);
  }
  // Fallback to issues' nested articles (for mock or when submissions API not available)
  const issues = await getIssues();
  const all = issues.flatMap((i) => i.articles);
  if (all.length > 0) return all.slice(0, limit);
  // Final fallback to mock
  return mockIssues.flatMap((i) => i.articles).slice(0, limit);
}

// Helpers to handle localized strings and real OJS shapes
function locString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const o = value as Record<string, string>;
    // Handle {en: "..."} or {en_US: "..."} or nested
    if (typeof o.en === "string") return o.en;
    if (typeof o.en_US === "string") return o.en_US;
    const vals = Object.values(o).filter((v) => typeof v === "string" && v.length > 0) as string[];
    if (vals.length > 0) return vals[0];
  }
  return undefined;
}

// helper used by templates, keep exported for future i18n
export function locStringFromMultilingual(value: unknown): string | undefined {
  return locString(value);
}

// Best effort mappers. Do not throw. Return null if unrecognizable.
function mapRawIssue(raw: unknown): OjsIssue | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  // OJS API shape - handle localized title/description
  const id = Number(r.id ?? r.issueId ?? r.issue_id ?? 0);
  if (!id) return null;
  const volumeRaw = r.volume ?? r.vol;
  const volume = volumeRaw != null ? String(volumeRaw) : "";
  const numberRaw = r.number ?? r.num;
  const number = numberRaw != null ? String(numberRaw) : "";
  const yearRaw = r.year ?? r.datePublished ?? r.year;
  const year = yearRaw != null ? String(yearRaw).slice(0, 4) : undefined;
  const titleLoc = locString(r.title) ?? locString(r.identification) ?? `Volume ${volume || "?"} ${number ? `Number ${number}` : ""}`.trim();
  const descLoc = locString(r.description) ?? (typeof r.description === "string" ? (r.description as string) : undefined);
  const datePub = (r.datePublished as string) || (r.publishedAt as string) || (r.date_published as string) || undefined;
  // Cover may be localized object or string
  const coverRaw = r.coverImageUrl ?? r.coverUrl ?? r.coverImage;
  let coverUrl: string | undefined;
  if (typeof coverRaw === "string") coverUrl = coverRaw;
  else if (coverRaw && typeof coverRaw === "object") coverUrl = locString(coverRaw);
  // Articles may be in `articles` (mock or real single issue) or need to be fetched separately
  let articles: OjsArticle[] = [];
  if (Array.isArray(r.articles)) {
    // Real OJS returns articles as submission objects with publications array
    // Filter to only map those that look like submissions
    articles = (r.articles.map((a) => mapRawSubmission(a, id)).filter(Boolean) as OjsArticle[]);
  }
  return {
    id,
    title: titleLoc || `Issue ${id}`,
    volume: volume || undefined,
    number: number || undefined,
    year: year || undefined,
    datePublished: datePub,
    coverUrl,
    description: descLoc,
    articles,
  };
}

function mapRawSubmission(raw: unknown, issueId?: number): OjsArticle | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const id = Number(r.id ?? r.submissionId ?? r.submission_id ?? 0);
  if (!id) return null;

  // Real OJS: submission has `publications` array, current publication contains title/abstract/authors
  // Mock: submission has title/authors at top level
  const pubs = r.publications as unknown[] | undefined;
  const pub = Array.isArray(pubs) && pubs.length > 0 ? (pubs[0] as Record<string, unknown>) : null;
  const source: Record<string, unknown> = pub ? { ...r, ...pub, id } as Record<string, unknown> : r;
  // Preserve issueId from pub if available
  const pubIssueId = pub ? Number((pub as Record<string, unknown>).issueId ?? (pub as Record<string, unknown>).issue_id ?? issueId ?? 0) : issueId;
  const finalIssueId = pubIssueId || issueId;

  // Title may be localized object { en: "..." } or fullTitle
  const rawTitle = (source.title ?? source.fullTitle ?? r.title) as unknown;
  let title = locString(rawTitle) ?? "";
  if (!title) title = (r.name as string) || `Article ${id}`;
  // Fallback to fullTitle if title empty
  if (!title && source.fullTitle) title = locString(source.fullTitle) ?? title;

  // Authors: may be in source.authors (publication) or r.authors
  const authorsRaw = (source.authors as unknown[]) ?? (r.authors as unknown[]) ?? (r.authorString as unknown);
  let authors: OjsAuthor[] = [];
  if (Array.isArray(authorsRaw)) {
    authors = authorsRaw.map((a) => {
      if (typeof a === "string") return { fullName: a };
      if (a && typeof a === "object") {
        const o = a as Record<string, unknown>;
        // givenName/familyName may be localized objects
        const givenRaw = o.givenName ?? o.firstName;
        const familyRaw = o.familyName ?? o.lastName;
        const given = locString(givenRaw) ?? (typeof givenRaw === "string" ? (givenRaw as string) : "");
        const family = locString(familyRaw) ?? (typeof familyRaw === "string" ? (familyRaw as string) : "");
        const full =
          (o.fullName as string) ||
          (o.name as string) ||
          [given, family].filter(Boolean).join(" ") ||
          "Author";
        // affiliation may be string or affiliations array
        let aff: string | undefined;
        if (typeof o.affiliation === "string") aff = o.affiliation as string;
        else if (Array.isArray(o.affiliations) && o.affiliations.length > 0) {
          // affiliations array of objects with name
          const affNames = (o.affiliations as Array<Record<string, unknown>>).map((affObj) => {
            const n = affObj.name ?? affObj.affiliation;
            return locString(n) ?? (typeof n === "string" ? n : "");
          }).filter(Boolean);
          if (affNames.length > 0) aff = affNames.join("; ");
        } else if (o.affiliation && typeof o.affiliation === "object") {
          aff = locString(o.affiliation);
        }
        return {
          fullName: full,
          affiliation: aff,
          orcid: (o.orcid as string) || undefined,
        };
      }
      return { fullName: "Author" };
    });
  } else if (typeof authorsRaw === "string") {
    authors = (authorsRaw as string).split(";").map((s: string) => ({ fullName: s.trim() })).filter((a: { fullName: string }) => Boolean(a.fullName));
  }
  if (authors.length === 0) {
    // Fallback to authorsString if present (e.g., "A. Rahman, S. L. Chen")
    const authStr = (source.authorsString ?? r.authorsString) as unknown;
    if (typeof authStr === "string" && authStr.length > 0) {
      // authorsString may be "A. Rahman, S. L. Chen (Author)" - strip parenthetical
      const cleaned = authStr.replace(/\s*\(.*?\)\s*/g, "");
      authors = cleaned.split(",").map((s: string) => ({ fullName: s.trim() })).filter((a) => a.fullName.length > 0);
    } else {
      authors = [{ fullName: "EPC Authors" }];
    }
  }

  const doi =
    (source.doi as string) ||
    (source["pub-id::doi"] as string) ||
    (r.doi as string) ||
    (r.pubId as string) ||
    // Check doiObject
    ((source.doiObject as Record<string, unknown>)?.doi as string) ||
    undefined;

  const abstractRaw = (source.abstract ?? r.abstract) as unknown;
  let abstract: string | undefined = locString(abstractRaw);
  if (!abstract && typeof abstractRaw === "string") abstract = abstractRaw;

  // Keywords may be {en: []} or array
  let keywords: string[] | undefined;
  const kwRaw = source.keywords ?? r.keywords;
  if (Array.isArray(kwRaw)) keywords = kwRaw as string[];
  else if (kwRaw && typeof kwRaw === "object") {
    const kwObj = kwRaw as Record<string, unknown>;
    const enKw = kwObj.en ?? kwObj.en_US;
    if (Array.isArray(enKw)) keywords = enKw as string[];
    else if (typeof enKw === "string") keywords = [enKw];
  }

  const datePublished =
    locString(source.datePublished) ??
    (source.datePublished as string) ??
    (r.datePublished as string) ??
    (r.publishedAt as string) ??
    undefined;
  // Pages may be localized object {en: "1-14"}
  const pagesRaw = source.pages ?? r.pages;
  let pages: string | undefined = locString(pagesRaw);
  if (!pages && typeof pagesRaw === "string") pages = pagesRaw;

  const section = (source.section as string) ?? (r.section as string) ?? undefined;
  // Section may be sectionId, need to map to name? For now, fallback to "Research Articles"
  const sectionName = typeof section === "string" ? section : undefined;

  const galleysRaw = source.galleys ?? r.galleys;
  let galleys: { label: string; url: string; fileType?: string }[] | undefined;
  if (Array.isArray(galleysRaw)) {
    galleys = (galleysRaw as Array<Record<string, unknown>>).map((g) => ({
      label: String(g.label ?? g.name ?? "PDF"),
      url: String(g.url ?? g.galleyUrl ?? (g as Record<string, unknown>).urlPublished ?? "#"),
      fileType: (g.fileType as string) || (g.mimetype as string) || undefined,
    }));
  }
  if (!galleys || galleys.length === 0) galleys = [{ label: "PDF", url: "#", fileType: "application/pdf" }];

  return {
    id,
    title,
    abstract,
    authors,
    doi,
    keywords,
    datePublished,
    section: sectionName,
    pages,
    galleys,
    issueId: finalIssueId as number | undefined,
  };
}
