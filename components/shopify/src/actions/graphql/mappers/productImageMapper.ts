import { getNumericId } from "../../../util";
import type { ProductImage } from "../../interfaces/ProductImage";

export const productImageMapper = (
  productImage: ProductImage,
  productId: number,
  position: number,
) => ({
  id: productImage.id ? getNumericId(productImage.id) : undefined,
  alt: productImage.alt,
  position,
  product_id: productId,
  created_at: productImage.createdAt,
  updated_at: productImage.updatedAt,
  admin_graphql_api_id: productImage.id,
  width: productImage.image?.width ?? null,
  height: productImage.image?.height ?? null,
  src: productImage.image?.url,
});
