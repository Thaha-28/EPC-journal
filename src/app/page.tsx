import Link from "next/link";
import Image from "next/image";
import { getRecentArticles } from "@/lib/ojs";
import { JournalLayout } from "@/components/Sidebar";
import { siteConfig } from "@/lib/config";

export const revalidate = 600;

export default async function HomePage() {
  const recent = await getRecentArticles(6);

  return (
    <JournalLayout withRightSidebar>
      {/* Minimal hero - fitted background and text */}
      <div className="bg-[#F8F9FA] border-b border-[#EFEFF0]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 py-10 sm:py-12 text-center">
          <h1 className="font-display text-[30px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#1C1D1E]">Environmental Processes and Chemistry</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#414246]">
            Open research on chemical, biological, and physical processes in natural and engineered environments.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/current" className="inline-flex items-center justify-center rounded bg-[#1C1D1E] px-6 py-2.5 text-sm font-semibold !text-white visited:!text-white hover:bg-black border border-[#1C1D1E]">
              View current issue
            </Link>
            <Link href="/submit" className="inline-flex items-center justify-center rounded bg-white px-6 py-2.5 text-sm font-semibold text-[#1C1D1E] hover:bg-white border border-[#D8D9DA]">
              Submit an article
            </Link>
          </div>
          <p className="mt-4 text-xs tracking-wide text-[#767676]">Online ISSN {siteConfig.issn.online} · Continuous publication</p>
        </div>
      </div>

      {/* Minimal facts - fitted */}
      <div className="grid grid-cols-3 divide-x divide-[#EFEFF0] border-y border-[#EFEFF0] bg-white text-center">
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-[#1C1D1E]">Published continuously</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-[#1C1D1E]">Peer reviewed</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs font-medium text-[#1C1D1E]">Open access</p>
        </div>
      </div>

      {/* About block - minimal */}
      <div className="px-6 sm:px-8 py-6">
        <div className="flex items-center justify-between gap-4 border-b border-[#EFEFF0] pb-3">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#414246]">About this journal</h2>
          <Link href="/aims-scope" className="text-xs font-medium text-[#1C1D1E] hover:underline underline-offset-4">
            Full aims and scope
          </Link>
        </div>
        <p className="mt-4 text-sm leading-7 text-[#2F3032]">
          <strong>Environmental Processes and Chemistry (Online ISSN: {siteConfig.issn.online})</strong> publishes research across environmental processes, chemistry, biology and ecology, and interdisciplinary environmental science. We welcome experimental, field, and modelling studies that advance process understanding from molecular to landscape scales.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded border border-[#EFEFF0] bg-white p-3.5">
            <p className="text-xs font-semibold text-[#1C1D1E]">Environmental Processes</p>
            <p className="mt-1.5 text-sm leading-5 text-[#767676]">Climate change, monitoring, water and soil systems, pollution and remediation, modelling, risk assessment.</p>
          </div>
          <div className="rounded border border-[#EFEFF0] bg-white p-3.5">
            <p className="text-xs font-semibold text-[#1C1D1E]">Environmental Chemistry</p>
            <p className="mt-1.5 text-sm leading-5 text-[#767676]">Analytical chemistry, contaminants, biogeochemistry, fate and transport, soil and water chemistry, emerging pollutants.</p>
          </div>
          <div className="rounded border border-[#EFEFF0] bg-white p-3.5">
            <p className="text-xs font-semibold text-[#1C1D1E]">Biology and Ecology</p>
            <p className="mt-1.5 text-sm leading-5 text-[#767676]">Biodiversity, ecosystem ecology, conservation, microbiology, ecotoxicology, species environment interactions.</p>
          </div>
          <div className="rounded border border-[#EFEFF0] bg-white p-3.5">
            <p className="text-xs font-semibold text-[#1C1D1E]">Interdisciplinary</p>
            <p className="mt-1.5 text-sm leading-5 text-[#767676]">Climate ecosystem interactions, environmental health, geospatial science, photocatalysis, nanocatalysis, water research.</p>
          </div>
        </div>
      </div>

      {/* Latest research - minimal cards */}
      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-[#1C1D1E]">Latest research</h2>
            <p className="mt-1 text-sm text-[#767676]">Selected articles from the current issue.</p>
          </div>
          <Link href="/current" className="hidden sm:inline-flex rounded border border-[#D8D9DA] bg-white px-4 py-1.5 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">
            View current issue
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recent.slice(0, 4).map((a) => (
            <article key={a.id} className="group flex gap-4 rounded border border-[#EFEFF0] bg-white p-4 hover:border-[#D8D9DA] transition">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded bg-[#F8F9FA] border border-[#EFEFF0] px-2 py-0.5 text-xs font-medium text-[#414246]">{a.section ?? "Research Article"}</span>
                  <span className="text-[#767676]">{a.datePublished ? new Date(a.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}</span>
                </div>
                <Link href={`/articles/${a.id}`} className="mt-2.5 block">
                  <h3 className="font-display text-[15px] font-semibold leading-5 text-[#1C1D1E] group-hover:underline underline-offset-4 line-clamp-3">{a.title}</h3>
                </Link>
                <p className="mt-1.5 text-sm text-[#767676] line-clamp-1">{a.authors.map((x) => x.fullName).join(", ")}</p>
                {a.abstract && <p className="mt-2 text-sm leading-6 text-[#2F3032] line-clamp-3">{a.abstract}</p>}
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <Link href={`/articles/${a.id}`} className="font-medium text-[#1C1D1E] hover:underline underline-offset-4">
                    Read article
                  </Link>
                  {a.doi && (
                    <a href={`https://doi.org/${a.doi}`} target="_blank" rel="noopener noreferrer" className="text-[#767676] hover:text-[#1C1D1E] hover:underline">
                      {a.doi}
                    </a>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex shrink-0 flex-col items-center gap-1">
                <div className="h-[84px] w-[112px] overflow-hidden rounded border border-[#EFEFF0] bg-[#F8F9FA] flex items-center justify-center">
                  <Image src="/emblem-EPC.jpeg" alt="Graphical abstract" width={112} height={84} className="h-full w-full object-cover" />
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#767676]">Graphical abstract</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex justify-center sm:hidden">
          <Link href="/current" className="rounded border border-[#D8D9DA] bg-white px-4 py-2 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA] w-full justify-center inline-flex">
            View current issue
          </Link>
        </div>
      </div>

      {/* Minimal info block */}
      <div className="border-t border-[#EFEFF0] bg-[#F8F9FA] px-6 sm:px-8 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-[#1C1D1E]">A venue for impactful environmental research</h3>
            <p className="mt-2 text-sm leading-7 text-[#414246]">All articles are peer reviewed and indexed for discoverability. Our editorial process follows COPE and WAME guidance to ensure transparency and integrity.</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded border border-[#EFEFF0] bg-white p-3">
                <p className="text-sm font-semibold text-[#1C1D1E]">Expert Review</p>
                <p className="text-xs text-[#767676]">2+ reviewers</p>
              </div>
              <div className="rounded border border-[#EFEFF0] bg-white p-3">
                <p className="text-sm font-semibold text-[#1C1D1E]">Open</p>
                <p className="text-xs text-[#767676]">Open access</p>
              </div>
              <div className="rounded border border-[#EFEFF0] bg-white p-3">
                <p className="text-sm font-semibold text-[#1C1D1E]">Indexed</p>
                <p className="text-xs text-[#767676]">Crossref, Scholar, DOAJ</p>
              </div>
            </div>
          </div>
          <div className="rounded border border-[#D8D9DA] bg-white p-5">
            <p className="text-sm font-semibold text-[#1C1D1E]">Ready to submit</p>
            <p className="mt-2 text-sm leading-6 text-[#414246]">Manuscripts are handled through our online submission system for secure peer review and editorial tracking.</p>
            <Link href="/submit" className="mt-4 flex justify-center rounded bg-[#1C1D1E] px-4 py-2.5 text-sm font-semibold !text-white visited:!text-white hover:bg-black">
              Start submission
            </Link>
            <Link href="/author-guidelines" className="mt-2 flex justify-center rounded border border-[#D8D9DA] bg-white px-4 py-2.5 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">
              Read author guidelines
            </Link>
          </div>
        </div>
      </div>
    </JournalLayout>
  );
}
