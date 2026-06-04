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
