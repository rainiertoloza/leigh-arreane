import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your bag — Dreams We Once Lost and other editions.",
};

export default function CartRoute() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-5xl tracking-tight">Your bag</h1>
      <div className="mt-10">
        <CartPage />
      </div>
    </div>
  );
}
