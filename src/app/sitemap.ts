import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { mockIssues } from "@/lib/ojs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/aims-scope",
    "/editorial-board",
    "/author-guidelines",
    "/editorial-policies",
    "/open-access",
    "/contact",
    "/current",
    "/archives",
  ];

  const articlePaths = mockIssues.flatMap((issue) => issue.articles.map((a) => `/articles/${a.id}`));

  return [...staticPaths, ...articlePaths].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path.startsWith("/articles/") ? "monthly" : path === "" || path === "/current" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/articles/") ? 0.8 : 0.6,
  }));
}
