"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setMessage("You’re on the list. I’ll write when there is something worth opening.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again in a moment.");
    }
  }

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:items-center md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent-soft">
            Letters from the desk
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            New pages, new paintings, the occasional moon.
          </h2>
          <p className="mt-4 max-w-md text-paper/70 leading-relaxed">
            A quiet list for readers who want first word on signed copies, studio notes, and whatever comes after the debut.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="bg-paper/95"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={status === "loading"}
              className="shrink-0"
            >
              {status === "loading" ? "Sending…" : "Join the list"}
            </Button>
          </div>
          {message ? (
            <p
              role="status"
              className={
                status === "error" ? "text-sm text-red-300" : "text-sm text-accent-soft"
              }
            >
              {message}
            </p>
          ) : (
            <p className="text-xs text-paper/45">No spam. Letters only when there is something worth opening.</p>
          )}
        </form>
      </div>
    </section>
  );
}
