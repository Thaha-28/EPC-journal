import Link from "next/link";
import { siteConfig, getOjsUrl } from "@/lib/config";

export function LeftSidebar() {
  return (
    <div className="space-y-4">
      <div className="journal-side-block border-2 border-[#1C1D1E]/10 shadow-sm overflow-hidden">
        <div className="journal-side-block-header !bg-[#1C1D1E] !text-white !border-[#1C1D1E] text-sm tracking-wide py-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[#1C1D1E]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 11v6"/><path d="M9 14h6"/></svg>
          </span>
          Submit your research
        </div>
        <div className="journal-side-block-body !p-6 bg-gradient-to-b from-[#F8F9FA] to-white">
          <p className="text-[15px] font-bold leading-6 text-[#1C1D1E]">Expert peer review. Rapid decisions.</p>
          <Link
            href="/submit"
            className="btn-primary mt-4 w-full !py-3.5 text-sm font-bold uppercase tracking-wide !text-white visited:!text-white shadow-sm"
          >
            Submit an article →
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
