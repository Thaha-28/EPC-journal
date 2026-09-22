import Link from "next/link";
import Image from "next/image";
import type { OjsArticle } from "@/lib/ojs";

export function ArticleCard({ article }: { article: OjsArticle }) {
  return (
    <article className="group flex gap-4 rounded-lg border border-border bg-white p-4 hover:shadow-sm hover:border-[#d1d5db] transition">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-[#eef2f7] px-2.5 py-1 text-xs font-semibold text-[#1C1D1E]">{article.section ?? "Research Article"}</span>
          <span className="text-muted-foreground">{article.pages ?? "1-10"}</span>
          {article.datePublished && (
            <span className="text-muted-foreground">
              {new Date(article.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          )}
        </div>
        <Link href={`/articles/${article.id}`} className="mt-2.5 block">
          <h3 className="font-display text-[15px] font-bold leading-5 text-[#1C1D1E] group-hover:underline underline-offset-4 line-clamp-3">{article.title}</h3>
        </Link>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-1">{article.authors.map((a) => a.fullName).join(", ")}</p>
        {article.abstract && <p className="mt-2 text-sm leading-6 text-[#2F3032] line-clamp-3">{article.abstract}</p>}
        <div className="mt-3 flex items-center gap-3">
          <Link href={`/articles/${article.id}`} className="text-sm font-semibold text-[#1C1D1E] hover:text-[#0052a3]">
            Read article
          </Link>
          {article.doi && (
            <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-[#1C1D1E] hover:underline">
              {article.doi}
            </a>
          )}
        </div>
      </div>
      <div className="hidden sm:flex shrink-0 flex-col items-center gap-1.5">
        <div className="h-[92px] w-[124px] overflow-hidden rounded border border-[#EFEFF0] bg-[#F8F9FA] flex items-center justify-center">
          <Image src="/emblem-EPC.jpeg" alt="Graphical abstract" width={124} height={92} className="h-full w-full object-cover" />
        </div>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#767676]">Graphical abstract</span>
      </div>
    </article>
  );
}
