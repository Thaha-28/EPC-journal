import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Aims and Scope",
  description:
    "Aims and scope of Environmental Processes and Chemistry covering environmental processes, chemistry, remediation and treatment, and integrated environmental chemistry.",
};

const scopeGroups = [
  {
    title: "Environmental Processes",
    items: [
      "Biogeochemical processes and elemental cycling",
      "Chemical processes in water, soil and sediments",
      "Contaminant fate, transport and transformation",
      "Environmental pollution processes",
      "Environmental monitoring and chemical assessment",
      "Environmental modelling of chemical processes",
      "Chemical processes at air–water–soil interfaces",
    ],
  },
  {
    title: "Environmental Chemistry",
    items: [
      "Environmental analytical chemistry",
      "Organic and inorganic contaminants",
      "Emerging contaminants and pollutants",
      "Water and soil chemistry",
      "Chemical speciation, bioavailability and toxicity",
      "Environmental geochemistry",
      "Atmospheric and aquatic chemistry",
      "Chemical interactions between pollutants and environmental matrices",
    ],
  },
  {
    title: "Environmental Remediation and Treatment",
    items: [
      "Chemical and physicochemical remediation",
      "Advanced oxidation processes",
      "Adsorption, sorption and separation",
      "Photocatalysis and catalytic degradation",
      "Electrochemical environmental processes",
      "Pollutant transformation and degradation",
      "Water and soil pollution treatment",
    ],
  },
  {
    title: "Integrated Environmental Chemistry",
    items: [
      "Chemistry–climate interactions",
      "Chemistry–ecosystem interactions",
      "Environmental risk associated with contaminants",
      "Microplastics and associated chemical contaminants",
      "Nanomaterials and their environmental transformations",
      "Chemical processes related to circular economy and resource recovery",
    ],
  },
];

export default function AimsScopePage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#1C1D1E]">Aims and Scope</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">About the journal</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Aims and Scope</h1>
        <p className="mt-3 text-sm leading-7 text-[#2F3032]">
          <strong>Environmental Processes and Chemistry</strong> is a peer reviewed journal that publishes rigorous mechanistic and systems level research on processes that govern environmental behavior. We welcome experimental, field, and modelling studies that advance understanding of chemical, biological, and physical processes across natural and engineered environments, with strong emphasis on processes, interfaces, transformation, and sustainability.
        </p>
        <p className="mt-3 text-sm leading-7 text-[#2F3032]">
          The journal publishes technically correct and scientifically motivated work, including useful negative results and replication studies, through peer review.
        </p>
      </div>

      <div className="border-t border-border bg-white px-6 sm:px-8 py-6">
        <h2 className="font-display text-lg font-bold text-[#1C1D1E]">Scope</h2>
        <p className="mt-2 text-sm leading-6 text-[#414246]">The journal covers the following domains and topics. Submissions that bridge multiple domains are especially encouraged.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {scopeGroups.map((group) => (
            <div key={group.title} className="rounded border border-[#EFEFF0] bg-white overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#EFEFF0] px-4 py-2.5">
                <h3 className="text-sm font-semibold text-[#1C1D1E]">{group.title}</h3>
              </div>
              <ul className="px-4 py-3 space-y-1.5 text-sm leading-5 text-[#2F3032]">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#767676]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded border border-[#D8D9DA] bg-white p-4">
          <h3 className="text-sm font-bold text-[#1C1D1E]">Cross cutting themes</h3>
          <p className="mt-2 text-sm leading-6 text-[#414246]">
            Photocatalysis, catalytic deactivation, pollutant degradation, water research, and nanocatalysis are considered across all domains when they address environmental relevance, process understanding, or treatment performance. Studies that link laboratory process insight to field monitoring, modelling, or risk and systems assessment are prioritized.
          </p>
        </div>

        <div className="mt-8 prose-epc">
          <h2>What we look for</h2>
          <ul>
            <li>Clear process question or hypothesis with appropriate controls and replication</li>
            <li>Reproducible methods, data availability, and uncertainty treatment</li>
            <li>Mechanistic discussion that links process to environmental relevance and implications</li>
            <li>Honest treatment of limitations and boundary conditions</li>
            <li>Adherence to ethical and reporting standards per COPE and WAME</li>
          </ul>

          <h2>Out of scope</h2>
          <p>Pure monitoring reports without process insight, purely descriptive work without mechanistic analysis, or studies where environmental relevance is not established will be returned without review.</p>

          <h2>Article Types</h2>
          <ul>
            <li><strong>Research Articles:</strong> Original research addressing significant advances in environmental processes, chemistry, contaminant behaviour, environmental transformation, remediation, and related interdisciplinary areas.</li>
            <li><strong>Review Articles:</strong> Critical and comprehensive evaluations of established and emerging research, highlighting advances, knowledge gaps, challenges, and future research directions.</li>
            <li><strong>Short Communications:</strong> Concise reports of novel and scientifically significant findings that warrant rapid communication to the research community.</li>
            <li><strong>Perspectives:</strong> Expert analyses offering forward-looking views on emerging concepts, unresolved questions, research priorities, and future directions in environmental processes and chemistry.</li>
          </ul>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded border border-[#EFEFF0] bg-white p-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1C1D1E]">Audience</p>
            <p className="mt-1 text-sm leading-6 text-[#414246]">Environmental chemists, process engineers, biologists, ecologists, geochemists, geographers, modelers, and sustainability researchers in academia, government, and industry.</p>
          </div>
          <div className="rounded border border-[#EFEFF0] bg-white p-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1C1D1E]">Open access</p>
            <p className="mt-1 text-sm leading-6 text-[#414246]">All content is open access. See our <Link href="/open-access">open access statement</Link> for licensing and indexing details.</p>
          </div>
        </div>
      </div>
    </JournalLayout>
  );
}
