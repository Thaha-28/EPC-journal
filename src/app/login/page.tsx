import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { getOjsUrl, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Environmental Processes and Chemistry via OJS.",
};

export default function LoginPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">Home</Link>
        <span className="text-[#767676]">/</span>
        <Link href="/submit" className="text-[#1C1D1E] hover:underline">Submit</Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Log in</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">Account</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Log in</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#414246]">Log in via OJS. Your EPC journal login is your OJS login — same username, same password, same dashboard.</p>
      </div>

      <div className="border-t border-[#EFEFF0] bg-white px-6 sm:px-8 py-6 space-y-6">
        <div className="rounded border border-[#EFEFF0] bg-[#F8F9FA] p-5">
          <h2 className="text-sm font-bold text-[#1C1D1E]">Continue in OJS</h2>
          <p className="mt-1 text-sm leading-6 text-[#414246]">You’ll be redirected to OJS’s login. After logging in, you’ll return to your dashboard where you can submit or track.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={getOjsUrl(siteConfig.ojsLinks.login)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded bg-[#1C1D1E] px-5 py-2.5 text-sm font-bold text-white hover:bg-black">Open OJS login →</Link>
            <Link href={getOjsUrl(siteConfig.ojsLinks.register)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded border border-[#D8D9DA] bg-white px-5 py-2.5 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">Create account</Link>
          </div>
          <p className="mt-3 text-xs text-[#767676]">OJS URL: <span className="font-mono">{getOjsUrl(siteConfig.ojsLinks.login)}</span></p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded border border-[#EFEFF0] bg-white p-3">
            <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest">Author</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#1C1D1E]">author_epc</p>
            <p className="text-xs text-[#414246]">Author123!</p>
          </div>
          <div className="rounded border border-[#EFEFF0] bg-white p-3">
            <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest">Editor</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#1C1D1E]">editor_epc</p>
            <p className="text-xs text-[#414246]">Editor123!</p>
          </div>
          <div className="rounded border border-[#EFEFF0] bg-white p-3">
            <p className="text-xs font-semibold text-[#767676] uppercase tracking-widest">Admin</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#1C1D1E]">admin</p>
            <p className="text-xs text-[#414246]">Admin123!</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/submit" className="rounded border border-[#D8D9DA] bg-white px-4 py-2 text-sm font-medium text-[#1C1D1E] hover:bg-[#F8F9FA]">Back to submit</Link>
          <Link href="/dashboard" className="rounded bg-[#1C1D1E] px-4 py-2 text-sm font-semibold text-white hover:bg-black">Go to dashboard →</Link>
        </div>
      </div>
    </JournalLayout>
  );
}
