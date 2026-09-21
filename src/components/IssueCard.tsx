import Link from "next/link";
import type { OjsIssue } from "@/lib/ojs";

export function IssueCard({ issue }: { issue: OjsIssue }) {
  return (
    <div className="journal-card p-5">
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-[#1C1D1E] px-2.5 py-1 text-xs font-bold text-white">
          {issue.volume ? `Vol. ${issue.volume}` : "Issue"} {issue.number ? `No. ${issue.number}` : ""}
        </span>
        {issue.year && <span className="text-muted-foreground">{issue.year}</span>}
        {issue.datePublished && (
          <span className="text-muted-foreground">
            {new Date(issue.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
          </span>
        )}
      </div>
      <Link href="/current" className="mt-3 block">
        <h3 className="font-display text-base font-bold leading-6 text-[#1C1D1E] hover:text-[#1C1D1E] hover:underline underline-offset-4">{issue.title}</h3>
      </Link>
      {issue.description && <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">{issue.description}</p>}
      <p className="mt-3 text-xs text-muted-foreground">{issue.articles.length} articles · Continuous publication</p>
      <div className="mt-4 flex gap-2">
        <Link href="/current" className="btn-primary text-xs py-1.5 px-3">
          View issue
        </Link>
        <Link href="/archives" className="btn-ghost text-xs py-1.5 px-3">
          All issues
        </Link>
      </div>
    </div>
  );
}
