import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CompareProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

interface CompareStore {
  items: CompareProduct[];
  isOpen: boolean;
  addItem: (product: CompareProduct) => void;
  removeItem: (productId: string) => void;
  clearCompare: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const items = get().items;
        if (items.length >= 4) {
          // Max 4 items
          return;
        }
        if (!items.some((i) => i.id === product.id)) {
          set({ items: [...items, product], isOpen: true });
        }
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),
      clearCompare: () => set({ items: [], isOpen: false }),
      setIsOpen: (isOpen) => set({ isOpen }),
      isInCompare: (productId) => get().items.some((i) => i.id === productId),
    }),
    {
      name: "compare-storage",
    },
  ),
);
