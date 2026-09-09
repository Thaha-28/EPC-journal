import Link from "next/link";
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
        <Link href="/" className="text-[#0066cc] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#005274]">Archives</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-[#005274]">Archives</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Browse all published issues. Each issue is a curated collection, continuously updated. Click any issue to explore its articles.</p>
      </div>

      <div className="border-t border-border bg-[#f8f9fb] px-6 sm:px-8 py-6 space-y-6">
        {issues.map((issue) => (
          <div key={issue.id} className="journal-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white px-5 py-3">
              <div>
                <h3 className="font-display text-base font-bold text-[#005274]">{issue.title}</h3>
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
                <div key={a.id} className="px-5 py-3 flex gap-4 hover:bg-[#f8f9fb]">
                  <div className="hidden sm:block text-xs font-semibold text-muted-foreground pt-0.5">{a.id}</div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/articles/${a.id}`} className="text-sm font-semibold leading-5 text-[#005274] hover:text-[#0066cc] hover:underline underline-offset-4">
                      {a.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{a.authors.map((x) => x.fullName).join(", ")}</p>
                  </div>
                  <div className="hidden sm:block text-xs text-muted-foreground shrink-0 pt-1">{a.pages ?? "1-10"}</div>
                  <Link href={`/articles/${a.id}`} className="shrink-0 text-xs font-semibold text-[#0066cc] hover:underline pt-1">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </JournalLayout>
  );
}
