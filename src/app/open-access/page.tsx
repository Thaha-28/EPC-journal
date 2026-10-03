import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Open Access and Indexing",
  description: "Open access, licensing, and indexing information for Environmental Processes and Chemistry.",
};

export default function OpenAccessPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">
          Home
        </Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Open Access and Indexing</span>
      </div>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Open access</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Open Access and Indexing</h1>
        <p className="mt-2 text-sm leading-6 text-[#414246]">All content is open access from day one.</p>
      </div>
      <div className="border-t border-border bg-white px-6 sm:px-8 py-6 prose-epc">
        <h2>Open access</h2>
        <p>All articles are open access and free to read immediately on publication under Creative Commons Attribution 4.0 International (CC BY 4.0). Authors retain copyright.</p>
        <h3>Licensing</h3>
        <p><strong>Copyright:</strong> © 2026 EnviNova Scientific Publishing<br />
        <strong>License:</strong> This article is published under the Creative Commons Attribution 4.0 International License (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>).</p>
        <h2>Abstracting, Indexing & Discoverability</h2>
        <div className="overflow-hidden rounded border border-[#EFEFF0]">
          <table className="journal-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Crossref</td>
                <td>DOI registration and scholarly metadata</td>
              </tr>
              <tr>
                <td>OAI-PMH</td>
                <td>Enabled for metadata harvesting</td>
              </tr>
              <tr>
                <td>OpenAIRE</td>
                <td>Registration/harvesting planned</td>
              </tr>
              <tr>
                <td>Google Scholar</td>
                <td>Structured metadata and discoverability optimized</td>
              </tr>
              <tr>
                <td>DOAJ</td>
                <td>Application planned after eligibility requirements are met</td>
              </tr>
              <tr>
                <td>Scopus</td>
                <td>Future application subject to evaluation</td>
              </tr>
              <tr>
                <td>Web of Science</td>
                <td>Future application subject to evaluation</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Publication Fees</h2>
        <p>Environmental Processes and Chemistry currently charges no submission fees, article processing charges (APCs), page charges, colour charges, or other mandatory publication fees.</p>
        <p>All articles are published open access and are freely available to readers immediately upon publication.</p>
        <p>Editorial board details and Publisher details may be found under the ABOUT button.</p>
      </div>
    </JournalLayout>
  );
}
