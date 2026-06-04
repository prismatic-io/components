import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { handleErrors } from "../errors";
import {
  after,
  before,
  categoryId,
  categoryName,
  connectionInput,
  description,
  fetchAll,
  imageLink,
  offset,
  page,
  params,
  resultsPerPage,
  search,
} from "../inputs";
import { paginateRecords } from "../util";

export const listProductCategories = action({
  display: {
    label: "List Product Categories",
    description: "Returns a list of all product categories",
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    resultsPerPage,
    page,
    offset,
    search,
    before,
    after,
    params,
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
      "/products/categories",
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
});

export const getProductCategory = action({
  display: {
    label: "Get Product Category",
    description: "Returns the information and metadata of the product category",
  },
  inputs: {
    connection: connectionInput,
    categoryId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.get(`/products/categories/${params.categoryId}`),
      ),
    };
  },
});

export const deleteProductCategory = action({
  display: {
    label: "Delete Product Category",
    description: "Delete Product Category",
  },
  inputs: {
    connection: connectionInput,
    categoryId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.get(`/products/categories/${params.categoryId}`),
      ),
    };
  },
});

export const createProductCategory = action({
  display: {
    label: "Create Product Category",
    description: "Create a new product category record",
  },
  inputs: {
    connection: connectionInput,
    categoryName,
    imageLink,
    description,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.post(`/products/categories`, {
          name: util.types.toString(params.categoryName),
          description: util.types.toString(params.description),
          image: {
            src: util.types.toString(params.imageLink) || undefined,
          },
        }),
      ),
    };
  },
});
