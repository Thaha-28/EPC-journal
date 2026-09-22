"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig, getOjsUrl } from "@/lib/config";

export function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      {/* Journal masthead */}
      <div className="bg-white border-b border-[#D8D9DA]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 py-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:flex h-14 w-14 items-center justify-center bg-white border border-[#D8D9DA] rounded overflow-hidden p-1 shadow-sm">
                <Image src="/emblem-EPC.jpeg" alt="EPC emblem" width={52} height={52} className="h-full w-full object-contain" />
              </span>
              <span className="sm:hidden flex h-9 w-9 items-center justify-center bg-[#1C1D1E] text-white font-bold text-sm rounded">E</span>
              <span className="flex flex-col">
                <span className="font-display text-[17px] sm:text-[20px] font-bold leading-none text-[#1C1D1E]">Environmental Processes</span>
                <span className="font-display text-[17px] sm:text-[20px] font-bold leading-none text-[#1C1D1E]">and Chemistry</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
              <Link href="/login" className="btn-ghost text-sm">
                Log in / Register
              </Link>
              <Link href="/submit" className="btn-primary text-sm">
                Submit an article
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex lg:hidden h-9 w-9 items-center justify-center border border-[#D8D9DA] rounded bg-white text-[#1C1D1E] ml-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Journal nav - exact Journal tab bar with underline active */}
      <nav aria-label="Primary" className="hidden lg:block bg-white border-b border-[#D8D9DA] sticky top-0 z-30">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 flex items-center h-10 gap-0.5 text-sm overflow-x-auto">
          <Link href="/" className="shrink-0 px-3 py-2 text-sm font-bold text-[#1C1D1E] border-b-2 border-[#1C1D1E] -mb-px bg-[#F8F9FA]">
            Journal Home
          </Link>
          <Link href="/current" className="shrink-0 px-3 py-2 text-sm font-medium text-[#2F3032] hover:text-[#1C1D1E] hover:bg-[#F8F9FA] rounded">
            Current Issue
          </Link>
          <Link href="/archives" className="shrink-0 px-3 py-2 text-sm font-medium text-[#2F3032] hover:text-[#1C1D1E] hover:bg-[#F8F9FA] rounded">
            All Issues
          </Link>
          <Link href="/aims-scope" className="shrink-0 px-3 py-2 text-sm font-medium text-[#2F3032] hover:text-[#1C1D1E] hover:bg-[#F8F9FA] rounded">
            Aims and Scope
          </Link>

          <div className="relative shrink-0" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
            <button
              aria-haspopup="true"
              aria-expanded={aboutOpen}
              onClick={() => setAboutOpen((v) => !v)}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#2F3032] hover:text-[#1C1D1E] hover:bg-[#F8F9FA] rounded"
            >
              About
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className={`absolute left-0 top-full mt-1 w-60 bg-white border border-[#D8D9DA] rounded shadow-lg p-1 z-20 ${aboutOpen ? "block" : "hidden"}`}>
              {siteConfig.nav.about.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setAboutOpen(false)}
                  className="block px-3 py-2 text-sm text-[#1C1D1E] hover:bg-[#F8F9FA] rounded"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/editorial-board" className="shrink-0 px-3 py-2 text-sm font-medium text-[#2F3032] hover:text-[#1C1D1E] hover:bg-[#F8F9FA] rounded">
            Editorial Board
          </Link>
          <Link href="/open-access" className="shrink-0 px-3 py-2 text-sm font-medium text-[#2F3032] hover:text-[#1C1D1E] hover:bg-[#F8F9FA] rounded">
            Open Access
          </Link>

          <div className="ml-auto flex items-center gap-2 shrink-0 pl-4 border-l border-[#EFEFF0]">
            <form action={getOjsUrl(siteConfig.ojsLinks.search)} method="get" target="_blank" className="flex items-center" role="search">
              <div className="relative">
                <input
                  name="query"
                  placeholder="Search this journal"
                  aria-label="Search this journal"
                  className="h-8 w-52 rounded-l border border-[#C2C3C6] bg-white px-3 pr-8 text-sm placeholder:text-[#767676] outline-none focus:border-[#1C1D1E] focus:ring-1 focus:ring-[#1C1D1E]/20"
                />
                <svg className="absolute right-2.5 top-2.5 text-[#767676]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </div>
              <button type="submit" className="h-8 rounded-r bg-[#1C1D1E] px-3 text-xs font-semibold text-white hover:bg-[#000000] border border-[#1C1D1E] border-l-0">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      {mobileOpen && (
        <nav aria-label="Mobile" className="lg:hidden border-t border-[#D8D9DA] bg-[#F8F9FA]">
          <div className="mx-auto max-w-[1600px] px-4 py-3 flex flex-col text-sm">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-bold text-[#1C1D1E] bg-white rounded border border-[#D8D9DA] mb-1">
              Journal Home
            </Link>
            {siteConfig.nav.primary
              .filter((i) => i.label !== "Home")
              .map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[#2F3032] hover:bg-white rounded">
                  {item.label}
                </Link>
              ))}
            <p className="mt-2 px-3 text-xs font-bold tracking-widest text-[#767676] uppercase">About</p>
            {siteConfig.nav.about.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="px-3 py-2 ml-2 text-[#2F3032] hover:bg-white rounded">
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link href="/login" className="inline-flex justify-center rounded border border-[#D8D9DA] bg-white px-4 py-2.5 text-sm font-semibold text-[#1C1D1E]">
                Log in
              </Link>
              <Link href="/submit" className="inline-flex justify-center rounded bg-[#1C1D1E] px-4 py-2.5 text-sm font-semibold text-white">
                Submit
              </Link>
            </div>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 flex justify-center rounded border border-[#D8D9DA] bg-white px-4 py-2 text-sm font-semibold text-[#1C1D1E]">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
