import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation not configured." }, { status: 503 });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret");

  if (token !== secret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const paths: string[] = Array.isArray(body.paths) ? body.paths : ["/", "/current", "/archives"];

  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch (e) {
      console.error("[revalidate] failed for", p, e);
    }
  }

  // Also revalidate article pages if ids provided
  if (Array.isArray(body.articleIds)) {
    for (const id of body.articleIds) {
      try {
        revalidatePath(`/articles/${id}`);
      } catch {}
    }
  }

  return NextResponse.json({ revalidated: true, paths });
}

// Allow GET for manual testing with secret in query
export async function GET(req: Request) {
  return POST(req);
}
