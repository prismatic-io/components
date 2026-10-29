export interface DataSourceRecord {
  id: string;
  name?: string;
  title?: string;
  email?: string;
}

export interface InventoryItemNode {
  id: string;
  sku: string | null;
}

export interface ProductImageNode {
  id: string;
  alt: string | null;
}

export interface FulfillmentServiceRecord {
  id: string;
  serviceName: string;
}
