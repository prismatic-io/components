import { input, util } from "@prismatic-io/spectral";
import {
  cleanCodeInputEmptyObject,
  cleanProductIdForVariant,
} from "../../util";
import { getAlldata, pagination, productId, shopifyConnection } from "./common";

const variant = input({
  label: "Variant",
  type: "code",
  language: "json",
  required: true,
  comments: "Provide a JSON object containing the variant data.",
  example: JSON.stringify(
    {
      price: 14.99,
      compareAtPrice: 19.99,
      optionValues: [
        {
          name: "Golden",
          optionId: "gid://shopify/ProductOption/328272167",
        },
      ],
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputEmptyObject(value, "Variant"),
});

const variantId = input({
  label: "Variant ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product variant.",
  example: "gid://shopify/ProductVariant/1070325177",
  placeholder: "Enter variant ID",
  clean: util.types.toString,
});

const updateVariant = input({
  label: "Update Variant",
  type: "code",
  language: "json",
  required: true,
  comments: "Provide a JSON object containing the variant data to update.",
  example: JSON.stringify(
    {
      id: "gid://shopify/ProductVariant/1",
      barcode: "12345",
      price: "100.57",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputEmptyObject(value, "Update Variant"),
});

export const listVariantsInputs = {
  shopifyConnection,
  productId: input({
    ...productId,
    example: "108828309",
    clean: cleanProductIdForVariant,
  }),
  getAlldata,
  pagination,
};

export const countVariantsInputs = {
  shopifyConnection,
};

export const createVariantInputs = {
  shopifyConnection,
  productId,
  variant,
};

export const deleteVariantInputs = {
  shopifyConnection,
  productId,
  variantId,
};

export const getVariantInputs = {
  shopifyConnection,
  variantId,
};

export const updateVariantInputs = {
  shopifyConnection,
  productId,
  updateVariant,
};
