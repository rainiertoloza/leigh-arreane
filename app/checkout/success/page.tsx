import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order received",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Thank you</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight">The book is on its way to the next page.</h1>
      <p className="mt-5 text-lg text-muted">
        Stripe has confirmed your order. A receipt will arrive by email. If you asked
        for a signed copy separately on Instagram, Leigh will still follow up there.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
