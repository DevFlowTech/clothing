import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  stock: number;
  savedAt: number;
}

interface SavedForLaterStore {
  items: SavedItem[];
  addItem: (item: Omit<SavedItem, "savedAt">) => void;
  removeItem: (productId: string) => void;
  moveToCart: (productId: string) => SavedItem | null;
  clearAll: () => void;
  getItemCount: () => number;
}

export const useSavedForLaterStore = create<SavedForLaterStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Check if item already exists
          const exists = state.items.some(
            (i) => i.productId === item.productId,
          );
          if (exists) return state;

          return {
            items: [...state.items, { ...item, savedAt: Date.now() }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      moveToCart: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (item) {
          get().removeItem(productId);
          return item;
        }
        return null;
      },
      clearAll: () => set({ items: [] }),
      getItemCount: () => get().items.length,
    }),
    {
      name: "saved-for-later-storage",
    },
  ),
);
