import Link from "next/link";
import type { Metadata } from "next";
import { getCurrentIssue } from "@/lib/ojs";
import { JournalLayout } from "@/components/Sidebar";
import { ArticleCard } from "@/components/ArticleCard";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Current Issue",
  description: "Current issue of Environmental Processes and Chemistry.",
};

export default async function CurrentIssuePage() {
  const issue = await getCurrentIssue();

  if (!issue) {
    return (
      <JournalLayout>
        <div className="px-6 py-8 text-sm text-muted-foreground">No current issue available yet. Please check Archives.</div>
      </JournalLayout>
    );
  }

  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#f8f9fb] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#0066cc] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#005274]">Current Issue</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Current Issue
          <span className="text-muted-foreground">Continuous publication</span>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold text-[#005274]">{issue.title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{issue.description ?? "Latest published articles. New content appears here as soon as it is published."}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {issue.volume && <span className="rounded-full bg-[#005274] px-2.5 py-1 font-semibold text-white">Volume {issue.volume}</span>}
          {issue.number && <span className="rounded-full bg-[#eef2f7] px-2.5 py-1 font-semibold text-[#005274]">Number {issue.number}</span>}
          {issue.datePublished && (
            <span className="rounded-full border border-border bg-white px-2.5 py-1 text-muted-foreground">
              Published {new Date(issue.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          )}
          <span className="rounded-full border border-border bg-white px-2.5 py-1 text-muted-foreground">{issue.articles.length} articles</span>
        </div>
      </div>

      <div className="border-t border-border bg-[#f8f9fb] px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#005274]">In this issue</h2>
          <span className="text-xs text-muted-foreground">{issue.articles.length} results</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {issue.articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>

      <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-white text-xs">
        <Link href="/archives" className="font-semibold text-[#005274] hover:underline">
          Browse all issues
        </Link>
        <span className="text-muted-foreground">Continuous publication</span>
      </div>
    </JournalLayout>
  );
}
