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
      <div className="border-b border-border bg-[#f8f9fb] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#0066cc] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#005274]">Open Access and Indexing</span>
      </div>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#0066cc]">Open access</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#005274]">Open Access and Indexing</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Diamond open access from day one. No fees for authors or readers.</p>
      </div>
      <div className="border-t border-border bg-white px-6 sm:px-8 py-6 prose-epc">
        <h2>Diamond open access</h2>
        <p>EPC is diamond open access. All content is free to read immediately on publication and authors pay no article processing charges. Publication costs are supported through institutional and grant support, not author fees.</p>
        <h3>Licensing</h3>
        <p>Articles are published under Creative Commons Attribution 4.0 International (CC BY 4.0). Authors retain copyright.</p>
        <h2>Indexing status</h2>
        <p>At launch, EPC registers DOIs via Crossref and supports harvesting via OAI PMH.</p>
        <div className="overflow-hidden rounded-lg border border-border">
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
                <td>Via OAI PMH, automatic once configured</td>
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
        <p>No submission fees, no APCs, no page charges, no color charges.</p>
        <div className="rounded-lg border border-border bg-[#f8f9fb] p-4">
          <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">Harvesters and librarians</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">The journal supports OAI PMH for harvesting by DOAJ, OpenAIRE, and other aggregators. Base URL example: https://ojs.epc-journal.org/index.php/epc/oai</p>
        </div>
      </div>
    </JournalLayout>
  );
}
