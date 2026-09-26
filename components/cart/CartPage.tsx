"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getCartCount, getCartSubtotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export function CartPage() {
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const subtotal = getCartSubtotal(items);

  async function checkout() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            slug: item.slug,
            format: item.format,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Checkout is not available yet. Add Stripe test keys to .env.local.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!hasHydrated) {
    return <p className="text-muted">Loading your bag…</p>;
  }

  if (items.length === 0) {
    return (
      <div>
        <p className="text-muted">Your bag is empty.</p>
        <Button asChild className="mt-6">
          <Link href="/books">Browse books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <ul className="space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 rounded-[1.3rem] border border-line bg-paper p-4"
          >
            <div className="relative size-24 overflow-hidden rounded-xl">
              <Image src={item.coverImage} alt="" fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl">{item.title}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {item.formatLabel}
              </p>
              <p className="mt-1">{formatPrice(item.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm text-muted">
                  Qty
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                    className="ml-2 w-16 rounded-full border border-line bg-background px-3 py-1"
                  />
                </label>
                <button
                  type="button"
                  className="text-sm text-muted underline underline-offset-4"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-[1.4rem] border border-line bg-paper p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Summary</p>
        <p className="mt-3 flex justify-between text-sm">
          <span>{getCartCount(items)} items</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <p className="mt-2 flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <Button
          className="mt-6 w-full"
          variant="ink"
          onClick={checkout}
          disabled={loading}
        >
          {loading ? "Redirecting…" : "Checkout with Stripe"}
        </Button>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        <p className="mt-3 text-xs text-muted">
          Stripe Checkout in test mode. Shipping is collected on the Stripe page when keys are set.
        </p>
      </aside>
    </div>
  );
}
