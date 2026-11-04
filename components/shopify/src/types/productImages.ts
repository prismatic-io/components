export interface ProductImage {
  id: string | null;
  alt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  image: {
    width: number | null;
    height: number | null;
    url: string | null;
  } | null;
}

export interface RestProductImage {
  id: number | null;
  alt: string | null;
  position: number;
  product_id: number;
  created_at: string | null;
  updated_at: string | null;
  admin_graphql_api_id: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
}
