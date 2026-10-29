import { input, util } from "@prismatic-io/spectral";
import { getAlldata, pagination, productId, shopifyConnection } from "./common";

export const imageURL = input({
  label: "Image URL",
  type: "string",
  required: true,
  example: "https://example.com/image.jpg",
  placeholder: "Enter image URL",
  comments: "Provide the URL of the image.",
  clean: util.types.toString,
});

export const imageAlt = input({
  label: "Image Alt Text",
  type: "string",
  required: true,
  example: "Alt text",
  placeholder: "Enter alt text",
  comments: "Provide the alt text for the image.",
  clean: util.types.toString,
});

const imageId = input({
  label: "Image ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product image.",
  example: "gid://shopify/MediaImage/916933471",
  placeholder: "Enter image ID",
  clean: util.types.toString,
});

export const countProductImagesInputs = {
  shopifyConnection,
  productId,
};

export const createProductImageInputs = {
  shopifyConnection,
  productId,
  imageURL,
  imageAlt,
};

export const deleteProductImageInputs = {
  shopifyConnection,
  productId,
  imageId,
};

export const listProductImagesInputs = {
  shopifyConnection,
  productId,
  getAlldata,
  pagination,
};

export const getProductImageInputs = {
  shopifyConnection,
  productId,
  imageId: input({
    ...imageId,
    example: "916933471",
    comments: "Provide a unique ID of a product image. Use only the ID number.",
  }),
};
