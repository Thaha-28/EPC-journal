import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getIssues } from "@/lib/ojs";
import { JournalLayout } from "@/components/Sidebar";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Archives",
  description: "All issues of Environmental Processes and Chemistry.",
};

export default async function ArchivesPage() {
  const issues = await getIssues();

  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#f8f9fb] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#1C1D1E]">Archives</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-[#1C1D1E]">Archives</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Browse all published issues. Each issue is a curated collection, continuously updated. Click any issue to explore its articles.</p>
      </div>

      <div className="border-t border-border bg-[#f8f9fb] px-6 sm:px-8 py-6 space-y-6">
        {issues.map((issue) => (
          <div key={issue.id} className="journal-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white px-5 py-3">
              <div>
                <h3 className="font-display text-base font-bold text-[#1C1D1E]">{issue.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {issue.datePublished ? new Date(issue.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""} · {issue.articles.length} articles
                </p>
              </div>
              <Link href="/current" className="btn-ghost text-xs py-1.5">
                View issue
              </Link>
            </div>
            {issue.description && <p className="px-5 py-3 text-sm leading-6 text-muted-foreground border-b border-border bg-[#f8f9fb]">{issue.description}</p>}
            <div className="divide-y divide-border">
              {issue.articles.map((a) => (
                <div key={a.id} className="px-5 py-4 flex gap-4 hover:bg-[#f8f9fb]">
                  <div className="hidden sm:block text-xs font-semibold text-muted-foreground pt-1">{a.id}</div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/articles/${a.id}`} className="text-sm font-semibold leading-5 text-[#1C1D1E] hover:text-[#1C1D1E] hover:underline underline-offset-4 line-clamp-2">
                      {a.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{a.authors.map((x) => x.fullName).join(", ")}</p>
                    {a.abstract && <p className="mt-1.5 text-xs leading-5 text-[#414246] line-clamp-2">{a.abstract}</p>}
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">{a.pages ?? "1-10"}</span>
                      <Link href={`/articles/${a.id}`} className="font-semibold text-[#1C1D1E] hover:underline">
                        View
                      </Link>
                      {a.doi && <span className="hidden sm:inline text-muted-foreground font-mono text-[11px]">{a.doi}</span>}
                    </div>
                  </div>
                  <div className="hidden sm:flex shrink-0 flex-col items-center gap-1">
                    <div className="h-[76px] w-[102px] overflow-hidden rounded border border-[#EFEFF0] bg-white flex items-center justify-center">
                      <Image src="/emblem-EPC.jpeg" alt="Graphical abstract" width={102} height={76} className="h-full w-full object-cover" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#767676]">Graphical abstract</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </JournalLayout>
  );
}
