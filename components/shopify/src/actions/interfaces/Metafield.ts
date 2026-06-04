export interface Metafield {
  key: string;
  value: string;
  type: string;
  namespace: string;
  description: string | null;
  jsonValue: string;
  createdAt: string;
  updatedAt: string;
  productId: string | undefined;
}
