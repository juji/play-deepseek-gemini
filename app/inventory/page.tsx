'use client';

import { useState, useEffect } from 'react';
import { safeParse, array } from 'valibot';
import { InventoryItemSchema, type InventoryItem } from '@/features/inventory/inventorySchema';
import { request } from '@/lib/request';

function BarcodeIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="4" y1="6" x2="4" y2="18" />
      <line x1="6.5" y1="6" x2="6.5" y2="18" />
      <line x1="9" y1="6" x2="9" y2="18" />
      <line x1="12" y1="6" x2="12" y2="18" strokeWidth="2" />
      <line x1="15" y1="6" x2="15" y2="18" strokeWidth="2.5" />
      <line x1="18" y1="6" x2="18" y2="18" />
      <line x1="20" y1="6" x2="20" y2="18" />
    </svg>
  );
}

function BoxesIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7l8-3 8 3-8 3-8-3z" />
      <path d="M4 7v5" />
      <path d="M12 10v5" />
      <path d="M20 7v5" />
      <path d="M4 14l8 3 8-3" />
      <path d="M4 14v5" />
      <path d="M12 17v5" />
      <path d="M20 14v5" />
    </svg>
  );
}

function SatelliteIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10a8 8 0 0 1 16 0" />
      <path d="M8 10a4 4 0 0 1 8 0" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <path d="M12 18v-6" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className="h-4 w-4 text-amber-600 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [connected, setConnected] = useState(true);
  const [editingSku, setEditingSku] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

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
      if (editingSku) {
        await request.put('/api/products', { body: { originalSku: editingSku, ...result.output } });
      } else {
        await request.post('/api/products', { body: result.output, schema: InventoryItemSchema });
      }
      setName('');
      setSku('');
      setQuantity('');
      setEditingSku(null);
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
    <div className="min-h-screen bg-diagonal">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Product Inventory
          </h1>
          <button
            onClick={toggleTheme}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="group rounded-lg border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-black/30">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Unique SKUs</p>
              <BarcodeIcon />
            </div>
            <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {totalSku}
            </p>
          </div>
          <div className="group rounded-lg border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-black/30">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Stock Volume</p>
              <BoxesIcon />
            </div>
            <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {totalStock}
            </p>
          </div>
          <div className="group rounded-lg border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-black/30">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">System Status</p>
              <SatelliteIcon />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${connected ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-red-400'}`}
              />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              {editingSku ? 'Edit Product' : 'Add Product'}
            </h2>
            {editingSku && (
              <button
                type="button"
                onClick={() => {
                  setEditingSku(null);
                  setName('');
                  setSku('');
                  setQuantity('');
                  setErrors({});
                }}
                className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                Cancel
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-4">
            <div>
              <input
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <input
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              {errors.sku && <p className="mt-1 text-xs text-red-500">{errors.sku}</p>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
              style={!submitting ? { animation: 'pulse-ring 2s infinite' } : undefined}
            >
              <PlusIcon />
              {submitting ? 'Saving...' : editingSku ? 'Update' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-zinc-100 px-6 py-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <span>Item Name</span>
            <span>SKU</span>
            <span className="text-right">Quantity</span>
            <span className="w-16" />
          </div>
          {items.map((item, i) => {
            const lowStock = item.quantity < 5;
            return (
              <div
                key={`${item.sku}-${i}`}
                className={`group grid grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-zinc-100 px-6 py-3 text-sm last:border-0 items-center dark:border-zinc-800 ${lowStock ? 'text-amber-700 dark:text-amber-400' : ''}`}
              >
                <span
                  className={
                    lowStock
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }
                >
                  {item.name}
                </span>
                <span>
                  <span className="inline-block rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                    {item.sku}
                  </span>
                </span>
                <span
                  className={`flex items-center gap-1.5 text-right font-medium tabular-nums ${lowStock ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-700 dark:text-zinc-300'}`}
                >
                  {lowStock && <WarningIcon />}
                  {item.quantity}
                </span>
                <span className="flex w-16 items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    title="Edit"
                    onClick={() => {
                      setEditingSku(item.sku);
                      setName(item.name);
                      setSku(item.sku);
                      setQuantity(String(item.quantity));
                      setErrors({});
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                    title="Delete"
                    onClick={async () => {
                      try {
                        await request.delete('/api/products', { body: { sku: item.sku } });
                        setItems((prev) => prev.filter((p) => p.sku !== item.sku));
                      } catch {
                        setConnected(false);
                      }
                    }}
                  >
                    <TrashIcon />
                  </button>
                </span>
              </div>
            );
          })}
          {items.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              No products yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
