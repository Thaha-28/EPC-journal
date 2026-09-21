import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Editorial Board",
  description: "Editorial board of Environmental Processes and Chemistry.",
};

export default function EditorialBoardPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">
          Home
        </Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Editorial Board</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">People</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Editorial Board</h1>
        <p className="mt-2 text-sm leading-6 text-[#414246]">Leading researchers in environmental processes, chemistry, biology, and interdisciplinary environmental science. Photos are shown alongside each member for a clear side by side presentation.</p>
      </div>

      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6 space-y-8">
        {/* Chief Editors */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E] border-b border-[#EFEFF0] pb-2">Chief Editors</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="flex gap-4 rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-white border border-[#D8D9DA] flex items-center justify-center">
                <span className="text-sm font-bold text-[#1C1D1E]">SMT</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1C1D1E]">Dr. Sheik Moideen Thaha S K</p>
                <p className="text-xs font-semibold text-[#414246]">Material Science and Nanochemistry</p>
                <p className="mt-1 text-xs leading-4 text-[#767676]">Department of Chemistry, School of Advanced Sciences, Vellore Institute of Technology, India</p>
                <p className="mt-2 inline-flex rounded bg-white border border-[#EFEFF0] px-2 py-0.5 text-xs font-medium text-[#1C1D1E]">Chief Editor</p>
              </div>
            </div>

            <div className="flex gap-4 rounded border border-[#EFEFF0] bg-[#F8F9FA] p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-white border border-[#D8D9DA] flex items-center justify-center">
                <span className="text-sm font-bold text-[#1C1D1E]">AMT</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1C1D1E]">Dr. A. Mohamed Tharik</p>
                <p className="text-xs font-semibold text-[#414246]">Environmental Sciences</p>
                <p className="mt-1 text-xs leading-4 text-[#767676]">Department of Chemistry, School of Advanced Sciences, Vellore Institute of Technology, India</p>
                <p className="mt-2 inline-flex rounded bg-white border border-[#EFEFF0] px-2 py-0.5 text-xs font-medium text-[#1C1D1E]">Chief Editor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Board of Editors */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E] border-b border-[#EFEFF0] pb-2">Board of Editors</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Environmental Remediation */}
            <div className="flex gap-4 rounded border border-[#EFEFF0] bg-white p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-[#F8F9FA] border border-[#D8D9DA]">
                <Image src="/editors/manoj-sekaran.png" alt="Dr. Manoj Sekaran" width={80} height={80} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Environmental Remediation</p>
                <p className="mt-1 text-sm font-bold text-[#1C1D1E]">Dr. Manoj Sekaran</p>
                <p className="mt-1 text-xs leading-4 text-[#414246]">Department of Bioscience and Biotechnology, Indian Institute of Technology Kharagpur, West Bengal, India</p>
              </div>
            </div>

            {/* Ecological Bioinformatics */}
            <div className="flex gap-4 rounded border border-[#EFEFF0] bg-white p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-[#F8F9FA] border border-[#D8D9DA]">
                <Image src="/editors/mohanraj-gopikrishnan.jpeg" alt="Dr. Mohanraj Gopikrishnan" width={80} height={80} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Ecological Bioinformatics</p>
                <p className="mt-1 text-sm font-bold text-[#1C1D1E]">Dr. Mohanraj Gopikrishnan</p>
                <p className="mt-1 text-xs leading-4 text-[#414246]">School of Biosciences and Technology, Vellore Institute of Technology, India</p>
              </div>
            </div>

            {/* Organic Chemistry */}
            <div className="flex gap-4 rounded border border-[#EFEFF0] bg-white p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-[#F8F9FA] border border-[#D8D9DA]">
                <Image src="/editors/dhandapani-vinayagam.png" alt="Dr. Dhandapani Vinayagam" width={80} height={80} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Organic Chemistry</p>
                <p className="mt-1 text-sm font-bold text-[#1C1D1E]">Dr. Dhandapani Vinayagam</p>
                <p className="mt-1 text-xs leading-4 text-[#414246]">Department of Chemistry, School of Advanced Sciences, Vellore Institute of Technology, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded border border-dashed border-[#D8D9DA] bg-[#F8F9FA] px-4 py-3 text-sm leading-6">
          <span className="font-semibold text-[#1C1D1E]">Advisory Board</span>
          <span className="text-[#414246]"> International advisory board under formation. If you are interested in serving, please contact the editorial office via the contact page.</span>
        </div>
      </div>
    </JournalLayout>
  );
}
