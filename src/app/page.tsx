import Link from "next/link";
import Image from "next/image";
import { getCurrentIssue, getRecentArticles } from "@/lib/ojs";
import { JournalLayout } from "@/components/Sidebar";
import { getOjsUrl, siteConfig } from "@/lib/config";

export const revalidate = 600;

export default async function HomePage() {
  const [currentIssue, recent] = await Promise.all([getCurrentIssue(), getRecentArticles(6)]);

  return (
    <JournalLayout>
      {/* Hero - exact Journal Journal banner: gradient #005274 to #068853, white text */}
      <div className="bg-white">
        <div className="px-6 sm:px-8 py-8 text-white" style={{ background: "linear-gradient(135deg, #005274 0%, #068853 100%)" }}>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="hidden sm:block shrink-0">
              <div className="bg-white p-2 rounded shadow-md">
                <Image src="/logo-epc.jpeg" alt="EPC cover" width={132} height={176} className="h-[172px] w-[128px] object-contain" />
              </div>
              <p className="mt-2 text-center text-xs text-white/70">Volume 1, 2026</p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                Diamond Open Access
                <span className="text-white/60">No APCs</span>
                <span className="text-white/30">|</span>
                <span className="text-white/90">CC BY 4.0</span>
              </div>
              <h1 className="mt-3 font-display text-[28px] sm:text-[32px] font-bold leading-tight text-white">Environmental Processes and Chemistry</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">
                Rigorous, open science on chemical processes in natural and engineered environments. From molecular interfaces and transformation pathways to treatment and sustainable technologies. Published continuously, curated into issues, harvested via OAI PMH.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href="/current" className="inline-flex items-center justify-center rounded bg-white px-5 py-2 text-sm font-semibold text-[#005274] hover:bg-[#F8F9FA] shadow-sm">
                  View current issue
                </Link>
                <Link
                  href={getOjsUrl(siteConfig.ojsLinks.submission)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/15 backdrop-blur"
                >
                  Submit an article
                </Link>
                <Link href="/aims-scope" className="inline-flex items-center justify-center rounded border border-white/25 bg-transparent px-5 py-2 text-sm font-medium text-white hover:bg-white/10">
                  Aims and scope
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/75">
                <span>Online ISSN {siteConfig.issn.online}</span>
                <span className="hidden sm:inline text-white/40">|</span>
                <span>Crossref DOIs · ORCID</span>
                <span className="hidden sm:inline text-white/40">|</span>
                <span>Single blind, at least two reviewers</span>
              </div>
            </div>
            <div className="hidden lg:block shrink-0 w-[220px]">
              <div className="rounded bg-white p-4 text-[#1C1D1E] shadow-md">
                <p className="text-xs font-bold tracking-widest uppercase text-[#767676]">Featured issue</p>
                <p className="mt-1 text-sm font-bold leading-4 text-[#1C1D1E]">{currentIssue?.title ?? "Volume 1, Number 1 (2026)"}</p>
                <p className="text-xs text-[#767676]">{currentIssue?.datePublished ?? "March 2026"} · {currentIssue?.articles.length ?? 3} articles</p>
                <div className="mt-3 space-y-2">
                  {(currentIssue?.articles.slice(0, 2) ?? recent.slice(0, 2)).map((a) => (
                    <Link key={a.id} href={`/articles/${a.id}`} className="block rounded border border-[#D8D9DA] bg-[#F8F9FA] p-2.5 hover:bg-white hover:border-[#C2C3C6]">
                      <p className="text-xs font-semibold leading-4 line-clamp-2 text-[#005274]">{a.title}</p>
                      <p className="mt-1 text-xs text-[#767676] line-clamp-1">{a.authors.map((x) => x.fullName).join(", ")}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/current" className="mt-3 block text-center rounded bg-[#005274] py-2 text-xs font-semibold text-white hover:bg-[#003e57]">
                  Browse issue
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Facts bar - exact Journal spec: 4 columns, border, grey background */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#D8D9DA] border-y border-[#D8D9DA] bg-[#F8F9FA] text-center">
          <div className="px-4 py-3">
            <p className="text-xs font-bold tracking-widest uppercase text-[#767676]">Access</p>
            <p className="text-sm font-semibold text-[#005274]">Diamond OA</p>
            <p className="text-xs text-[#767676]">No fees</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs font-bold tracking-widest uppercase text-[#767676]">Review</p>
            <p className="text-sm font-semibold text-[#005274]">Single blind</p>
            <p className="text-xs text-[#767676]">2 reviewers</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs font-bold tracking-widest uppercase text-[#767676]">Licence</p>
            <p className="text-sm font-semibold text-[#005274]">CC BY 4.0</p>
            <p className="text-xs text-[#767676]">Authors retain copyright</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs font-bold tracking-widest uppercase text-[#767676]">Harvesting</p>
            <p className="text-sm font-semibold text-[#005274]">OAI PMH</p>
            <p className="text-xs text-[#767676]">Crossref, DOAJ</p>
          </div>
        </div>

        {/* About block - Journal page section with heading, paragraph, 3 cards */}
        <div className="px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between gap-4 border-b border-[#EFEFF0] pb-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#414246]">About this journal</h2>
            <Link href="/aims-scope" className="text-xs font-semibold text-[#005274] hover:underline underline-offset-4">
              Full aims and scope →
            </Link>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#2F3032]">
            The aim of <strong>Environmental Processes and Chemistry (Online ISSN: {siteConfig.issn.online})</strong> is to publish high quality papers across environmental processes, chemistry, biology and ecology, and interdisciplinary environmental science. We welcome experimental, field, and modelling studies that advance process understanding from molecular to landscape scales, with relevance to water and soil systems, contaminants and remediation, climate and environmental change, and ecosystem function. We publish technically correct and scientifically motivated work, including useful negative results, under rigorous single blind peer review following COPE and WAME guidance.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-3.5">
              <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">Environmental Processes</p>
              <p className="mt-1.5 text-sm leading-5 text-[#414246]">Climate change, monitoring, water and soil systems, pollution and remediation, modelling, risk assessment.</p>
            </div>
            <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-3.5">
              <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">Environmental Chemistry</p>
              <p className="mt-1.5 text-sm leading-5 text-[#414246]">Analytical chemistry, contaminants, biogeochemistry, fate and transport, soil and water chemistry, emerging pollutants.</p>
            </div>
            <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-3.5">
              <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">Biology and Ecology</p>
              <p className="mt-1.5 text-sm leading-5 text-[#414246]">Biodiversity, ecosystem ecology, conservation, microbiology, ecotoxicology, species environment interactions.</p>
            </div>
            <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-3.5">
              <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">Interdisciplinary</p>
              <p className="mt-1.5 text-sm leading-5 text-[#414246]">Climate ecosystem interactions, environmental health, geospatial science, photocatalysis, nanocatalysis, water research.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest research - Journal card grid, 4px radius, Open Sans */}
      <div className="border-t border-[#D8D9DA] bg-white px-6 sm:px-8 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-[#1C1D1E]">Latest research</h2>
            <p className="mt-1 text-sm text-[#767676]">Selected articles from the current issue. All content free to read and free to publish.</p>
          </div>
          <Link href="/current" className="hidden sm:inline-flex btn-ghost text-sm py-1.5">
            View current issue
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recent.slice(0, 4).map((a) => (
            <article key={a.id} className="group rounded border border-[#D8D9DA] bg-white p-4 hover:shadow-sm hover:border-[#C2C3C6] transition">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-[#EFEFF0] px-2 py-0.5 text-xs font-semibold text-[#414246] border border-[#D8D9DA]">{a.section ?? "Research Article"}</span>
                <span className="text-[#767676]">{a.datePublished ? new Date(a.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}</span>
                <span className="text-[#D8D9DA]">·</span>
                <span className="text-[#767676]">{a.pages ?? "1-10"}</span>
              </div>
              <Link href={`/articles/${a.id}`} className="mt-2.5 block">
                <h3 className="font-display text-[15px] font-bold leading-5 text-[#005274] group-hover:underline underline-offset-4 line-clamp-3">{a.title}</h3>
              </Link>
              <p className="mt-1.5 text-sm text-[#414246] line-clamp-1">{a.authors.map((x) => x.fullName).join(", ")}</p>
              {a.abstract && <p className="mt-2 text-sm leading-6 text-[#2F3032] line-clamp-3">{a.abstract}</p>}
              <div className="mt-3 flex items-center gap-3 text-xs">
                <Link href={`/articles/${a.id}`} className="font-semibold text-[#005274] hover:text-[#003e57] hover:underline underline-offset-4">
                  Read article
                </Link>
                {a.doi && (
                  <a href={`https://doi.org/${a.doi}`} target="_blank" rel="noopener noreferrer" className="text-[#767676] hover:text-[#1C1D1E] hover:underline">
                    {a.doi}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex justify-center sm:hidden">
          <Link href="/current" className="btn-ghost w-full justify-center">
            View current issue
          </Link>
        </div>
      </div>

      {/* Trust block - Journal grey 100 background */}
      <div className="border-t border-[#D8D9DA] bg-[#F8F9FA] px-6 sm:px-8 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#1C1D1E]">A trusted venue for rigorous environmental research</h3>
            <p className="mt-2 text-sm leading-7 text-[#414246]">
              All articles are peer reviewed by at least two independent experts, published open access under CC BY 4.0, and indexed for broad discoverability. Our editorial process follows COPE and WAME guidance to ensure transparency and integrity.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded border border-[#D8D9DA] bg-white p-3">
                <p className="text-sm font-bold text-[#005274]">Rigorous</p>
                <p className="text-xs text-[#767676]">At least two reviewers per paper</p>
              </div>
              <div className="rounded border border-[#D8D9DA] bg-white p-3">
                <p className="text-sm font-bold text-[#005274]">Open</p>
                <p className="text-xs text-[#767676]">Diamond open access, no fees</p>
              </div>
              <div className="rounded border border-[#D8D9DA] bg-white p-3">
                <p className="text-sm font-bold text-[#005274]">Indexed</p>
                <p className="text-xs text-[#767676]">Crossref, Google Scholar, DOAJ</p>
              </div>
            </div>
          </div>
          <div className="rounded bg-[#005274] p-5 text-white">
            <p className="text-sm font-bold">Ready to submit your work</p>
            <p className="mt-2 text-sm leading-6 text-white/80">Manuscripts are handled through our online submission system for secure peer review and editorial tracking.</p>
            <Link
              href={getOjsUrl(siteConfig.ojsLinks.submission)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex justify-center rounded bg-white px-4 py-2.5 text-sm font-semibold text-[#005274] hover:bg-[#F8F9FA]"
            >
              Start submission in OJS
            </Link>
            <Link href="/author-guidelines" className="mt-2 flex justify-center rounded border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/15">
              Read author guidelines
            </Link>
          </div>
        </div>
      </div>
    </JournalLayout>
  );
}
