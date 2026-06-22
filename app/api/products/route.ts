import { safeParse } from 'valibot';
import { InventoryItemSchema, type InventoryItem } from '@/features/inventory/inventorySchema';

const products: InventoryItem[] = [
  { name: 'Widget Alpha', sku: 'WDG001', quantity: 42 },
  { name: 'Gadget Beta', sku: 'GDT002', quantity: 7 },
  { name: 'Component Gamma', sku: 'CMP003', quantity: 3 },
  { name: 'sdfg', sku: 'SDFG004', quantity: 1 },
];

export async function GET() {
  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = safeParse(InventoryItemSchema, body);

  if (!result.success) {
    return Response.json({ error: 'Validation failed', issues: result.issues }, { status: 400 });
  }

  products.push(result.output);
  return Response.json(result.output, { status: 201 });
}
