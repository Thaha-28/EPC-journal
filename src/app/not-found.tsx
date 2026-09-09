import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1160px] px-3 sm:px-4 py-6">
      <div className="max-w-xl border border-[#d2d9de] bg-white">
        <div className="bg-[#0f3a5f] px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase">404</div>
        <div className="p-4">
          <h1 className="text-[15px] font-bold text-[#0f3a5f]" style={{ fontFamily: "Georgia, serif" }}>
            Page not found
          </h1>
          <p className="mt-1 text-[12px] leading-5 text-[#333]">The page you are looking for does not exist or has moved.</p>
          <div className="mt-4 flex gap-2">
            <Link href="/" className="bg-[#0f3a5f] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#143d62]">
              Go home
            </Link>
            <Link href="/archives" className="border border-[#d2d9de] bg-white px-3 py-1.5 text-[11px] font-bold text-[#0f3a5f] hover:bg-[#f5f7f8]">
              Browse archives
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
