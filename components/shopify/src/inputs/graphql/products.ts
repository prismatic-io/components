import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, cleanValueListInput } from "../../util";
import {
  additionalFields,
  getAlldata,
  pagination,
  productId,
  shopifyConnection,
  tags,
} from "./common";
import { imageAlt, imageURL } from "./productImages";

const title = input({
  label: "Title",
  type: "string",
  required: true,
  example: "Example Product",
  placeholder: "Enter product title",
  comments: "Provide a string value for the title of the product.",
  clean: util.types.toString,
});

const vendor = input({
  label: "Vendor",
  type: "string",
  required: true,
  example: "Burton inc.",
  placeholder: "Enter vendor name",
  comments: "Provide a value for the vendor of the product.",
  clean: util.types.toString,
});

const productType = input({
  label: "Product Type",
  type: "string",
  required: true,
  example: "T-shirt",
  placeholder: "Enter product type",
  comments: "Provide a value for the type of product.",
  clean: util.types.toString,
});

const productStatus = input({
  label: "Product Status",
  type: "string",
  required: true,
  model: [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
    { label: "Archived", value: "ARCHIVED" },
  ],
  comments: "Specify the status of the product.",
  clean: util.types.toString,
});

const descriptionHtml = input({
  label: "Description HTML",
  type: "string",
  required: true,
  example: "<p>This is an example product.</p>",
  placeholder: "Enter product description HTML",
  comments: "Provide an HTML string for the description of the product.",
  clean: util.types.toString,
});

export const listProducstInputs = {
  shopifyConnection,
  getAlldata,
  pagination,
};

export const getProductInputs = {
  shopifyConnection,
  productId,
};

export const deleteProductInputs = {
  shopifyConnection,
  productId,
};

export const createProductInputs = {
  shopifyConnection,
  title,
  descriptionHtml,
  productType,
  vendor,
  productStatus,
  imageUrl: input({
    ...imageURL,
    required: false,
    comments: "Provide a URL for the image of the product.",
    clean: cleanStringInput,
  }),
  imageAlt: input({
    ...imageAlt,
    required: false,
    comments: "Provide the alt text for the image of the product.",
    clean: cleanStringInput,
  }),
  tags: input({
    ...tags,
    comments: "Provide a list of tags for the product.",
    example: "Style",
    clean: cleanValueListInput,
  }),
  additionalFields,
};

export const updateProductInputs = {
  shopifyConnection,
  productId,
  title: input({
    ...title,
    required: false,
    clean: cleanStringInput,
  }),
  descriptionHtml: input({
    ...descriptionHtml,
    required: false,
    clean: cleanStringInput,
  }),
  productType: input({
    ...productType,
    required: false,
    clean: cleanStringInput,
  }),
  vendor: input({
    ...vendor,
    required: false,
    clean: cleanStringInput,
  }),
  productStatus: input({
    ...productStatus,
    required: false,
    clean: cleanStringInput,
  }),
  imageUrl: input({
    ...createProductInputs.imageUrl,
    required: false,
    clean: cleanStringInput,
  }),
  imageAlt: input({
    ...createProductInputs.imageAlt,
    required: false,
    clean: cleanStringInput,
  }),
  tags,
  additionalFields,
};

export const countProductsInputs = {
  shopifyConnection,
};
