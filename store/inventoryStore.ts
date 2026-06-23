'use client';

import { create } from 'zustand';
import { array } from 'valibot';
import { InventoryItemSchema, type InventoryItem } from '@/features/inventory/inventorySchema';
import { request } from '@/lib/request';

type InventoryState = {
  items: InventoryItem[];
  connected: boolean;
  loading: boolean;
  fetchItems: () => Promise<void>;
  addItem: (item: InventoryItem) => void;
  removeItem: (sku: string) => void;
  updateItem: (originalSku: string, item: InventoryItem) => void;
  revertItems: (items: InventoryItem[]) => void;
  setConnected: (v: boolean) => void;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  connected: true,
  loading: true,
  fetchItems: async () => {
    try {
      const data = await request.get<InventoryItem[]>('/api/products', {
        schema: array(InventoryItemSchema),
      });
      set({ items: data, connected: true, loading: false });
    } catch {
      set({ connected: false, loading: false });
    }
  },
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (sku) => set((s) => ({ items: s.items.filter((i) => i.sku !== sku) })),
  updateItem: (originalSku, item) =>
    set((s) => ({
      items: s.items.map((i) => (i.sku === originalSku ? item : i)),
    })),
  revertItems: (items) => set({ items }),
  setConnected: (v) => set({ connected: v }),
}));
