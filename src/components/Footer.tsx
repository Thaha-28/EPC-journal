import Link from "next/link";
import { siteConfig, getOjsUrl } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-8">
      <div className="bg-[#2F3032] text-white">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div>
              <p className="font-display text-base font-bold leading-tight text-white">Environmental Processes and Chemistry</p>
              <p className="mt-3 text-sm leading-6 text-white/70">Peer reviewed. Open access. All articles under CC BY 4.0.</p>
              <p className="mt-4 text-xs leading-5 text-white/50">
                Online ISSN {siteConfig.issn.online}
                <br />
                {siteConfig.publisher}
                <br />
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-white/70 hover:text-white hover:underline">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-white/80">Explore</p>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                <li>
                  <Link href="/current" className="hover:text-white hover:underline underline-offset-4">
                    Current Issue
                  </Link>
                </li>
                <li>
                  <Link href="/archives" className="hover:text-white hover:underline underline-offset-4">
                    Archives
                  </Link>
                </li>
                <li>
                  <Link href="/aims-scope" className="hover:text-white hover:underline underline-offset-4">
                    Aims and Scope
                  </Link>
                </li>
                <li>
                  <Link href="/author-guidelines" className="hover:text-white hover:underline underline-offset-4">
                    Author Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-white/80">Policies and information</p>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                <li>
                  <Link href="/editorial-policies" className="hover:text-white hover:underline underline-offset-4">
                    Editorial and Ethics Policies
                  </Link>
                </li>
                <li>
                  <Link href="/open-access" className="hover:text-white hover:underline underline-offset-4">
                    Open Access and Indexing
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-board" className="hover:text-white hover:underline underline-offset-4">
                    Editorial Board
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline underline-offset-4">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white/[0.06] rounded p-4 border border-white/10">
              <p className="text-sm font-semibold text-white">Submit and access</p>
              <p className="mt-2 text-sm leading-6 text-white/60">Submission and peer review are handled through our secure online system, with all editorial correspondence tracked in one place.</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={getOjsUrl(siteConfig.ojsLinks.submission)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded bg-white px-4 py-2 text-sm font-semibold text-[#1C1D1E] hover:bg-[#F8F9FA]"
                >
                  Submit a manuscript
                </Link>
                <Link
                  href={getOjsUrl(siteConfig.ojsLinks.login)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Author login
                </Link>
              </div>
              <p className="mt-3 text-xs leading-4 text-white/40">
                Journal website: epc-journal.org
                <br />
                Submission system: ojs.epc-journal.org
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] text-white/50">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
          <p>Copyright 2026 {siteConfig.publisher}. Open access under CC BY 4.0. Published continuously.</p>
          <p className="flex items-center gap-3 shrink-0">
            <Link href="/sitemap.xml" className="hover:text-white hover:underline">
              Sitemap
            </Link>
            <span className="text-white/20">|</span>
            <span>Indexed via Crossref and DOAJ</span>
            <span className="text-white/20">|</span>
            <Link href="/editorial-policies" className="hover:text-white hover:underline">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
