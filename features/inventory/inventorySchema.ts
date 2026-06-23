import { object, string, number, pipe, minValue, regex, nonEmpty, type InferOutput } from 'valibot';

export const InventoryItemSchema = object({
  itemName: pipe(string(), nonEmpty('Item name is required')),
  sku: pipe(string(), regex(/^[A-Z0-9]+$/, 'SKU must be alphanumeric and uppercase')),
  quantity: pipe(number(), minValue(1, 'Quantity must be at least 1')),
});

export type InventoryItem = InferOutput<typeof InventoryItemSchema>;
