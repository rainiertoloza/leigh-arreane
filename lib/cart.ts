"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookFormatType } from "./books";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  format: BookFormatType;
  formatLabel: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      addItem: (item, quantity = 1) => {
        const id = `${item.slug}:${item.format}`;
        const existing = get().items.find((line) => line.id === id);
        if (existing) {
          set({
            items: get().items.map((line) =>
              line.id === id
                ? { ...line, quantity: line.quantity + quantity }
                : line,
            ),
            isOpen: true,
          });
          return;
        }
        set({
          items: [...get().items, { ...item, id, quantity }],
          isOpen: true,
        });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((line) => line.id !== id) }),
      setQuantity: (id, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((line) => line.id !== id) });
          return;
        }
        set({
          items: get().items.map((line) =>
            line.id === id ? { ...line, quantity } : line,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "leigh-arreane-cart",
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function getCartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
