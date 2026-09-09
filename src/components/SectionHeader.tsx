export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-[10px] font-bold tracking-[0.12em] text-[#0f3a5f] uppercase">{eyebrow}</p>}
      <h1
        className="mt-1 text-[16px] font-bold text-[#0f3a5f] border-b border-[#d2d9de] pb-2"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
      </h1>
      {description && <p className="mt-2 text-[12px] leading-5 text-[#5a6a73]">{description}</p>}
    </div>
  );
}
