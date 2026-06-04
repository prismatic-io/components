export interface ProductProperties {
  createdate: string;
  hs_lastmodifieddate: string;
  hs_object_id: number;
  name: string;
  description: string;
  price: string;
  hs_sku?: string;
}

export interface Product {
  id: number;
  properties: ProductProperties;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
