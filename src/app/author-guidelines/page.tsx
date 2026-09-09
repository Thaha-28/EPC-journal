import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { getOjsUrl, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Author Guidelines",
  description: "Author guidelines for Environmental Processes and Chemistry.",
};

export default function AuthorGuidelinesPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#f8f9fb] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#0066cc] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#005274]">Author Guidelines</span>
      </div>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">For authors</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Author Guidelines</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Prepare your manuscript before you log in to the submission system. Templates are provided in the system to ensure consistent formatting.</p>
      </div>

      <div className="border-t border-border bg-white px-6 sm:px-8 py-6">
        <div className="rounded-lg bg-[#005274] p-5 text-white">
          <p className="text-sm font-semibold">Submit your manuscript</p>
          <p className="mt-1 text-sm leading-6 text-white/75">Submission, status tracking, revisions, and proofs are handled securely in the online system.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={getOjsUrl(siteConfig.ojsLinks.submission)} target="_blank" rel="noopener noreferrer" className="rounded bg-white px-4 py-2 text-sm font-semibold text-[#005274] hover:bg-white/90">
              Start submission
            </Link>
            <Link href={getOjsUrl(siteConfig.ojsLinks.register)} target="_blank" rel="noopener noreferrer" className="rounded border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
              Register account
            </Link>
          </div>
        </div>

        <div className="mt-6 prose-epc">
          <h2>Before you submit</h2>
          <ul>
            <li>All authors approve the submitted version. Declare contributions, funding, and competing interests.</li>
            <li>Obtain permissions for any reused figures or data that are not CC BY.</li>
            <li>Prepare a cover letter stating novelty and environmental relevance.</li>
          </ul>
          <h2>Manuscript preparation</h2>
          <h3>Structure</h3>
          <p>Title, abstract 200 to 250 words, 4 to 6 keywords, introduction, materials and methods, results, discussion, conclusions, data availability, author contributions, acknowledgments, references, supporting information if needed.</p>
          <h3>Data and code</h3>
          <p>Primary data, code, and detailed methods must be available. Use repositories with DOIs and cite them.</p>
          <h3>References and units</h3>
          <p>Use consistent citation style. Use SI units. Show uncertainties where relevant. Report detection limits and QA QC.</p>
          <h2>Peer review</h2>
          <p>Single blind, at least two independent reviewers, editor makes final decision. Typical timeline: first decision within 4 to 6 weeks.</p>
          <h2>After acceptance</h2>
          <p>Copyediting is light. Proofs are sent to corresponding authors. Articles are published with Crossref DOIs under CC BY 4.0.</p>
          <h2>Quick checklist</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="journal-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cover letter with environmental relevance</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Abstract 200 to 250 words, 4 to 6 keywords</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Data availability statement and repository DOI</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Competing interests and funding statement</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Figures as vector or 600 dpi, accessible colors</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </JournalLayout>
  );
}
