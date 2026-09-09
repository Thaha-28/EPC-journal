import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Editorial Policies",
  description: "Editorial, peer review, and ethics policies for Environmental Processes and Chemistry including COPE and WAME.",
};

export default function EditorialPoliciesPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#005274] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#005274]">Editorial Policies</span>
      </div>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#005274]">Policies</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Editorial Policies</h1>
        <p className="mt-2 text-sm leading-6 text-[#414246]">How we handle peer review, ethics, and integrity. Policies follow guidance from the Committee on Publication Ethics (COPE) and the World Association of Medical Editors (WAME) and are enforced in the editorial workflow.</p>
      </div>
      <div className="border-t border-border bg-white px-6 sm:px-8 py-6 prose-epc">
        <h2>Peer review</h2>
        <ul>
          <li>Single blind review. Authors do not know reviewers, reviewers know authors.</li>
          <li>At least two independent reviewers per manuscript. A third is sought when recommendations diverge.</li>
          <li>Editors handle conflicts and recuse themselves when they have a competing interest.</li>
          <li>Reviewers agree to confidentiality and timely, constructive feedback.</li>
          <li>Editorial decisions are based on scientific validity and importance to the scope, not on predicted citations.</li>
        </ul>

        <h2>Research and publication ethics</h2>
        <h3>Authorship</h3>
        <p>Authorship requires substantial contribution, drafting or revision, approval of the final version, and accountability. All authors must meet authorship criteria and approve submission. Use CRediT for contributions. Changes to authorship after submission require written agreement from all authors. We follow COPE and WAME authorship guidance.</p>
        <h3>Plagiarism and duplication</h3>
        <p>All submissions are screened with similarity software. Overlap with prior work must be disclosed and cited. Duplicate submission to another journal while under review is not permitted. Text recycling should be limited and transparent.</p>
        <h3>Image and data integrity</h3>
        <p>Adjustments to images must not misrepresent data. Raw data and code should be retained and made available on request. Fabrication, falsification, and selective reporting are investigated per COPE flowcharts and WAME recommendations.</p>
        <h3>Human, animal, and field work</h3>
        <p>Studies involving humans, animals, or regulated organisms must include ethics approval and permits. Field work with environmental samples should state collection permits where applicable.</p>

        <h2>WAME policies</h2>
        <p>The journal endorses the World Association of Medical Editors (WAME) recommendations for editorial independence and ethics. The following WAME principles apply, adapted for environmental science:</p>
        <ul>
          <li><strong>Editorial independence:</strong> Editorial decisions are independent from the publisher, owner, and other interests. Editors have full authority over content and timing of publication.</li>
          <li><strong>Conflict of interest:</strong> Authors, reviewers, and editors disclose all financial and non financial competing interests. Funding sources and sponsor roles are stated. Editors with conflicts are recused.</li>
          <li><strong>Responsibilities of editors:</strong> Editors ensure fair, confidential, and timely handling, guard against bias, and correct the record when needed.</li>
          <li><strong>Responsibilities of reviewers:</strong> Reviewers provide objective, constructive, and confidential assessments and disclose conflicts. Reviewer appropriation of author ideas before publication is misconduct.</li>
          <li><strong>Responsibilities of authors:</strong> Authors ensure originality, transparency of methods and data, accurate reporting, and ethical conduct. Authors should avoid guest, ghost, and gift authorship.</li>
          <li><strong>Misconduct and corrections:</strong> Allegations of misconduct are handled confidentially and systematically per COPE and WAME. Corrections, expressions of concern, and retractions are published when warranted and are linked and indexed.</li>
          <li><strong>Editorial freedom and integrity:</strong> Editors follow WAME policy on editorial freedom, maintain trust in the scholarly record, and support education on publication ethics.</li>
        </ul>
        <p className="text-xs text-[#767676]">Reference: World Association of Medical Editors, Recommendations on Publication Ethics Policies for Medical Journals and related WAME policy statements, adapted for EPC.</p>

        <h2>Competing interests and funding</h2>
        <p>All authors declare competing interests and funding sources using the disclosure form at submission. Editors and reviewers also declare conflicts and are reassigned when needed. Funding statements include grant numbers where applicable.</p>

        <h2>Corrections and retractions</h2>
        <p>Errors that affect interpretation will be corrected. Retractions are issued when findings are unreliable or misconduct is established. Corrections and retractions are linked to the original article, indexed, and freely accessible.</p>

        <h2>Appeals and complaints</h2>
        <p>Appeals of editorial decisions must be sent to the editorial office with a clear rebuttal and new evidence if available. Appeals are reviewed by an uninvolved editor. Complaints about the process are handled by the editors in chief per COPE and WAME guidance.</p>

        <h2>Archiving and preservation</h2>
        <p>Articles are archived via LOCKSS and CLOCKSS, plus repository copies where applicable. DOIs are registered with Crossref and metadata includes funding and ORCID.</p>
      </div>
    </JournalLayout>
  );
}
