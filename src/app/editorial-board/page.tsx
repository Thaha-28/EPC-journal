import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Editorial Board",
  description: "Editorial board of Environmental Processes and Chemistry.",
};

const board = {
  editorsInChief: [
    { name: "Prof. A. Rahman", affiliation: "University of Dhaka, Bangladesh", area: "Environmental photochemistry" },
    { name: "Prof. L. Weber", affiliation: "Technical University of Berlin, Germany", area: "Water process engineering" },
  ],
  associateEditors: [
    { name: "Dr. S. L. Chen", affiliation: "ETH Zurich, Switzerland", area: "Atmospheric chemistry" },
    { name: "Dr. M. J. Alvarez", affiliation: "University of Barcelona, Spain", area: "Marine and estuarine chemistry" },
    { name: "Prof. K. Osei", affiliation: "Coastal Research Lab, Ghana", area: "Microplastics and fate" },
    { name: "Prof. P. Nakamura", affiliation: "Kyoto University, Japan", area: "Sustainable synthesis and LCA" },
    { name: "Dr. J. Patel", affiliation: "Imperial College London, UK", area: "Contaminant transformation" },
  ],
};

export default function EditorialBoardPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#f8f9fb] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#0066cc] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#005274]">Editorial Board</span>
      </div>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#0066cc]">People</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#005274]">Editorial Board</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Our board combines environmental chemistry, process engineering, and atmospheric science.</p>
      </div>

      <div className="border-t border-border bg-[#f8f9fb] px-6 sm:px-8 py-6 space-y-6">
        <div className="journal-card">
          <div className="journal-card-header">Editors in Chief</div>
          <div className="divide-y divide-border">
            {board.editorsInChief.map((m) => (
              <div key={m.name} className="flex gap-4 p-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-[#eef2f7] flex items-center justify-center text-sm font-bold text-[#005274]">{m.name.split(" ").pop()?.[0] ?? "E"}</div>
                <div>
                  <p className="text-sm font-semibold text-[#005274]">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.affiliation}</p>
                  <span className="mt-1 inline-flex rounded-full bg-[#f8f9fb] border border-border px-2 py-0.5 text-xs font-medium text-[#005274]">{m.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="journal-card">
          <div className="journal-card-header">Associate Editors</div>
          <div className="divide-y divide-border">
            {board.associateEditors.map((m) => (
              <div key={m.name} className="p-4">
                <p className="text-sm font-semibold text-[#005274]">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.affiliation}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{m.area}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-border bg-white px-4 py-3 text-sm leading-6">
          <span className="font-semibold text-[#005274]">Advisory Board:</span> <span className="text-muted-foreground">International advisory board under formation. If you are interested in serving, please contact the editorial office via the contact page.</span>
        </div>
      </div>
    </JournalLayout>
  );
}
