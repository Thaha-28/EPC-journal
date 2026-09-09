"use client";

import { useEffect, useRef, useState } from "react";

export function AuthorHover({ name, affiliation }: { name: string; affiliation?: string }) {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current || !affiliation) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      if (!trigger || !tooltip) return;
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const margin = 8;

      // Default centered
      let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      // Clamp to viewport
      if (left < margin) left = margin;
      if (left + tooltipRect.width > viewportWidth - margin) left = viewportWidth - tooltipRect.width - margin;

      const top = triggerRect.bottom + 8;
      setStyle({ left: `${left}px`, top: `${top}px` });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [visible, affiliation]);

  if (!affiliation) {
    return <span className="font-semibold text-[#1C1D1E]">{name}</span>;
  }

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span
        tabIndex={0}
        role="button"
        aria-label={`${name}, ${affiliation}`}
        className="font-semibold text-[#1C1D1E] underline decoration-dotted decoration-[#C2C3C6] underline-offset-4 cursor-help hover:text-[#005274] hover:decoration-[#005274] focus:outline-none focus:text-[#005274] focus:decoration-[#005274]"
      >
        {name}
      </span>
      {visible && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className="fixed z-50 max-w-[280px] rounded border border-[#D8D9DA] bg-[#1C1D1E] px-3 py-2 text-xs leading-5 text-white shadow-lg"
          style={style}
        >
          {affiliation}
        </span>
      )}
    </span>
  );
}
