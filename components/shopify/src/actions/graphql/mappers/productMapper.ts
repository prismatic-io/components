import { getNumericId } from "../../../util";
import type { Product } from "../../interfaces/Product";

export const productMapper = (product: Product) => {
  const productId = product.id ? getNumericId(product.id) : null;
  const firstImage = product.media.nodes[0] || null;
  const variantsMapping: Record<string, number[]> = {};
  const variants = product.variants.nodes.map((variant) => {
    const imageUrl = variant.image?.url ?? null;
    const id = variant.id ? getNumericId(variant.id) : null;
    if (imageUrl !== null) {
      if (!variantsMapping[imageUrl]) {
        variantsMapping[imageUrl] = [];
      }
      variantsMapping[imageUrl].push(id);
    }

    return {
      id,
      product_id: productId,
      title: variant.title,
      price: variant.price,
      position: variant.position,
      inventory_policy: variant.inventoryPolicy,
      compare_at_price: variant.compareAtPrice,
      created_at: variant.createdAt,
      updated_at: variant.updatedAt,
      taxable: variant.taxable,
      barcode: variant.barcode,
      requires_shipping: variant.inventoryItem?.requiresShipping ?? null,
      sku: variant.sku,
      weight: variant.inventoryItem?.measurement?.weight?.value ?? null,
      weight_unit: variant.inventoryItem?.measurement?.weight?.unit ?? null,
      inventory_item_id: variant.inventoryItem?.id ? getNumericId(variant.inventoryItem.id) : null,
      inventory_quantity: variant.inventoryQuantity ?? null,
      image_url: imageUrl,
      admin_graphql_api_id: variant.id,
    };
  });
  const images = product.media.nodes.map((media, index) => {
    const imageId = media.id ? getNumericId(media.id) : null;
    const src = media.image?.url ?? null;

    return {
      id: imageId,
      alt: media.alt,
      position: index + 1,
      product_id: productId,
      created_at: media.createdAt,
      updated_at: media.updatedAt,
      admin_graphql_api_id: media.id,
      width: media.image?.width ?? null,
      height: media.image?.height ?? null,
      src,
      variant_ids: variantsMapping[src] ?? [],
    };
  });
  return {
    id: productId,
    title: product.title,
    body_html: product.descriptionHtml,
    vendor: product.vendor,
    product_type: product.productType,
    created_at: product.createdAt,
    handle: product.handle,
    updated_at: product.updatedAt,
    published_at: product.publishedAt,
    template_suffix: product.templateSuffix,
    tags: product.tags?.join(",") ?? null,
    status: product.status.toLowerCase(),
    admin_graphql_api_id: product.id,

    variants,

    options: (product.options ?? []).map((option) => {
      return {
        id: option.id ? getNumericId(option.id) : null,
        product_id: productId,
        name: option.name,
        position: option.position,
        values: option.values,
      };
    }),

    images,
    image: firstImage
      ? {
          id: firstImage.id ? getNumericId(firstImage.id) : null,
          alt: firstImage.alt,
          product_id: firstImage ? productId : null,
          created_at: firstImage.createdAt,
          updated_at: firstImage.updatedAt,
          admin_graphql_api_id: firstImage.id,
          width: firstImage.image?.width ?? null,
          height: firstImage.image?.height ?? null,
          src: firstImage.image?.url ?? null,
          variant_ids: images[0].variant_ids,
        }
      : null,
  };
};
