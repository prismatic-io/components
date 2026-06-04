export interface ShopifyWebhook {
  id: number;
  address: string;
  topic: string;
  created_at: string;
  updated_at: string;
  format: "json" | "xml";
  fields: string[];
  metafield_namespaces: string[];
  api_version: string;
  private_metafield_namespaces: string[];
}
