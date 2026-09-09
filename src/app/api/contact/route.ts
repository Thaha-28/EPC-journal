import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const reason = String(body.reason ?? "General inquiry").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    const to = process.env.CONTACT_FORM_EMAIL_TO || "editors@epc-journal.org";
    const providerKey = process.env.EMAIL_PROVIDER_API_KEY;

    // If no provider key is configured, log and pretend success in development.
    // This keeps the contact form usable before SMTP or provider is set up,
    // per PRD 6.4 simple serverless option.
    if (!providerKey) {
      console.log("[contact] Would send to", to, { name, email, reason, message: message.slice(0, 200) });
      return NextResponse.json({ ok: true, delivered: false, note: "Logged only. Configure EMAIL_PROVIDER_API_KEY to deliver." });
    }

    // Generic delivery placeholder. Replace with your provider:
    // Postmark, SES, Resend, SendGrid, etc. This example uses a generic HTTP POST
    // if EMAIL_PROVIDER_API_KEY is set and EMAIL_PROVIDER_URL is optionally set.
    const providerUrl = process.env.EMAIL_PROVIDER_URL;

    if (providerUrl) {
      const res = await fetch(providerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${providerKey}`,
        },
        body: JSON.stringify({
          to,
          from: process.env.CONTACT_FORM_FROM || "noreply@epc-journal.org",
          subject: `[EPC Contact] ${reason} from ${name}`,
          text: `From: ${name} <${email}>\nReason: ${reason}\n\n${message}`,
          replyTo: email,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[contact] provider error", res.status, text);
        return NextResponse.json({ error: "Email provider rejected the request." }, { status: 502 });
      }
    } else {
      // No provider URL configured but key exists. Log as pending integration.
      console.log("[contact] EMAIL_PROVIDER_API_KEY set but no EMAIL_PROVIDER_URL. Logging.", { to, name, email, reason });
    }

    return NextResponse.json({ ok: true, delivered: Boolean(providerUrl) });
  } catch (err) {
    console.error("[contact] unexpected", err);
    return NextResponse.json({ error: "Unexpected error. Please email editors@epc-journal.org directly." }, { status: 500 });
  }
}
