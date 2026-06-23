import { safeParse } from 'valibot';
import { InventoryItemSchema, type InventoryItem } from '@/features/inventory/inventorySchema';

const products: InventoryItem[] = [
  { itemName: 'Widget Alpha', sku: 'WDG001', quantity: 42 },
  { itemName: 'Gadget Beta', sku: 'GDT002', quantity: 7 },
  { itemName: 'Component Gamma', sku: 'CMP003', quantity: 3 },
  { itemName: 'Hydraulic Valve', sku: 'HYD005', quantity: 15 },
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

export async function PUT(request: Request) {
  const body = await request.json();
  const { originalSku, ...item } = body;
  const result = safeParse(InventoryItemSchema, item);
  if (!result.success) {
    return Response.json({ error: 'Validation failed', issues: result.issues }, { status: 400 });
  }
  const idx = products.findIndex((p) => p.sku === originalSku);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  products[idx] = result.output;
  return Response.json(result.output);
}

export async function DELETE(request: Request) {
  const { sku } = await request.json();
  const idx = products.findIndex((p) => p.sku === sku);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  const removed = products.splice(idx, 1)[0];
  return Response.json(removed);
}
