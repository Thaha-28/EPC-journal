import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { getOjsUrl, getOjsHost, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Submit a Manuscript",
  description: "Submit your manuscript to Environmental Processes and Chemistry via OJS. Account creation, wizard, and tracking.",
};

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
          All submissions are handled securely in OJS — our online journal system. The button below will take you through account creation (if needed), the 4-step submission wizard, and then to your dashboard where you can track peer review, revisions, and proofs. Your EPC journal site and OJS share the same journal <strong>epc</strong> at <span className="font-mono text-xs bg-white border border-[#EFEFF0] px-1.5 py-0.5 rounded">{getOjsHost()}</span>.
        </p>
      </div>

      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6 space-y-6">
        {/* Primary CTA */}
        <div className="rounded border border-[#1C1D1E] bg-[#1C1D1E] p-5 text-white">
          <h2 className="text-sm font-bold">Ready to submit?</h2>
          <p className="mt-1 text-sm leading-6 text-white/80">If you don&apos;t have an account, OJS will ask you to register first — then it returns you to the wizard. If you already have an account, it goes straight to the wizard.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={getOjsUrl(siteConfig.ojsLinks.submission)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded bg-white px-5 py-2.5 text-sm font-bold text-[#1C1D1E] hover:bg-[#F8F9FA]">Start submission wizard →</Link>
            <Link href="/author-guidelines" className="inline-flex items-center justify-center rounded border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">Read author guidelines</Link>
          </div>
          <p className="mt-3 text-xs text-white/60">OJS: <span className="font-mono">{getOjsUrl(siteConfig.ojsLinks.submission)}</span></p>
        </div>

        {/* 4-step flow */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E] border-b border-[#EFEFF0] pb-2">From account to tracking — 4 steps</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1D1E] text-xs font-bold text-white">1</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Create account</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">New author? Register with name, affiliation, email, and password. You&apos;ll be enrolled as Author for EPC.</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href={getOjsUrl(siteConfig.ojsLinks.register)} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded bg-[#1C1D1E] px-3 py-2 text-sm font-semibold text-white hover:bg-black">Register</Link>
                <Link href="/register" className="text-xs font-medium text-[#1C1D1E] hover:underline text-center">What&apos;s needed? →</Link>
              </div>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#D8D9DA] text-xs font-bold text-[#1C1D1E]">2</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Log in</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">Already have an account? Log in. OJS remembers you with a secure cookie.</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href={getOjsUrl(siteConfig.ojsLinks.login)} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded border border-[#D8D9DA] bg-white px-3 py-2 text-sm font-semibold text-[#1C1D1E] hover:bg-[#F8F9FA]">Log in</Link>
                <Link href="/login" className="text-xs font-medium text-[#1C1D1E] hover:underline text-center">Trouble logging in?</Link>
              </div>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#D8D9DA] text-xs font-bold text-[#1C1D1E]">3</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Submission wizard</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">4 tabs: Start, Upload, Metadata (title/abstract/authors/keywords), Confirmation. Add cover letter, funding, and competing interests.</p>
              <ul className="mt-2 text-xs leading-5 text-[#767676] list-disc pl-4">
                <li>PDF + source files</li>
                <li>Data availability + DOI</li>
                <li>CC BY 4.0 licence</li>
              </ul>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1D1E] text-xs font-bold text-white">4</span>
                <p className="text-sm font-bold text-[#1C1D1E]">Track</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#414246]">After submit, follow peer review, revisions, copyediting, and publication on your dashboard.</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href={getOjsUrl(siteConfig.ojsLinks.mySubmissions)} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded bg-white border border-[#D8D9DA] px-3 py-2 text-sm font-semibold text-[#1C1D1E] hover:bg-white">My submissions</Link>
                <Link href="/dashboard" className="text-xs font-medium text-[#1C1D1E] hover:underline text-center">Go to dashboard →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Demo accounts */}
        <div className="rounded border border-dashed border-[#D8D9DA] bg-[#F8F9FA] p-4">
          <p className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">Demo accounts (local OJS)</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded border border-[#EFEFF0] bg-white p-3">
              <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest">Author</p>
              <p className="mt-1 font-mono text-sm font-bold text-[#1C1D1E]">author_epc</p>
              <p className="text-xs text-[#414246]">Author123!</p>
              <p className="text-xs text-[#767676]">author@epc-journal.org</p>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-white p-3">
              <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest">Reviewer</p>
              <p className="mt-1 font-mono text-sm font-bold text-[#1C1D1E]">reviewer_epc</p>
              <p className="text-xs text-[#414246]">Reviewer123!</p>
              <p className="text-xs text-[#767676]">reviewer@epc-journal.org</p>
            </div>
            <div className="rounded border border-[#EFEFF0] bg-white p-3">
              <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest">Editor / Admin</p>
              <p className="mt-1 font-mono text-sm font-bold text-[#1C1D1E]">admin</p>
              <p className="text-xs text-[#414246]">Admin123!</p>
              <p className="text-xs text-[#767676]">admin@epc-journal.org</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#767676]">Use <strong>Register</strong> to create your own author account, or log in with the demo author to test the wizard. All submissions appear in <Link href={getOjsUrl(siteConfig.ojsLinks.mySubmissions)} target="_blank" className="text-[#1C1D1E] underline">My Submissions</Link> and in the editor&apos;s <Link href={getOjsUrl(siteConfig.ojsLinks.editorial)} target="_blank" className="text-[#1C1D1E] underline">Editorial Dashboard</Link>.</p>
        </div>

        {/* Tracking */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded border border-[#EFEFF0] bg-white p-4">
            <h3 className="text-sm font-bold text-[#1C1D1E]">After you submit</h3>
            <ol className="mt-2 space-y-2 text-sm leading-6 text-[#414246] list-decimal pl-4">
              <li><strong>Submission</strong> → <span className="font-mono text-xs bg-[#F8F9FA] border border-[#EFEFF0] px-1 py-0.5 rounded">stage 1</span> – completeness check</li>
              <li><strong>Review</strong> → 2+ reviewers, you&apos;ll get email and dashboard notice</li>
              <li><strong>Revisions</strong> → upload revised files, response to reviewers</li>
              <li><strong>Copyediting & Production</strong> → proofs, DOI, open access publication</li>
            </ol>
            <p className="mt-3 text-xs text-[#767676]">All correspondence is tracked in OJS. You&apos;ll get emails, but the dashboard is the source of truth.</p>
          </div>
          <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-4">
            <p className="text-sm font-bold text-[#1C1D1E]">Quick links (OJS)</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href={getOjsUrl(siteConfig.ojsLinks.mySubmissions)} target="_blank" rel="noopener noreferrer" className="rounded bg-white border border-[#EFEFF0] px-3 py-2 font-medium text-[#1C1D1E] hover:bg-white text-center">My submissions</Link>
              <Link href={getOjsUrl(siteConfig.ojsLinks.dashboard)} target="_blank" rel="noopener noreferrer" className="rounded bg-white border border-[#EFEFF0] px-3 py-2 font-medium text-[#1C1D1E] hover:bg-white text-center">Author dashboard</Link>
              <Link href={getOjsUrl(siteConfig.ojsLinks.profile)} target="_blank" rel="noopener noreferrer" className="rounded bg-white border border-[#EFEFF0] px-3 py-2 font-medium text-[#1C1D1E] hover:bg-white text-center">Profile & ORCID</Link>
              <Link href="/dashboard" className="rounded bg-[#1C1D1E] px-3 py-2 font-semibold text-white hover:bg-black text-center">Frontend dashboard →</Link>
            </div>
          </div>
        </div>

        <p className="text-xs leading-5 text-[#767676]">Need help? <Link href="/contact" className="text-[#1C1D1E] underline">Contact the editorial office</Link> or <Link href="/author-guidelines" className="text-[#1C1D1E] underline">read the guidelines</Link>. Submission system is OJS 3.5.0-5 at <span className="font-mono">{getOjsUrl("/index.php/epc")}</span>.</p>
      </div>
    </JournalLayout>
  );
}
