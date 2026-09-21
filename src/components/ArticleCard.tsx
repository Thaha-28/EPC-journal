import Link from "next/link";
import type { OjsArticle } from "@/lib/ojs";

export function ArticleCard({ article }: { article: OjsArticle }) {
  return (
    <article className="group rounded-lg border border-border bg-white p-5 hover:shadow-sm hover:border-[#d1d5db] transition">
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-[#eef2f7] px-2.5 py-1 text-xs font-semibold text-[#1C1D1E]">{article.section ?? "Research Article"}</span>
        <span className="text-muted-foreground">{article.pages ?? "1-10"}</span>
        {article.datePublished && (
          <span className="text-muted-foreground">
            {new Date(article.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </span>
        )}
      </div>
      <Link href={`/articles/${article.id}`} className="mt-3 block">
        <h3 className="font-display text-base font-bold leading-6 text-[#1C1D1E] group-hover:text-[#1C1D1E] group-hover:underline underline-offset-4 line-clamp-3">{article.title}</h3>
      </Link>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-1">{article.authors.map((a) => a.fullName).join(", ")}</p>
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
    </article>
  );
}
