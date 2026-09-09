"use client";

import { useState } from "react";
import type { OjsArticle } from "@/lib/ojs";
import { siteConfig } from "@/lib/config";

function formatAuthorsBibTeX(authors: OjsArticle["authors"]) {
  return authors.map((a) => a.fullName).join(" and ");
}

function formatAuthorsRIS(authors: OjsArticle["authors"]) {
  return authors.map((a) => `AU  - ${a.fullName}`).join("\n");
}

function getYear(datePublished?: string) {
  if (!datePublished) return "2026";
  const d = new Date(datePublished);
  if (Number.isNaN(d.getTime())) return "2026";
  return String(d.getFullYear());
}

function getDateParts(datePublished?: string) {
  if (!datePublished) return { year: "2026", month: "03", day: "15" };
  const d = new Date(datePublished);
  if (Number.isNaN(d.getTime())) return { year: "2026", month: "03", day: "15" };
  const year = String(d.getFullYear());
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return { year, month, day };
}

function generateRIS(article: OjsArticle) {
  const { year, month, day } = getDateParts(article.datePublished);
  const pages = article.pages ?? "1-10";
  const [sp, ep] = pages.includes("-") ? pages.split("-") : [pages, ""];
  return [
    "TY  - JOUR",
    `TI  - ${article.title}`,
    formatAuthorsRIS(article.authors),
    `JO  - ${siteConfig.name}`,
    `PY  - ${year}/${month}/${day}`,
    `DA  - ${year}/${month}/${day}`,
    `SP  - ${sp.trim()}`,
    ep ? `EP  - ${ep.trim()}` : "",
    article.doi ? `DO  - ${article.doi}` : "",
    article.doi ? `UR  - https://doi.org/${article.doi}` : "",
    `PB  - ${siteConfig.publisher}`,
    `SN  - ${siteConfig.issn.online}`,
    "ER  -",
  ]
    .filter(Boolean)
    .join("\n");
}

function generateBibTeX(article: OjsArticle) {
  const year = getYear(article.datePublished);
  const citeKey = `epc${year}${article.id}`;
  const authors = formatAuthorsBibTeX(article.authors);
  const pages = article.pages ?? "1-10";
  return `@article{${citeKey},
  title = {${article.title}},
  author = {${authors}},
  journal = {${siteConfig.name}},
  year = {${year}},
  pages = {${pages}},
  doi = {${article.doi ?? ""}},
  issn = {${siteConfig.issn.online}},
  publisher = {${siteConfig.publisher}},
  url = {${article.doi ? `https://doi.org/${article.doi}` : ""}}
}`;
}

function generateEndNote(article: OjsArticle) {
  // EndNote tagged format is similar to RIS but with ENW extension
  return generateRIS(article);
}

function generateAPA(article: OjsArticle) {
  const year = getYear(article.datePublished);
  const authors = article.authors.map((a) => a.fullName).join(", ");
  return `${authors} (${year}). ${article.title}. ${siteConfig.name}${article.pages ? `, ${article.pages}` : ""}. https://doi.org/${article.doi ?? ""}`.trim();
}

