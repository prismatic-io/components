export interface Product {
  id: string | null;
  title: string | null;
  descriptionHtml: string | null;
  vendor: string | null;
  productType: string | null;
  createdAt: string | null;
  handle: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  templateSuffix: string | null;
  tags: string[] | null;
  status: string | null;
  variants: {
    nodes: {
      id: string | null;
      title: string | null;
      price: string | null;
      position: number | null;
      inventoryPolicy: string | null;
      compareAtPrice: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      taxable: boolean | null;
      barcode: string | null;
      inventoryItem: {
        id: string | null;
        measurement: {
          weight: {
            value: number | null;
            unit: string | null;
          };
        } | null;
        requiresShipping: boolean | null;
      } | null;
      inventoryQuantity: number | null;
      sku: string | null;
      image: { id: string | null; url: string | null } | null;
    }[];
  };
  options:
    | {
        id: string | null;
        name: string | null;
        position: number | null;
        values: string[] | null;
      }[]
    | null;

  media: {
    nodes: {
      id: string | null;
      alt: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      image: {
        width: number | null;
        height: number | null;
        url: string | null;
        src: string | null;
        id: string | null;
      } | null;
    }[];
  };
}
