"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", reason: "General inquiry", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send. Please try again or email editors@epc-journal.org.");
      setStatus("sent");
      setForm({ name: "", email: "", reason: "General inquiry", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-semibold text-emerald-900">Message sent</p>
        <p className="mt-1 text-sm text-emerald-800">Thank you. The editorial office will reply within 3 business days.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 inline-flex rounded border border-emerald-300 bg-white px-3 py-1 text-sm font-medium text-emerald-900 hover:bg-emerald-100"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-bold">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="mt-1 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#005274] focus:ring-1 focus:ring-[#005274]/20"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-bold">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@university.edu"
            className="mt-1 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#005274] focus:ring-1 focus:ring-[#005274]/20"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] font-bold">Reason</span>
        <select
          value={form.reason}
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
          className="mt-1 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#005274] focus:ring-1 focus:ring-[#005274]/20"
        >
          <option>General inquiry</option>
          <option>Submission question</option>
          <option>Reviewer interest</option>
          <option>Editorial board interest</option>
          <option>Technical issue</option>
          <option>Other</option>
        </select>
      </label>

      <label className="block">
        <span className="text-[11px] font-bold">Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="How can we help?"
          className="mt-1 w-full rounded border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#005274] focus:ring-1 focus:ring-[#005274]/20"
        />
      </label>

      {status === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary text-sm disabled:opacity-60"
      >
        {status === "sending" ? "Sending" : "Send message"}
      </button>

      <p className="text-xs text-muted-foreground">By submitting, you agree we may contact you about your inquiry. No marketing. Data handled per privacy policy.</p>
    </form>
  );
}
