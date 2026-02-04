import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RecentlyViewedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  viewedAt: number;
}

interface RecentlyViewedStore {
  products: RecentlyViewedProduct[];
  addProduct: (product: Omit<RecentlyViewedProduct, "viewedAt">) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => {
          // Remove if already exists
          const filtered = state.products.filter((p) => p.id !== product.id);

          // Add to beginning with timestamp
          const updated = [
            { ...product, viewedAt: Date.now() },
            ...filtered,
          ].slice(0, 12); // Keep max 12 items

          return { products: updated };
        }),
      clearAll: () => set({ products: [] }),
    }),
    {
      name: "recently-viewed-storage",
    },
  ),
);
