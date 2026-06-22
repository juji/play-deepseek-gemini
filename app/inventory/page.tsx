'use client';

import { useState, useEffect } from 'react';
import { safeParse, array } from 'valibot';
import { InventoryItemSchema, type InventoryItem } from '@/features/inventory/inventorySchema';
import { request } from '@/lib/request';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    request
      .get<InventoryItem[]>('/api/products', { schema: array(InventoryItemSchema) })
      .then((data) => {
        setItems(data);
        setConnected(true);
      })
      .catch(() => setConnected(false));
  }, []);

  const totalSku = items.length;
  const totalStock = items.reduce((sum, i) => sum + i.quantity, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = safeParse(InventoryItemSchema, {
      name,
      sku,
      quantity: quantity ? parseFloat(quantity) : undefined,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.issues) {
        const path = (issue.path?.[0]?.key as string) ?? 'form';
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await request.post('/api/products', { body: result.output, schema: InventoryItemSchema });
      setName('');
      setSku('');
      setQuantity('');
      const updated = await request.get<InventoryItem[]>('/api/products', {
        schema: array(InventoryItemSchema),
      });
      setItems(updated);
    } catch {
      setConnected(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Product Inventory</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Total Unique SKUs</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-900">{totalSku}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Total Stock Volume</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-900">{totalStock}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">System Status</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${connected ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-red-400'}`}
              />
              <span className="text-sm font-medium text-zinc-700">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-medium text-zinc-900">Add Product</h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-4">
            <div>
              <input
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-black/5 transition-all outline-none"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <input
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-black/5 transition-all outline-none"
              />
              {errors.sku && <p className="mt-1 text-xs text-red-500">{errors.sku}</p>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-black/5 transition-all outline-none"
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white">
          <div className="grid grid-cols-3 gap-4 border-b border-zinc-100 px-6 py-3 text-sm font-medium text-zinc-500">
            <span>Item Name</span>
            <span>SKU</span>
            <span className="text-right">Quantity</span>
          </div>
          {items.map((item, i) => (
            <div
              key={`${item.sku}-${i}`}
              className="grid grid-cols-3 gap-4 border-b border-zinc-100 px-6 py-4 text-sm last:border-0"
            >
              <span className="text-zinc-900">{item.name}</span>
              <span className="text-zinc-400">{item.sku}</span>
              <span
                className={`text-right font-medium tabular-nums ${item.quantity < 5 ? 'text-amber-600' : 'text-zinc-900'}`}
              >
                {item.quantity}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-zinc-400">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
