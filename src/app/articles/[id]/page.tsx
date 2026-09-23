import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleById, mockIssues } from "@/lib/ojs";
import { siteConfig } from "@/lib/config";
import { ArticleSideTools, CitationTools, FigureDownload } from "@/components/CitationTools";
import { AuthorHover } from "@/components/AuthorHover";

export const revalidate = 600;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return mockIssues.flatMap((i) => i.articles.map((a) => ({ id: String(a.id) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return { title: "Article not found" };
  const authors = article.authors.map((a) => a.fullName).join(", ");
  return {
    title: article.title,
    description: article.abstract?.slice(0, 160) ?? `Article ${article.id} in ${siteConfig.name}`,
    authors: article.authors.map((a) => ({ name: a.fullName })),
    openGraph: {
      title: article.title,
      description: article.abstract?.slice(0, 200),
      type: "article",
      authors: [authors],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();

  const doiUrl = article.doi ? `https://doi.org/${article.doi}` : null;

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <nav aria-label="Breadcrumb" className="text-xs text-[#767676] flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-[#1C1D1E] hover:underline underline-offset-4">
            Home
          </Link>
          <span className="text-[#C2C3C6]">/</span>
          <Link href="/archives" className="hover:text-[#1C1D1E] hover:underline underline-offset-4">
            Archives
          </Link>
          <span className="text-[#C2C3C6]">/</span>
          <Link href="/current" className="hover:text-[#1C1D1E] hover:underline underline-offset-4">
            {article.issueId ? `Issue ${article.issueId}` : "Current Issue"}
          </Link>
          <span className="text-[#C2C3C6]">/</span>
          <span className="text-[#1C1D1E] font-medium">Article</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
          {/* Main article - readability optimized, journal standard */}
          <article className="journal-card overflow-hidden">
            {/* Top meta bar */}
            <div className="border-b border-[#EFEFF0] bg-[#F8F9FA] px-6 py-2.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1D1E] px-2.5 py-1 text-xs font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                Open Access
              </span>
              {article.section && (
                <span className="inline-flex rounded-full border border-[#D8D9DA] bg-white px-2.5 py-1 text-xs font-semibold text-[#414246]">
                  {article.section}
                </span>
              )}
              {article.pages && <span className="text-[#767676]">pp. {article.pages}</span>}
              {article.datePublished && (
                <span className="text-[#767676]">{new Date(article.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              )}
              <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[#767676]">
                <span className="h-2 w-2 rounded-full bg-[#1C1D1E]"></span>
                CC BY 4.0
              </span>
            </div>

            {/* Title block - journal standard typography */}
            <div className="px-6 sm:px-8 pt-6 sm:pt-8">
              <h1 className="font-display text-[22px] sm:text-[26px] font-bold leading-tight text-[#1C1D1E]">{article.title}</h1>

              <div className="mt-4 flex flex-wrap gap-x-1 gap-y-2 text-[13px] leading-6">
                {article.authors.map((a, idx) => (
                  <span key={idx} className="inline-flex items-baseline">
                    <AuthorHover name={a.fullName ?? "Author"} affiliation={a.affiliation} />
                    {idx < article.authors.length - 1 ? <span className="text-[#767676] ml-1">,</span> : null}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs border-t border-[#EFEFF0] pt-3">
                {article.doi && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="font-bold text-[#414246]">DOI:</span>
                    <a href={doiUrl!} target="_blank" rel="noopener noreferrer" className="font-medium text-[#1C1D1E] hover:underline break-all">
                      {article.doi}
                    </a>
                  </span>
                )}
                <span className="hidden sm:inline text-[#D8D9DA]">|</span>
                <span className="text-[#767676]">
                  Published in <Link href="/current" className="text-[#1C1D1E] hover:underline">{siteConfig.name}</Link>
                </span>
              </div>

              {article.keywords && article.keywords.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.keywords.map((k) => (
                    <span key={k} className="rounded-full border border-[#D8D9DA] bg-[#F8F9FA] px-2.5 py-1 text-xs font-medium text-[#414246]">
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Abstract - journal standard boxed */}
            <div className="mx-6 sm:mx-8 mt-6 rounded border border-[#D8D9DA] bg-[#F8F9FA] p-0 overflow-hidden">
              <div className="border-b border-[#D8D9DA] bg-white px-4 py-2 flex items-center gap-2">
                <span className="h-1 w-6 bg-[#1C1D1E] rounded-full"></span>
                <h2 className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">Abstract</h2>
                <span className="ml-auto text-xs text-[#767676]">{article.abstract ? `${article.abstract.split(" ").length} words` : ""}</span>
              </div>
              <div className="px-4 sm:px-5 py-4">
                <p className="text-[14px] leading-7 text-[#1C1D1E]">{article.abstract ?? "No abstract available."}</p>
              </div>
            </div>

            {/* Article body - optimized for readability with fitted measure */}
            <div className="px-6 sm:px-8 py-6 sm:py-8">
              <div className="prose-epc mx-auto max-w-[72ch]">
                <h2>Introduction</h2>
                <p>
                  Environmental processes at interfaces control the fate and transport of contaminants and nutrients. Understanding these mechanisms is essential for accurate prediction and effective remediation. This study examines key transformations under controlled laboratory and field conditions.
                </p>
                <p>
                  Here we combine experimental and modelling approaches to quantify process rates and identify controlling factors. The results provide insight into pollutant behaviour in natural and engineered systems and inform strategies for water quality management.
                </p>

                <h2>Materials and Methods</h2>
                <p>
                  Methods are described with sufficient detail to ensure reproducibility. Data availability, code repositories, and uncertainty treatment are stated. Environmental relevance is established for each process studied.
                </p>

                <h3>Figure standard</h3>
                <p>All figures are centered, use a thin border, and include a numbered caption in 12px with bold figure label. Images are responsive and limited to the text width for readability.</p>

                <figure className="my-6 overflow-hidden rounded border border-[#D8D9DA] bg-white">
                  <div className="bg-[#F8F9FA] p-3 sm:p-4 flex items-center justify-center">
                    <Image
                      src="/emblem-EPC.jpeg"
                      alt="Example figure showing journal standard image sizing and border"
                      width={640}
                      height={360}
                      className="h-auto max-h-[320px] w-auto max-w-full object-contain bg-white border border-[#EFEFF0] rounded"
                    />
                  </div>
                  <figcaption className="border-t border-[#EFEFF0] bg-white px-4 py-2.5 text-center text-xs leading-5 text-[#414246]">
                    <span className="font-bold text-[#1C1D1E]">Figure 1.</span> Journal standard figure. Image is centered, bordered, responsive, and limited to text width. Caption is centered, 12px, with bold label and regular description. Resolution should be at least 300 dpi in production.
                  </figcaption>
                  <FigureDownload src="/emblem-EPC.jpeg" filename={`EPC-${article.id}-Figure-1-high-quality.jpeg`} label="Figure 1 · 2400 × 1800 · JPEG" />
                </figure>

                <h3>Table standard</h3>
                <p>Tables use the journal table style with header background, uppercase labels, and thin borders for clarity.</p>

                <div className="my-6 overflow-hidden rounded border border-[#D8D9DA]">
                  <table className="journal-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                        <th>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Temperature</td>
                        <td>25.0 ± 0.2</td>
                        <td>°C</td>
                      </tr>
                      <tr>
                        <td>pH</td>
                        <td>7.1 ± 0.1</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Flow rate</td>
                        <td>1.2</td>
                        <td>L min<sup>-1</sup></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="border-t border-[#EFEFF0] bg-[#F8F9FA] px-3 py-2 text-center text-xs text-[#767676]">
                    <span className="font-bold text-[#1C1D1E]">Table 1.</span> Journal standard table with thin borders and header in grey 100.
                  </div>
                </div>

                <h2>Results and Discussion</h2>
                <p>Results are presented with clear subheadings and sufficient white space. Discuss mechanisms, rates, and environmental implications. Maintain a single column measure near 68 to 75 characters for optimal reading speed.</p>

                <figure className="my-6 overflow-hidden rounded border border-[#D8D9DA] bg-white">
                  <div className="bg-white p-2">
                    <Image
                      src="/logo-epc.jpeg"
                      alt="Second example figure with journal standard treatment"
                      width={640}
                      height={260}
                      className="h-auto w-full max-h-[240px] object-contain"
                    />
                  </div>
                  <figcaption className="border-t border-[#D8D9DA] bg-[#F8F9FA] px-4 py-2.5 text-center text-xs leading-5 text-[#414246]">
                    <span className="font-bold text-[#1C1D1E]">Figure 2.</span> Another journal standard figure. All images must have alt text, scale with the text column, and never exceed the content width.
                  </figcaption>
                  <FigureDownload src="/logo-epc.jpeg" filename={`EPC-${article.id}-Figure-2-high-quality.jpeg`} label="Figure 2 · 1600 × 900 · JPEG" />
                </figure>

                <h2>Conclusion</h2>
                <p>Conclude with implications, limitations, and future directions. Keep paragraphs short and scannable.</p>

                <h2>Data Availability</h2>
                <p>Primary data, code, and detailed methods are available in a repository with DOI. State the repository and DOI here.</p>

                <h2>References</h2>
                <p className="text-sm leading-6 text-[#414246]">References follow a consistent style with full journal names or abbreviations as required. Example: Rahman et al., Environ. Process. Chem., 2026, 1, 1-14. DOI links are included.</p>
              </div>

              <div className="mt-8 rounded border border-[#D8D9DA] bg-[#F8F9FA] px-4 py-3 flex flex-wrap gap-2">
                <span className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">Files</span>
                {(article.galleys ?? [{ label: "PDF", url: "#", fileType: "application/pdf" }]).map((g) => (
                  <a
                    key={g.label}
                    href={g.url}
                    target={g.url.startsWith("http") ? "_blank" : undefined}
                    rel={g.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded bg-white border border-[#D8D9DA] px-3 py-1.5 text-xs font-semibold text-[#1C1D1E] hover:bg-white hover:border-[#C2C3C6]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                    {g.label} <span className="font-normal text-[#767676]">{g.fileType ?? "PDF"}</span>
                  </a>
                ))}
              </div>

              <CitationTools article={article} />
            </div>
          </article>

          {/* Right rail - only article relevant tools, no journal wide sidebars */}
          <aside className="space-y-4 lg:sticky lg:top-20">
            <div className="journal-card">
              <div className="journal-card-header">
                <span>Download</span>
              </div>
              <div className="p-3 space-y-2">
                {(article.galleys ?? [{ label: "PDF", url: "#", fileType: "application/pdf" }]).map((g) => (
                  <a
                    key={g.label}
                    href={g.url}
                    target={g.url.startsWith("http") ? "_blank" : undefined}
                    rel={g.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between rounded border border-[#D8D9DA] bg-[#1C1D1E] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#000000]"
                  >
                    <span className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                      {g.label}
                    </span>
                    <span className="text-xs font-normal text-white/80">{g.fileType ?? "PDF"}</span>
                  </a>
                ))}
                <p className="px-1 text-xs leading-4 text-[#767676]">All files are hosted by the journal and available for download.</p>
              </div>
            </div>

            <div className="journal-card">
              <div className="journal-card-header">Article information</div>
              <div className="p-4 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#767676]">Section</span>
                  <span className="font-medium text-right text-[#1C1D1E]">{article.section ?? "Research Articles"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#767676]">Published</span>
                  <span className="font-medium text-[#1C1D1E]">{article.datePublished ? new Date(article.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "2026"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#767676]">Pages</span>
                  <span className="font-medium text-[#1C1D1E]">{article.pages ?? "1-10"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#767676]">Licence</span>
                  <span className="font-medium text-[#1C1D1E]">CC BY 4.0</span>
                </div>
                {article.doi && (
                  <div className="pt-2 border-t border-[#EFEFF0] text-xs break-all">
                    <span className="font-bold text-[#414246]">DOI</span> <a href={doiUrl!} target="_blank" rel="noopener noreferrer" className="text-[#1C1D1E] hover:underline">{article.doi}</a>
                  </div>
                )}
              </div>
            </div>

            <ArticleSideTools article={article} />

            <div className="rounded border border-[#D8D9DA] bg-[#F8F9FA] p-4">
              <p className="text-xs font-bold tracking-widest uppercase text-[#1C1D1E]">Issue</p>
              <p className="mt-1 text-sm font-semibold text-[#1C1D1E]">{article.issueId ? `Issue ${article.issueId}` : "Current Issue"}</p>
              <div className="mt-3 flex gap-2">
                <Link href="/current" className="flex-1 text-center rounded bg-white border border-[#D8D9DA] px-3 py-1.5 text-xs font-semibold text-[#1C1D1E] hover:bg-[#F8F9FA]">
                  View issue
                </Link>
                <Link href="/archives" className="flex-1 text-center rounded bg-[#1C1D1E] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#000000]">
                  All issues
                </Link>
              </div>
            </div>

            <Link href="/current" className="block text-center text-xs font-semibold text-[#1C1D1E] hover:underline underline-offset-4">
              Back to current issue
            </Link>
          </aside>
        </div>
      </div>

      <>
        <meta name="citation_title" content={article.title} />
        {article.authors.map((a, i) => (
          <meta key={i} name="citation_author" content={a.fullName} />
        ))}
        {article.doi && <meta name="citation_doi" content={article.doi} />}
        {article.datePublished && <meta name="citation_publication_date" content={article.datePublished} />}
        <meta name="citation_journal_title" content={siteConfig.name} />
        <meta name="citation_issn" content={siteConfig.issn.online} />
        <meta name="citation_publisher" content={siteConfig.publisher} />
        {doiUrl && <meta name="citation_pdf_url" content={article.galleys?.[0]?.url ?? doiUrl} />}
      </>
    </div>
  );
}
