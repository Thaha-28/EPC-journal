import Link from "next/link";
import { siteConfig, getOjsUrl } from "@/lib/config";

export function LeftSidebar() {
  return (
    <div className="space-y-4">
      <div className="journal-side-block border-2 border-[#1C1D1E]/10 shadow-sm">
        <div className="journal-side-block-header !bg-[#1C1D1E] !text-white !border-[#1C1D1E] text-sm tracking-wide py-3">Submit your research</div>
        <div className="journal-side-block-body !p-6 bg-[#F8F9FA]">
          <p className="text-[15px] font-semibold leading-6 text-[#1C1D1E]">Open access. Peer reviewed.</p>
          <p className="mt-1.5 text-sm leading-6 text-[#414246]">Rigorous peer review, rapid publication, and global visibility under CC BY 4.0.</p>
          <Link
            href="/submit"
            className="btn-primary mt-4 w-full !py-3 text-sm font-bold uppercase tracking-wide !text-white visited:!text-white shadow-sm"
          >
            Submit an article
          </Link>
          <Link href="/author-guidelines" className="mt-3 block text-center text-sm font-medium text-[#1C1D1E] hover:underline">
            View author guidelines →
          </Link>
          <p className="mt-3 text-xs leading-4 text-[#767676] text-center">Via OJS — account creation, wizard, and tracking included.</p>
        </div>
      </div>

      <div className="journal-side-block">
        <div className="journal-side-block-header">Journal menu</div>
        <div className="p-0">
          <ul className="divide-y divide-border text-sm">
            {[
              { label: "Aims and Scope", href: "/aims-scope" },
              { label: "Editorial Board", href: "/editorial-board" },
              { label: "Author Guidelines", href: "/author-guidelines" },
              { label: "Editorial Policies", href: "/editorial-policies" },
              { label: "Open Access and Indexing", href: "/open-access" },
            ].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="flex items-center justify-between px-4 py-2.5 text-[#1C1D1E] hover:bg-[#f8f9fb] hover:text-[#1C1D1E]">
                  <span>{i.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-muted-foreground">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="journal-side-block">
        <div className="journal-side-block-header">Browse</div>
        <div className="journal-side-block-body p-0">
          <ul className="divide-y divide-border text-sm">
            <li>
              <Link href="/current" className="block px-4 py-2.5 hover:bg-[#f8f9fb]">
                Current Issue
              </Link>
            </li>
            <li>
              <Link href="/archives" className="block px-4 py-2.5 hover:bg-[#f8f9fb]">
                All Issues
              </Link>
            </li>
            <li>
              <a href={getOjsUrl(siteConfig.ojsLinks.search)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-[#f8f9fb]">
                Search articles
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RightSidebar() {
  return (
    <div className="space-y-4">
      <div className="journal-side-block">
        <div className="journal-side-block-header">Open access</div>
        <div className="journal-side-block-body">
          <p className="text-sm leading-6 text-[#2F3032]">
            All articles under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#1C1D1E] underline">
              CC BY 4.0
            </a>
            .
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Crossref DOIs, ORCID, funding metadata.</p>
        </div>
      </div>

      <div className="journal-side-block">
        <div className="journal-side-block-header">Abstracting and indexing</div>
        <div className="journal-side-block-body">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1C1D1E]"></span>
              Crossref
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1C1D1E]"></span>
              Google Scholar
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              DOAJ application pending
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1C1D1E]"></span>
              OpenAIRE via OAI PMH
            </li>
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">The journal supports OAI PMH for harvesting by indexers and aggregators.</p>
        </div>
      </div>

      <div className="journal-side-block">
        <div className="journal-side-block-header">Journal information</div>
        <div className="journal-side-block-body space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Publisher</span>
            <span className="font-medium text-right">{siteConfig.publisher}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ISSN</span>
            <span className="font-medium">{siteConfig.issn.online}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frequency</span>
            <span className="font-medium">Continuous</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Peer review</span>
            <span className="font-medium">Peer reviewed</span>
          </div>
          <div className="pt-2 text-xs text-muted-foreground border-t border-border mt-2">{siteConfig.contactEmail}</div>
        </div>
      </div>

      <div className="journal-side-block">
        <div className="journal-side-block-header">For reviewers</div>
        <div className="journal-side-block-body text-sm leading-6">
          <p>Reviewers are central to EPC. At least two reviewers per manuscript, constructive and timely feedback expected.</p>
          <Link href="/editorial-policies" className="mt-2 inline-block text-sm font-semibold hover:underline">
            Reviewer guidelines
          </Link>
        </div>
      </div>
    </div>
  );
}

export function JournalLayout({ children, withRightSidebar = false }: { children: React.ReactNode; withRightSidebar?: boolean }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6">
      <div className={`grid gap-6 ${withRightSidebar ? "lg:grid-cols-[220px_1fr_300px]" : "lg:grid-cols-[220px_1fr]"}`}>
        <aside className="hidden lg:block">
          <LeftSidebar />
        </aside>
        <div className="min-w-0">
          <div className="journal-card">{children}</div>
        </div>
        {withRightSidebar && (
          <aside className="hidden lg:block">
            <RightSidebar />
          </aside>
        )}
      </div>

      <div className={`lg:hidden mt-6 grid gap-4 ${withRightSidebar ? "sm:grid-cols-2" : "grid-cols-1"}`}>
        <LeftSidebar />
        {withRightSidebar && <RightSidebar />}
      </div>
    </div>
  );
}

// Journal style wrapper for static pages: wider center, no sidebars on mobile overlay
export function JournalPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="journal-card min-w-0">{children}</div>
        <aside className="hidden lg:block">
          <RightSidebar />
        </aside>
      </div>
      <div className="lg:hidden mt-6">
        <RightSidebar />
      </div>
    </div>
  );
}
