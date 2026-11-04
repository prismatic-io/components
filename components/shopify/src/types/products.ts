interface ProductVariant {
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
}

interface ProductOption {
  id: string | null;
  name: string | null;
  position: number | null;
  values: string[] | null;
}

interface ProductMediaImage {
  width: number | null;
  height: number | null;
  url: string | null;
  src: string | null;
  id: string | null;
}

interface ProductMedia {
  id: string | null;
  alt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  image: ProductMediaImage | null;
}

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
    nodes: ProductVariant[];
  };
  options: ProductOption[] | null;

  media: {
    nodes: ProductMedia[];
  };
}

interface RestProductVariant {
  id: number | null;
  product_id: number | null;
  title: string | null;
  price: string | null;
  position: number | null;
  inventory_policy: string | null;
  compare_at_price: string | null;
  created_at: string | null;
  updated_at: string | null;
  taxable: boolean | null;
  barcode: string | null;
  requires_shipping: boolean | null;
  sku: string | null;
  weight: number | null;
  weight_unit: string | null;
  inventory_item_id: number | null;
  inventory_quantity: number | null;
  image_url: string | null;
  admin_graphql_api_id: string | null;
}

interface RestProductOption {
  id: number | null;
  product_id: number | null;
  name: string | null;
  position: number | null;
  values: string[] | null;
}

interface RestProductMedia {
  id: number | null;
  alt: string | null;
  position: number;
  product_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  admin_graphql_api_id: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  variant_ids: number[];
}

interface RestProductFeaturedImage {
  id: number | null;
  alt: string | null;
  product_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  admin_graphql_api_id: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  variant_ids: number[];
}

export interface RestProduct {
  id: number | null;
  title: string | null;
  body_html: string | null;
  vendor: string | null;
  product_type: string | null;
  created_at: string | null;
  handle: string | null;
  updated_at: string | null;
  published_at: string | null;
  template_suffix: string | null;
  tags: string | null;
  status: string;
  admin_graphql_api_id: string | null;
  variants: RestProductVariant[];
  options: RestProductOption[];
  images: RestProductMedia[];
  image: RestProductFeaturedImage | null;
}
