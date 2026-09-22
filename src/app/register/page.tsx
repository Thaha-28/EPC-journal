import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { getOjsUrl, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an author account for Environmental Processes and Chemistry via OJS.",
};

export default function RegisterPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">Home</Link>
        <span className="text-[#767676]">/</span>
        <Link href="/submit" className="text-[#1C1D1E] hover:underline">Submit</Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Register</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Account</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Create an author account</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#414246]">
          Registration is handled securely in OJS. You’ll be enrolled as <strong>Author</strong> for EPC. The frontend and OJS share the same user database — your EPC journal account is your OJS account.
        </p>
      </div>

      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6 space-y-6">
        <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-5">
          <h2 className="text-sm font-bold text-[#1C1D1E]">Register in OJS</h2>
          <p className="mt-1 text-sm leading-6 text-[#414246]">You’ll be redirected to OJS’s registration form. Required: given name, family name, affiliation, email, username, password. Accept the privacy statement.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={getOjsUrl(siteConfig.ojsLinks.register)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded bg-[#1C1D1E] px-5 py-2.5 text-sm font-bold text-white hover:bg-black">Open OJS registration →</Link>
            <Link href={getOjsUrl(siteConfig.ojsLinks.login)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded border border-[#D8D9DA] bg-white px-5 py-2.5 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">Already have an account? Log in</Link>
          </div>
          <p className="mt-3 text-xs text-[#767676]">OJS URL: <span className="font-mono">{getOjsUrl(siteConfig.ojsLinks.register)}</span></p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded border border-[#EFEFF0] bg-white p-4">
            <h3 className="text-sm font-bold text-[#1C1D1E]">What you need</h3>
            <ul className="mt-2 text-sm leading-6 text-[#414246] list-disc pl-4">
              <li>Affiliation and ORCID (optional)</li>
              <li>Username (e.g., <span className="font-mono text-xs bg-[#F8F9FA] border border-[#EFEFF0] px-1 py-0.5 rounded">author_epc</span>)</li>
              <li>Strong password — e.g., <span className="font-mono text-xs bg-[#F8F9FA] border border-[#EFEFF0] px-1 py-0.5 rounded">Author123!</span></li>
              <li>Consent to privacy + review interests</li>
            </ul>
          </div>
          <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-4">
            <h3 className="text-sm font-bold text-[#1C1D1E]">Demo author (local)</h3>
            <p className="mt-1 text-sm font-mono font-bold text-[#1C1D1E]">author_epc / Author123!</p>
            <p className="text-xs text-[#767676]">author@epc-journal.org — already enrolled as Author for EPC. Use it to test submission without registering.</p>
            <Link href={getOjsUrl(siteConfig.ojsLinks.login)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded bg-white border border-[#EFEFF0] px-3 py-2 text-sm font-medium text-[#1C1D1E] hover:bg-white">Log in as demo author</Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/submit" className="rounded border border-[#D8D9DA] bg-white px-4 py-2 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">Back to submit</Link>
          <Link href="/login" className="rounded bg-[#1C1D1E] px-4 py-2 text-sm font-semibold text-white hover:bg-black">Go to login →</Link>
        </div>
      </div>
    </JournalLayout>
  );
}
