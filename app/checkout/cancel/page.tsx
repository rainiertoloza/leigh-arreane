import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout canceled",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl tracking-tight">Checkout paused</h1>
      <p className="mt-5 text-lg text-muted">
        Nothing was charged. Your bag is still here whenever you are ready.
      </p>
      <Button asChild className="mt-8">
        <Link href="/cart">Return to bag</Link>
      </Button>
    </div>
  );
}
