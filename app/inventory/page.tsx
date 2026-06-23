'use client';

import { useState, useEffect, useRef } from 'react';
import { safeParse } from 'valibot';
import { InventoryItemSchema, type InventoryItem } from '@/features/inventory/inventorySchema';
import { useInventoryStore } from '@/store/inventoryStore';
import { request } from '@/lib/request';

function BarcodeIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#94A3B8]"
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

function PackagesIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#94A3B8]"
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
      className="h-5 w-5 text-[#94A3B8]"
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

function WarningTriangle() {
  return (
    <svg
      style={{ fontSize: 14, verticalAlign: -1, marginRight: 4 }}
      width="14"
      height="14"
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

function PencilIcon() {
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

function AlertCircleIcon() {
  return (
    <svg
      className="inline-block h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function InventoryPage() {
  const {
    items,
    connected,
    loading,
    fetchItems,
    addItem,
    removeItem,
    updateItem,
    revertItems,
    setConnected,
  } = useInventoryStore();
  const [itemName, setItemName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [editingSku, setEditingSku] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

  const totalSku = items.length;
  const totalStock = items.reduce((sum, i) => sum + i.quantity, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = safeParse(InventoryItemSchema, {
      itemName,
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
    const prevItems = [...items];
    const newItem = result.output;

    try {
      if (editingSku) {
        await request.put('/api/products', { body: { originalSku: editingSku, ...newItem } });
        updateItem(editingSku, newItem);
      } else {
        addItem(newItem);
        await request.post('/api/products', { body: newItem });
      }
      setItemName('');
      setSku('');
      setQuantity('');
      setEditingSku(null);
    } catch {
      revertItems(prevItems);
      setConnected(false);
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(item: InventoryItem) {
    setEditingSku(item.sku);
    setItemName(item.itemName);
    setSku(item.sku);
    setQuantity(String(item.quantity));
    setErrors({});
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingSku(null);
    setItemName('');
    setSku('');
    setQuantity('');
    setErrors({});
  }

  async function handleDelete(sku: string) {
    const prevItems = [...items];
    removeItem(sku);
    try {
      await request.delete('/api/products', { body: { sku } });
    } catch {
      revertItems(prevItems);
      setConnected(false);
    }
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: '#0F172A' }}>
              Product Inventory
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#10B981] dot-pulse" />
              <span style={{ fontSize: 13, color: '#64748B' }}>Warehouse ops · Live</span>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="theme-btn rounded-lg border p-2 transition-colors"
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="card-metric">
            <div className="flex items-start justify-between">
              <span className="metric-label">Unique SKUs</span>
              <BarcodeIcon />
            </div>
            <p className="metric-value">{totalSku}</p>
          </div>
          <div className="card-metric">
            <div className="flex items-start justify-between">
              <span className="metric-label">Stock Volume</span>
              <PackagesIcon />
            </div>
            <p className="metric-value">{totalStock}</p>
          </div>
          <div className="card-metric relative">
            <div className="flex items-start justify-between">
              <span className="metric-label">System Status</span>
              <SatelliteIcon />
            </div>
            <p className="metric-value">{totalSku > 0 ? totalSku : '—'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="inline-block h-[6px] w-[6px] rounded-full"
                style={{ backgroundColor: connected ? '#10B981' : '#EF4444' }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#64748B',
                }}
              >
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        <div
          ref={formRef}
          className="card-surface mt-6 rounded-xl border p-6"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>
              {editingSku ? 'Edit Product' : 'Add Product'}
            </h2>
            {editingSku && (
              <button
                type="button"
                onClick={cancelEdit}
                style={{ fontSize: 13, color: '#64748B' }}
                className="hover:underline transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <div>
              <input
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="input-field"
              />
              {errors.itemName && (
                <p className="error-text">
                  <AlertCircleIcon /> {errors.itemName}
                </p>
              )}
            </div>
            <div>
              <input
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                className="input-field"
              />
              {errors.sku && (
                <p className="error-text">
                  <AlertCircleIcon /> {errors.sku}
                </p>
              )}
            </div>
            <div>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-field"
              />
              {errors.quantity && (
                <p className="error-text">
                  <AlertCircleIcon /> {errors.quantity}
                </p>
              )}
            </div>
            <button type="submit" disabled={submitting} className="btn-primary">
              <PlusIcon />
              {submitting ? 'Saving...' : editingSku ? 'Save changes' : 'Add Product'}
            </button>
          </form>
        </div>

        <div
          className="card-surface mt-6 rounded-xl border overflow-hidden"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)' }}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th className="data-th">Item Name</th>
                <th className="data-th">SKU</th>
                <th className="data-th text-right">Quantity</th>
                <th className="data-th w-20" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm" style={{ color: '#94A3B8' }}>
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm" style={{ color: '#94A3B8' }}>
                    No products yet.
                  </td>
                </tr>
              ) : (
                items.map((item, i) => {
                  const lowStock = item.quantity <= 3;
                  return (
                    <tr
                      key={item.sku}
                      className="data-row"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <td className="data-td">{item.itemName}</td>
                      <td className="data-td">
                        <span className="sku-chip">{item.sku}</span>
                      </td>
                      <td
                        className={`data-td text-right font-medium ${lowStock ? 'low-stock-qty' : ''}`}
                      >
                        {lowStock && <WarningTriangle />}
                        {item.quantity}
                      </td>
                      <td className="data-td">
                        <div className="row-actions">
                          <button
                            className="btn-icon btn-icon-edit"
                            title="Edit"
                            onClick={() => startEdit(item)}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            className="btn-icon btn-icon-delete"
                            title="Delete"
                            onClick={() => handleDelete(item.sku)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .dot-pulse { animation: dotPulse 2s ease-in-out infinite; }

        @keyframes rowFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .data-row { animation: rowFadeIn 200ms ease-out both; }

        .card-metric {
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          background: white;
          padding: 20px 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
          transition: all 150ms ease;
        }
        .card-metric:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .metric-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #64748B;
        }
        .metric-value {
          margin-top: 4px;
          font-size: 32px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: #0F172A;
        }

        .input-field {
          width: 100%;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          padding: 8px 12px;
          font-size: 14px;
          color: #334155;
          outline: none;
          transition: outline 150ms ease;
          background: white;
        }
        .input-field:focus {
          outline: 2px solid #4F46E5;
          outline-offset: 2px;
        }
        .input-field::placeholder { color: #94A3B8; }

        .error-text {
          margin-top: 4px;
          font-size: 12px;
          color: #DC2626;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #4F46E5;
          color: white;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 500;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 150ms ease;
          white-space: nowrap;
        }
        .btn-primary:hover:not(:disabled) {
          background: #4338CA;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(79,70,229,0.4);
        }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.5; cursor: default; }

        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        .data-th {
          background: #F8FAFC;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #E2E8F0;
        }
        .data-th.text-right { text-align: right; }
        .data-td {
          padding: 14px 16px;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #F1F5F9;
        }
        .data-row:last-child .data-td { border-bottom: none; }
        .data-row:hover { background: #F8FAFC; }

        .sku-chip {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 12px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 2px 8px;
          color: #334155;
        }

        .low-stock-qty {
          font-weight: 600;
        }

        .row-actions {
          display: flex;
          gap: 2px;
          justify-content: flex-end;
          opacity: 0;
          pointer-events: none;
          transition: opacity 150ms ease;
        }
        .data-row:hover .row-actions {
          opacity: 1;
          pointer-events: auto;
        }

        .btn-icon {
          padding: 4px 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 150ms ease;
        }
        .btn-icon-edit { color: #64748B; }
        .btn-icon-edit:hover { background: #F1F5F9; }
        .btn-icon-delete { color: #94A3B8; }
        .btn-icon-delete:hover { background: #FEF2F2; color: #EF4444; }

        [data-theme="dark"] .card-metric {
          background: #1E293B;
          border-color: #334155;
        }
        [data-theme="dark"] .metric-value { color: #F1F5F9; }
        [data-theme="dark"] .input-field {
          background: #1E293B;
          border-color: #334155;
          color: #F1F5F9;
        }
        [data-theme="dark"] .input-field::placeholder { color: #64748B; }
        [data-theme="dark"] .data-th {
          background: #1E293B;
          color: #64748B;
          border-bottom-color: #334155;
        }
        [data-theme="dark"] .data-td {
          color: #F1F5F9;
          border-bottom-color: #1E293B;
        }
        [data-theme="dark"] .data-row:hover { background: #263044; }
        [data-theme="dark"] .sku-chip {
          background: #0F172A;
          border-color: #334155;
          color: #F1F5F9;
        }
        [data-theme="dark"] .btn-icon-edit { color: #94A3B8; }
        [data-theme="dark"] .btn-icon-edit:hover { background: #263044; }
        [data-theme="dark"] .btn-icon-delete { color: #64748B; }
        [data-theme="dark"] .btn-icon-delete:hover { background: #3B1C1C; color: #EF4444; }
        [data-theme="dark"] .btn-primary:hover:not(:disabled) {
          box-shadow: 0 4px 14px rgba(79,70,229,0.6);
        }
        [data-theme="dark"] .low-stock-qty { color: #D97706 !important; }
        .bg-page {
          background: repeating-linear-gradient(45deg, #F1F5F9, #F1F5F9 12px, #E8EDF2 12px, #E8EDF2 13px), linear-gradient(to bottom, #F8FAFC, #F1F5F9);
        }
        [data-theme="dark"] .bg-page {
          background: repeating-linear-gradient(45deg, #0F172A, #0F172A 12px, #131C31 12px, #131C31 13px), linear-gradient(to bottom, #0F172A, #0B1222);
        }
        [data-theme="dark"] h1, [data-theme="dark"] h2 { color: #F1F5F9 !important; }
        .card-surface {
          background: white;
          border-color: #E2E8F0;
        }
        [data-theme="dark"] .card-surface {
          background: #1E293B;
          border-color: #334155;
        }

        .theme-btn {
          border-color: #E2E8F0;
          color: #64748B;
          background: transparent;
        }
        .theme-btn:hover { background: #F1F5F9; }
        [data-theme="dark"] .theme-btn {
          border-color: #334155;
          color: #94A3B8;
        }
        [data-theme="dark"] .theme-btn:hover { background: #263044; }
        [data-theme="dark"] .dot-pulse { background-color: #10B981 !important; }
      `}</style>
    </div>
  );
}
