import { object, string, number, pipe, minValue, regex, type InferOutput } from 'valibot';

export const InventoryItemSchema = object({
  name: string(),
  sku: pipe(string(), regex(/^[a-zA-Z0-9]+$/)),
  quantity: pipe(number(), minValue(1)),
});

export type InventoryItem = InferOutput<typeof InventoryItemSchema>;
