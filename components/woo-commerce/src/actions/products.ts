import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { handleErrors } from "../errors";
import { listProductsExamplePayload } from "../examplePayloads";
import {
  after,
  before,
  categories,
  connectionInput,
  description,
  fetchAll,
  images,
  offset,
  page,
  params,
  price,
  productId,
  productName,
  productType,
  resultsPerPage,
  search,
  summary,
  values,
} from "../inputs";
import { paginateRecords } from "../util";

export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product record",
  },
  inputs: {
    connection: connectionInput,
    productName,
    productType,
    price,
    description,
    summary,
    categories,
    images,
    values,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.post(`/products`, {
          ...util.types.keyValPairListToObject(params.values),
          name: util.types.toString(params.productName) || undefined,
          type: util.types.toString(params.productType) || undefined,
          regular_price: util.types.toString(params.price) || undefined,
          description: util.types.toString(params.description) || undefined,
          short_description: util.types.toString(params.summary) || undefined,
          categories: JSON.parse(util.types.toString(params.categories)) || [],
          images: JSON.parse(util.types.toString(params.images)) || [],
        }),
      ),
    };
  },
});

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Create a new product record",
  },
  inputs: {
    connection: connectionInput,
    productId,
    productName,
    productType,
    price,
    description,
    summary,
    categories,
    images,
    values,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.put(`/products/${params.productId}`, {
          ...util.types.keyValPairListToObject(params.values),
          name: util.types.toString(params.productName) || undefined,
          type: util.types.toString(params.productType) || undefined,
          regular_price: util.types.toNumber(params.price) || undefined,
          description: util.types.toString(params.description) || undefined,
          short_description: util.types.toString(params.summary) || undefined,
          categories: util.types.toString(params.categories)
            ? JSON.parse(util.types.toString(params.categories))
            : undefined,
          images: util.types.toString(params.images)
            ? JSON.parse(util.types.toString(params.images))
            : undefined,
        }),
      ),
    };
  },
});

export const listProducts = action({
  display: {
    label: "List Products",
    description: "Returns a list of all active products",
  },
  inputs: {
    connection: connectionInput,
    resultsPerPage,
    page,
    offset,
    search,
    before,
    after,
    params,
    fetchAll,
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      after,
      before,
      connection,
      page,
      resultsPerPage,
      offset,
      search,
      params,
      fetchAll,
    },
  ) => {
    const client = getClient(connection, debug);
    const paginatedData = await paginateRecords(
      client,
      "/products",
      {
        per_page: resultsPerPage,
        page,
        offset,
        search,
        before,
        after,
        ...params,
      },
      fetchAll,
    );
    return {
      data: paginatedData,
    };
  },
  examplePayload: listProductsExamplePayload,
});

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Returns the information and metadata of a given product",
  },
  inputs: {
    connection: connectionInput,
    productId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/products/${params.productId}`)),
    };
  },
});

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete the information and metadata of a given product",
  },
  inputs: {
    connection: connectionInput,
    productId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.delete(`/products/${params.productId}`)),
    };
  },
});
