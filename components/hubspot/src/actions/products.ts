import { action, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import {
  createProductPayload,
  deleteProductPayload,
  listProductsPayload,
  updateProductPayload,
} from "../examplePayloads";
import {
  additionalProperties,
  after,
  archived,
  associationsList,
  connectionInput,
  description,
  dynamicValues,
  fetchAll,
  fieldValues,
  limit,
  price,
  productId,
  productName,
  recurringBillingPeriod,
  sku,
  timeout,
  unitCost,
  updatePrice,
  updateProductName,
  updateSku,
} from "../inputs";
import { getAllPaginatedData, getProps, toStringList } from "../util";

export const listProducts = action({
  display: {
    label: "List Products",
    description: "Retrieve a list of all products",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(["name"], params.additionalProperties || []);

    return {
      data: await getAllPaginatedData(client, "/crm/v3/objects/products", params.fetchAll, false, {
        params: {
          ...parameterizedProperties,
          limit: util.types.toInt(params.limit) || undefined,
          after: util.types.toString(params.after) || undefined,
          associations: toStringList(params.associationsList || []).join(",") || undefined,
          archived: util.types.toBool(params.archived) || false,
        },
      }),
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    additionalProperties,
    associationsList,
    archived,
    timeout,
    fetchAll,
    limit,
    after,
  },
  examplePayload: listProductsPayload,
});

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieve the information and metadata of a product by Id or name",
  },
  perform: async (
    context,
    {
      productId,
      productName,
      additionalProperties,
      timeout,
      hubspotConnection,
      archived,
      associationsList,
    },
  ) => {
    const id = util.types.toString(productId);
    const name = util.types.toString(productName);

    if (!id && !name) {
      throw new Error("You must supply an Id or name to retrieve a product record");
    }

    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(["name"], additionalProperties || []);

    const params = {
      ...parameterizedProperties,
      associations: toStringList(associationsList || []).join(",") || undefined,
      archived: util.types.toBool(archived) || false,
    };

    if (name) {
      const result = await client.get("/crm/v3/objects/products", {
        params,
      });
      const { results: products } = result.data;

      const filteredProducts = (products || []).filter((product) => {
        return product?.properties?.name === name;
      });

      if (filteredProducts.length === 0) {
        throw new Error(`No line items found matching ${name}`);
      }
      return { data: filteredProducts };
    }

    return {
      data: (
        await client.get(`/crm/v3/objects/products/${productId}`, {
          params,
        })
      ).data,
    };
  },
  inputs: {
    productId: { ...productId, required: false },
    productName: { ...productName, required: false },
    additionalProperties,
    associationsList,
    archived,
    timeout,
    hubspotConnection: connectionInput,
  },
  
});

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete a product by Id",
  },
  perform: async (context, { productId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (await client.delete(`/crm/v3/objects/products/${productId}`)).data,
    };
  },
  inputs: {
    productId,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: deleteProductPayload,
});

export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product",
  },
  perform: async (
    context,
    {
      productName,
      description,
      sku,
      price,
      recurringBillingPeriod,
      unitCost,
      fieldValues,
      dynamicValues,
      timeout,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post("/crm/v3/objects/products", {
          properties: {
            description: description,
            hs_cost_of_goods_sold: unitCost,
            hs_recurring_billing_period: recurringBillingPeriod,
            hs_sku: sku,
            name: productName,
            price: price,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    productName,
    description,
    sku,
    price: { ...price, required: false },
    recurringBillingPeriod,
    unitCost,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: createProductPayload,
});

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Update the information and metadata of an existing product",
  },
  perform: async (
    context,
    {
      productId,
      updateProductName,
      description,
      updateSku,
      updatePrice,
      recurringBillingPeriod,
      unitCost,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.patch(`/crm/v3/objects/products/${productId}`, {
          properties: {
            description: description || undefined,
            hs_cost_of_goods_sold: unitCost || undefined,
            hs_recurring_billing_period: recurringBillingPeriod || undefined,
            hs_sku: updateSku || undefined,
            name: updateProductName || undefined,
            price: updatePrice || undefined,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    productId,
    updateProductName,
    description,
    updateSku,
    updatePrice,
    recurringBillingPeriod,
    unitCost,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: updateProductPayload,
});
