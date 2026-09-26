"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export function CartHydration() {
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);
  return null;
}
