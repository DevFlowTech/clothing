"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.size === item.size &&
            i.color === item.color,
        );

        if (existingIndex > -1) {
          const newItems = [...items];
          const newQuantity =
            newItems[existingIndex].quantity + (item.quantity || 1);
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: Math.min(newQuantity, item.stock),
          };
          set({ items: newItems, isOpen: true });
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.size === size &&
                i.color === color
              ),
          ),
        });
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, size, color);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "devflow-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
