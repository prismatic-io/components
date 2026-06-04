export interface LineItemProperties {
  createdate: string;
  hs_lastmodifieddate: string;
  hs_object_id: number;
  name: string;
  hs_sku?: string;
}

export interface LineItem {
  id: number;
  properties: LineItemProperties;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
