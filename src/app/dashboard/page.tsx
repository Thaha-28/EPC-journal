import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { getOjsUrl, siteConfig } from "@/lib/config";
import { getRecentArticles } from "@/lib/ojs";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your submissions and editorial progress for EPC via OJS.",
};

export default async function DashboardPage() {
  // Show a live preview of recent submissions from OJS (published) as proof the wiring works
  const recent = await getRecentArticles(4);
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">Home</Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Dashboard</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Author & editor workspace</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Dashboard & tracking</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#414246]">All tracking lives in OJS. The frontend shows a live preview (via <span className="font-mono text-xs bg-white border border-[#EFEFF0] px-1 py-0.5 rounded">/api/v1/submissions</span>), but the official record, emails, and editorial decisions are in your OJS dashboard.</p>
      </div>

      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6 space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <Link href={getOjsUrl(siteConfig.ojsLinks.mySubmissions)} target="_blank" rel="noopener noreferrer" className="rounded border border-[#1C1D1E] bg-[#1C1D1E] p-4 text-white hover:bg-black">
            <p className="text-sm font-bold">My submissions</p>
            <p className="mt-1 text-sm leading-6 text-white/80">Author: see your manuscripts, reviews, revisions, and publication stage.</p>
            <span className="mt-3 inline-flex text-xs font-semibold underline underline-offset-4">Open My Submissions →</span>
          </Link>
          <Link href={getOjsUrl(siteConfig.ojsLinks.dashboard)} target="_blank" rel="noopener noreferrer" className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4 hover:bg-white">
            <p className="text-sm font-bold text-[#1C1D1E]">Author dashboard</p>
            <p className="mt-1 text-sm leading-6 text-[#414246]">Full workspace: submissions, profile, ORCID.</p>
            <span className="mt-3 inline-flex text-xs font-semibold text-[#1C1D1E] underline underline-offset-4">Open dashboard →</span>
          </Link>
          <Link href={getOjsUrl(siteConfig.ojsLinks.editorial)} target="_blank" rel="noopener noreferrer" className="rounded border border-[#EFEFF0] bg-white p-4 hover:bg-[#F8F9FA]">
            <p className="text-sm font-bold text-[#1C1D1E]">Editorial (editor)</p>
            <p className="mt-1 text-sm leading-6 text-[#414246]">Editor: assign reviewers, decisions, production.</p>
            <span className="mt-3 inline-flex text-xs font-semibold text-[#1C1D1E] underline underline-offset-4">Open editorial →</span>
          </Link>
        </div>

        <div className="rounded border border-dashed border-[#D8D9DA] bg-[#F8F9FA] p-4 flex flex-wrap gap-2 text-sm">
          <Link href={getOjsUrl(siteConfig.ojsLinks.submission)} target="_blank" rel="noopener noreferrer" className="rounded bg-[#1C1D1E] px-4 py-2 font-semibold text-white hover:bg-black">Start new submission</Link>
          <Link href={getOjsUrl(siteConfig.ojsLinks.profile)} target="_blank" rel="noopener noreferrer" className="rounded border border-[#D8D9DA] bg-white px-4 py-2 font-medium text-[#1C1D1E] hover:bg-white">Profile & ORCID</Link>
          <Link href="/submit" className="rounded border border-[#D8D9DA] bg-white px-4 py-2 font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">How submission works</Link>
        </div>

        {/* Live preview from OJS - proves seeding */}
        <div>
          <div className="flex items-center justify-between border-b border-[#EFEFF0] pb-2">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">Live from OJS — recent submissions (published)</h2>
            <span className="text-xs text-[#767676]">{recent.length} items via <span className="font-mono">/submissions?status=3</span></span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {recent.map((a) => (
              <div key={a.id} className="rounded border border-[#EFEFF0] bg-white p-3">
                <p className="text-xs font-medium text-[#767676]">{a.datePublished ? new Date(a.datePublished).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""} · {a.section ?? "Research Article"}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#1C1D1E]">{a.title}</p>
                <p className="mt-1 text-xs text-[#767676]">{a.authors.map((x) => x.fullName).join(", ")}</p>
                {a.doi && <p className="mt-1 font-mono text-xs text-[#414246]">{a.doi}</p>}
                <Link href={`/articles/${a.id}`} className="mt-2 inline-flex text-xs font-semibold text-[#1C1D1E] hover:underline">View on frontend →</Link>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-[#767676]">This preview is fetched server-side from <span className="font-mono">{getOjsUrl("/api/v1/submissions?status=3")}</span> using <span className="font-mono">OJS_API_TOKEN</span>. When you submit a new manuscript in OJS, it will appear here after publication.</p>
        </div>

        <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4 text-sm leading-6">
          <p className="font-semibold text-[#1C1D1E]">Need an account?</p>
          <p className="mt-1 text-[#414246]">Register as Author for EPC, then log in. Use the demo author <span className="font-mono text-xs bg-white border border-[#EFEFF0] px-1 py-0.5 rounded">author_epc / Author123!</span> to test the flow without creating a new account.</p>
          <div className="mt-3 flex gap-2">
            <Link href="/register" className="rounded bg-[#1C1D1E] px-4 py-2 text-sm font-semibold text-white hover:bg-black">Register</Link>
            <Link href="/login" className="rounded border border-[#D8D9DA] bg-white px-4 py-2 text-sm font-medium text-[#1C1D1E] hover:bg-white">Log in</Link>
          </div>
        </div>
      </div>
    </JournalLayout>
  );
}
