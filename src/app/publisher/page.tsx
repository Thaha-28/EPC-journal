import Link from "next/link";
import type { Metadata } from "next";
import { JournalLayout } from "@/components/Sidebar";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Publisher Details",
  description: "Publisher information for Environmental Processes and Chemistry.",
};

export default function PublisherPage() {
  return (
    <JournalLayout>
      <div className="border-b border-border bg-[#F8F9FA] px-6 py-3 flex items-center gap-2 text-xs">
        <Link href="/" className="text-[#1C1D1E] hover:underline">
          Home
        </Link>
        <span className="text-[#767676]">/</span>
        <span className="font-medium text-[#1C1D1E]">Publisher Details</span>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#767676]">About</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-[#1C1D1E]">Publisher Details</h1>
        <p className="mt-2 text-sm leading-6 text-[#414246]">Ownership and publishing information for Environmental Processes and Chemistry.</p>
      </div>

      <div className="border-t border-border bg-white px-6 sm:px-8 py-6 prose-epc">
        <div className="overflow-hidden rounded border border-[#EFEFF0]">
          <table className="journal-table">
            <tbody>
              <tr>
                <th scope="row">Journal</th>
                <td>{siteConfig.name}</td>
              </tr>
              <tr>
                <th scope="row">Publisher</th>
                <td>EnviNova Scientific Publishing</td>
              </tr>
              <tr>
                <th scope="row">Published by</th>
                <td>{siteConfig.publisher}</td>
              </tr>
              <tr>
                <th scope="row">Online ISSN</th>
                <td>{siteConfig.issn.online}</td>
              </tr>
              <tr>
                <th scope="row">Publication model</th>
                <td>Diamond open access, continuous publication. No article processing charges.</td>
              </tr>
              <tr>
                <th scope="row">Licensing</th>
                <td>
                  Creative Commons Attribution 4.0 International (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>). Authors retain copyright.
                </td>
              </tr>
              <tr>
                <th scope="row">Editorial contact</th>
                <td>
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#414246]">
          Editorial board details are available on the <Link href="/editorial-board">Editorial Board page</Link>, and journal policies under the ABOUT button in the main navigation.
        </p>
      </div>
    </JournalLayout>
  );
}