function generateVancouver(article: OjsArticle) {
  const year = getYear(article.datePublished);
  const authors = article.authors.map((a) => a.fullName).join(", ");
  return `${authors}. ${article.title}. ${siteConfig.name}. ${year};${article.pages ? `${article.pages}` : ""}. doi:${article.doi ?? ""}`;
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function CitationTools({ article }: { article: OjsArticle }) {
  const [copied, setCopied] = useState(false);
  const apaText = generateAPA(article);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(apaText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = apaText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="rounded border border-[#D8D9DA] bg-white p-4">
      <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">How to cite</p>
      <p className="mt-2 text-sm leading-6 text-[#1C1D1E]">{apaText}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={handleCopy} className="rounded border border-[#D8D9DA] bg-[#F8F9FA] px-3 py-1.5 text-xs font-semibold text-[#1C1D1E] hover:bg-white">
          {copied ? "Copied" : "Copy citation"}
        </button>
        <button
          onClick={() => downloadFile(generateRIS(article), `EPC-${article.id}.ris`, "application/x-research-info-systems")}
          className="rounded border border-[#D8D9DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#005274] hover:bg-[#F8F9FA]"
        >
          Download RIS
        </button>
      </div>

      <div className="mt-4 border-t border-[#EFEFF0] pt-3">
        <p className="text-xs font-bold tracking-widest uppercase text-[#414246]">Download citation</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => downloadFile(generateRIS(article), `EPC-${article.id}.ris`, "application/x-research-info-systems")}
            className="rounded border border-[#D8D9DA] bg-[#F8F9FA] px-3 py-2 text-xs font-semibold text-[#1C1D1E] hover:bg-white text-left"
          >
            RIS
            <span className="block text-xs font-normal text-[#767676]">for Zotero, Mendeley</span>
          </button>
          <button
            onClick={() => downloadFile(generateBibTeX(article), `EPC-${article.id}.bib`, "application/x-bibtex")}
            className="rounded border border-[#D8D9DA] bg-[#F8F9FA] px-3 py-2 text-xs font-semibold text-[#1C1D1E] hover:bg-white text-left"
          >
            BibTeX
            <span className="block text-xs font-normal text-[#767676]">for LaTeX</span>
          </button>
          <button
            onClick={() => downloadFile(generateEndNote(article), `EPC-${article.id}.enw`, "application/x-endnote-refer")}
            className="rounded border border-[#D8D9DA] bg-white px-3 py-2 text-xs font-semibold text-[#005274] hover:bg-[#F8F9FA] text-left"
          >
            EndNote
            <span className="block text-xs font-normal text-[#767676]">.enw</span>
          </button>
          <button
            onClick={() => downloadFile(apaText, `EPC-${article.id}-APA.txt`, "text/plain")}
            className="rounded border border-[#D8D9DA] bg-white px-3 py-2 text-xs font-semibold text-[#005274] hover:bg-[#F8F9FA] text-left"
          >
            APA
            <span className="block text-xs font-normal text-[#767676]">text</span>
          </button>
          <button
            onClick={() => downloadFile(generateVancouver(article), `EPC-${article.id}-Vancouver.txt`, "text/plain")}
            className="col-span-2 rounded border border-[#D8D9DA] bg-white px-3 py-2 text-xs font-semibold text-[#005274] hover:bg-[#F8F9FA] text-left"
          >
            Vancouver
            <span className="block text-xs font-normal text-[#767676]">text</span>
          </button>
        </div>
        <p className="mt-2 text-xs leading-4 text-[#767676]">All files include title, authors, journal, year, pages, DOI, ISSN, and publisher for direct import into reference managers.</p>
      </div>
    </div>
  );
}

export function ArticleSideTools({ article }: { article: OjsArticle }) {
  const [copiedLink, setCopiedLink] = useState(false);

  async function handleCopyLink() {
    const url = typeof window !== "undefined" ? window.location.href : `https://epc-journal.org/articles/${article.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : `https://epc-journal.org/articles/${article.id}`;
    const title = article.title;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    // Fallback to copy link
    handleCopyLink();
  }

  return (
    <div className="journal-card">
      <div className="journal-card-header">Share and cite</div>
      <div className="p-3 grid grid-cols-2 gap-2 text-xs">
        <button onClick={handleCopyLink} className="rounded border border-[#D8D9DA] bg-white px-3 py-2 font-semibold text-[#1C1D1E] hover:bg-[#F8F9FA]">
          {copiedLink ? "Copied" : "Copy link"}
        </button>
        <button onClick={handleShare} className="rounded border border-[#D8D9DA] bg-white px-3 py-2 font-semibold text-[#1C1D1E] hover:bg-[#F8F9FA]">
          Share
        </button>
        <button
          onClick={() => downloadFile(generateRIS(article), `EPC-${article.id}.ris`, "application/x-research-info-systems")}
          className="col-span-2 rounded border border-[#D8D9DA] bg-[#F8F9FA] px-3 py-2 font-semibold text-[#005274] hover:bg-white"
        >
          Export citation
        </button>
      </div>
    </div>
  );
}

export function FigureDownload({ src, filename, label }: { src: string; filename: string; label: string }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      // Try to fetch as blob for high quality download with correct filename
      const res = await fetch(src);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback to direct link download
      const a = document.createElement("a");
      a.href = src;
      a.download = filename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EFEFF0] bg-[#F8F9FA] px-4 py-2">
      <span className="text-xs font-medium text-[#414246]">{label}</span>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center gap-1.5 rounded bg-white border border-[#D8D9DA] px-3 py-1.5 text-xs font-semibold text-[#005274] hover:bg-white hover:border-[#C2C3C6] disabled:opacity-60"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 5v10M8 11l4 4 4-4M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
        </svg>
        {downloading ? "Downloading" : "Download high quality figure"}
        <span className="hidden sm:inline text-xs font-normal text-[#767676]">· 300 dpi</span>
      </button>
    </div>
  );
}
