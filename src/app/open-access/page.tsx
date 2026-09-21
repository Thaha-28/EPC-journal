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
        <p>Articles are published under CC BY 4.0.</p>
        <h2>Indexing status</h2>
        <p>The journal registers DOIs via Crossref and supports harvesting via OAI PMH.</p>
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
                <td>DOAJ</td>
                <td>Application upon first issue</td>
              </tr>
              <tr>
                <td>Crossref</td>
                <td>DOIs, funding and ORCID metadata</td>
              </tr>
              <tr>
                <td>OpenAIRE</td>
                <td>Via OAI PMH</td>
              </tr>
              <tr>
                <td>Google Scholar</td>
                <td>Optimized for indexing with citation metadata</td>
              </tr>
              <tr>
                <td>Scopus and Web of Science</td>
                <td>After sustained publication record</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Fees</h2>
        <p>No fees for publication.</p>
        <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#1C1D1E]">Harvesters and librarians</p>
          <p className="mt-1 text-sm leading-6 text-[#414246]">The journal supports OAI PMH for harvesting. Base URL example: https://ojs.epc-journal.org/index.php/epc/oai</p>
        </div>
      </div>
    </JournalLayout>
  );
}
