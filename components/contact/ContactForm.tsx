"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!String(data.email).includes("@") || String(data.message).length < 8) {
      setStatus("error");
      setMessage("Please add a valid email and a short message.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setMessage("Received. I’ll write back as soon as I can.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Email leigharreane@gmail.com instead.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
          Name
        </label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
          Message
        </label>
        <Textarea id="message" name="message" required minLength={8} />
      </div>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
      {message ? (
        <p
          role="status"
          className={status === "error" ? "text-sm text-red-700" : "text-sm text-accent"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
