"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getCartSubtotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const items = useCart((s) => s.items);
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = getCartSubtotal(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (!open ? closeCart() : null)}>
      <SheetContent title="Your bag">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {items.length === 0 ? (
              <p className="text-muted">Your bag is empty. The debut is waiting.</p>
            ) : (
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative size-20 overflow-hidden rounded-xl bg-accent-soft">
                      <Image
                        src={item.coverImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item.title}</p>
                      <p className="text-xs uppercase tracking-[0.14em] text-muted">
                        {item.formatLabel}
                      </p>
                      <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-line p-1"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          className="rounded-full border border-line p-1"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="ml-auto rounded-full p-1 text-muted hover:text-ink"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-line px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <Button asChild variant="ink" className="w-full" disabled={items.length === 0}>
              <Link href="/cart" onClick={closeCart}>
                View bag & checkout
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
