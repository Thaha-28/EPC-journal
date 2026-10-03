"use client";

import { useState } from "react";

export function EditorPhoto({
  src,
  name,
  initials,
  size = 80,
}: {
  src?: string;
  name: string;
  initials: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  if (!showImage) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center overflow-hidden rounded bg-[#F8F9FA] border border-[#D8D9DA]"
        role="img"
        aria-label={name}
      >
        <span className="text-sm font-bold text-[#767676]">{initials}</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 overflow-hidden rounded bg-[#F8F9FA] border border-[#D8D9DA] relative"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}