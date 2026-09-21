import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the editorial office of Environmental Processes and Chemistry.",
};

export default function ContactPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#f8f9fb] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-[#1C1D1E]">Contact</span>
      </div>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">Contact</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Contact the editorial office</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">For submissions, use the online submission system. For general queries, use the form below or write directly to the editorial inbox.</p>
      </div>
      <div className="border-t border-border bg-white px-6 py-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="journal-card">
          <div className="journal-card-header">Send a message</div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground">This form posts to a lightweight serverless endpoint that forwards to the editorial inbox. No account needed.</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="journal-card">
            <div className="journal-card-header">Editorial inbox</div>
            <div className="p-4 text-sm leading-6">
              editors@epc-journal.org
              <br />
              <span className="text-xs text-muted-foreground">Response target: 3 business days.</span>
            </div>
          </div>
          <div className="journal-card border-amber-200 bg-[#fffaf0]">
            <div className="journal-card-header bg-[#c9a96e] text-[#1C1D1E]">For submissions</div>
            <div className="p-4 text-sm leading-6 text-muted-foreground">Do not use this form to submit manuscripts. Use the online submission system so your files, metadata, and correspondence are tracked together.</div>
          </div>
          <div className="journal-card">
            <div className="journal-card-header">Mailing address</div>
            <div className="p-4 text-sm leading-6 text-muted-foreground">
              Environmental Processes and Chemistry
              <br />
              Editorial Office
              <br />
              Address to be confirmed
              <br />
              Email is preferred for speed.
            </div>
          </div>
        </div>
      </div>
    </JournalLayout>
  );
}
