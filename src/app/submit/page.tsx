import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Submit a Manuscript",
  description:
    "Submit your manuscript to Environmental Processes and Chemistry through the Janeway editorial system.",
};

const jw = siteConfig.janeway;
const submitUrl = `${jw.baseUrl}/${jw.journalCode}/submit/start/`;
const registerUrl = `${jw.baseUrl}/${jw.journalCode}/register/step/1/`;
const dashboardUrl = `${jw.baseUrl}/${jw.journalCode}/dashboard/`;

export default function SubmitPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">Home</Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Submit</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Author workflow</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Submit a manuscript</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#414246]">
          Manuscripts are submitted online through our Janeway editorial system. Create an author
          account, upload your files, and track peer review, revisions, and production from your
          author dashboard.
        </p>
      </div>

      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6 space-y-6">
        {/* Primary CTA */}
        <div className="rounded border border-[#1C1D1E] bg-[#1C1D1E] p-5 text-white">
          <h2 className="text-sm font-bold">Ready to submit?</h2>
          <p className="mt-1 text-sm leading-6 text-white/80">Start a new submission in the editorial system. You will need an author account — registration takes a minute and includes email confirmation.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={submitUrl} className="inline-flex items-center justify-center rounded bg-white px-5 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1C1D1E]" style={{ color: "#1C1D1E" }}>Start online submission →</a>
            <a href={registerUrl} className="inline-flex items-center justify-center rounded border border-white bg-transparent px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#1C1D1E]" style={{ color: "#ffffff" }}>Create author account</a>
            <Link href="/author-guidelines" className="inline-flex items-center justify-center rounded border border-white bg-transparent px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#1C1D1E]" style={{ color: "#ffffff" }}>Read author guidelines</Link>
          </div>
          <p className="mt-3 text-xs text-white/60">Editorial system: <span className="font-mono">{submitUrl}</span></p>
        </div>

        {/* 4-step flow */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E] border-b border-[#EFEFF0] pb-2">From submission to publication — 4 steps</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1D1E] text-xs font-bold text-white">1</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Prepare</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">Follow the author guidelines for structure, abstract length, keywords, and data availability.</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/author-guidelines" className="inline-flex justify-center rounded bg-[#1C1D1E] px-3 py-2 text-sm font-semibold text-white hover:bg-black">Author guidelines</Link>
              </div>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#D8D9DA] text-xs font-bold text-[#1C1D1E]">2</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Register & submit</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">Create an author account (confirm via email), then upload your manuscript package through the guided form.</p>
              <ul className="mt-2 text-xs leading-5 text-[#767676] list-disc pl-4">
                <li>Manuscript PDF + source files</li>
                <li>Figures, data availability, funding</li>
              </ul>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#D8D9DA] text-xs font-bold text-[#1C1D1E]">3</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Peer review</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">At least two independent reviewers assess your work. You receive status updates by email at every decision.</p>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1D1E] text-xs font-bold text-white">4</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Track</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">Follow revisions, copyediting, and publication from your author dashboard.</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href={dashboardUrl} className="inline-flex justify-center rounded bg-white border border-[#D8D9DA] px-3 py-2 text-sm font-semibold text-[#1C1D1E] hover:bg-white">Author dashboard</a>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded border border-[#EFEFF0] bg-white p-4">
            <h3 className="text-sm font-bold text-[#1C1D1E]">After you submit</h3>
            <ol className="mt-2 space-y-2 text-sm leading-6 text-[#414246] list-decimal pl-4">
              <li><strong>Submission</strong> — completeness check by the editors</li>
              <li><strong>Review</strong> — 2+ reviewers, email updates at each step</li>
              <li><strong>Revisions</strong> — upload revised files and responses in the system</li>
              <li><strong>Copyediting & Production</strong> — proofs, DOI, open access publication</li>
            </ol>
            <p className="mt-3 text-xs text-[#767676]">All notifications are sent by email. Keep your account email address up to date.</p>
          </div>
          <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-4">
            <p className="text-sm font-bold text-[#1C1D1E]">Questions?</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/contact" className="rounded bg-white border border-[#EFEFF0] px-3 py-2 font-medium text-[#1C1D1E] hover:bg-white text-center">Contact the editors</Link>
              <Link href="/author-guidelines" className="rounded bg-[#1C1D1E] px-3 py-2 font-semibold text-white hover:bg-black text-center">Author guidelines →</Link>
            </div>
          </div>
        </div>

        <p className="text-xs leading-5 text-[#767676]">Need help? <Link href="/contact" className="text-[#1C1D1E] underline">Contact the editorial office</Link> or <Link href="/author-guidelines" className="text-[#1C1D1E] underline">read the guidelines</Link>.</p>
      </div>
    </JournalLayout>
  );
}
