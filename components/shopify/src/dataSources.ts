import { dataSource } from "@prismatic-io/spectral";
import { selectCollections } from "./datasources/selectCollections";
import { selectCustomers } from "./datasources/selectCustomers";
import { selectDraftOrders } from "./datasources/selectDraftOrders";
import { selectFulfillmentOrders } from "./datasources/selectFulfillmentOrders";
import { selectFulfillmentServices } from "./datasources/selectFulfillmentServices";
import { selectFulfillments } from "./datasources/selectFulfillments";
import { selectInventoryItems } from "./datasources/selectInventoryItems";
import { selectLocations } from "./datasources/selectLocations";
import { selectOrders } from "./datasources/selectOrders";
import { selectProductImages } from "./datasources/selectProductImages";
import { selectProducts } from "./datasources/selectProducts";
import { selectVariants } from "./datasources/selectVariants";
import { connectionInput, orderId, productId } from "./inputs";

const listOrders = dataSource({
  display: {
    label: "Select Order",
    description: "Selects an order from a list of all orders.",
  },
  perform: async (context, { shopifyConnection }) => {
    const { result } = await selectOrders.perform(context, {
      shopifyConnection,
    });
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listFulfillmentOrders = dataSource({
  display: {
    label: "Select Fulfillment Order",
    description: "Selects a fulfillment order from a list of all fulfillment orders.",
  },
  perform: async (context, { shopifyConnection, orderId }) => {
    const { result } = await selectFulfillmentOrders.perform(context, {
      shopifyConnection,
      orderId: `gid://shopify/Order/${orderId}`,
    });
    return { result };
  },
  inputs: {
    shopifyConnection: connectionInput,
    orderId: {
      ...orderId,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
});

const listFulfillments = dataSource({
  display: {
    label: "Select Fulfillment",
    description: "Selects a fulfillment from a list of all fulfillments.",
  },
  perform: async (context, params) => {
    const { result } = await selectFulfillments.perform(context, {
      shopifyConnection: params.shopifyConnection,
      orderId: `gid://shopify/Order/${params.orderId}`,
    });
    return { result };
  },
  inputs: {
    shopifyConnection: connectionInput,
    orderId: {
      ...orderId,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
});

const listLocations = dataSource({
  display: {
    label: "Select Location",
    description: "Selects a location from a list of all locations.",
  },
  perform: async (context, params) => {
    const { result } = await selectLocations.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listCustomers = dataSource({
  display: {
    label: "Select Customer",
    description: "Selects a customer from a list of all customers.",
  },
  perform: async (context, params) => {
    const { result } = await selectCustomers.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listProducts = dataSource({
  display: {
    label: "Select Product",
    description: "Selects a product from a list of all products.",
  },
  perform: async (context, params) => {
    const { result } = await selectProducts.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listVariants = dataSource({
  display: {
    label: "Select Variant",
    description: "Selects a product variant from a list of variants for the specified product.",
  },
  perform: async (context, params) => {
    const { result } = await selectVariants.perform(context, params);
    return { result };
  },
  inputs: {
    shopifyConnection: connectionInput,
    productId: {
      ...productId,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
});

const listProductImages = dataSource({
  display: {
    label: "Select Product Image",
    description: "Selects a product image from a list of images for the specified product.",
  },
  perform: async (context, params) => {
    const { result } = await selectProductImages.perform(context, params);
    return { result };
  },
  inputs: {
    shopifyConnection: connectionInput,
    productId: {
      ...productId,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
});

const listInventoryItems = dataSource({
  display: {
    label: "Select Inventory Item",
    description: "Selects an inventory item from a list of all inventory items.",
  },
  perform: async (context, params) => {
    const { result } = await selectInventoryItems.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listDraftOrders = dataSource({
  display: {
    label: "Select Draft Order",
    description: "Selects a draft order from a list of all draft orders.",
  },
  perform: async (context, params) => {
    const { result } = await selectDraftOrders.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listCollections = dataSource({
  display: {
    label: "Select Collection",
    description: "Selects a collection from a list of all collections.",
  },
  perform: async (context, params) => {
    const { result } = await selectCollections.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

const listFulfillmentServices = dataSource({
  display: {
    label: "Select Fulfillment Service",
    description: "Selects a fulfillment service from a list of all fulfillment services.",
  },
  perform: async (context, params) => {
    const { result } = await selectFulfillmentServices.perform(context, params);
    return { result };
  },
  inputs: { shopifyConnection: connectionInput },
  dataSourceType: "picklist",
});

export {
  listOrders,
  listFulfillmentOrders,
  listFulfillments,
  listLocations,
  listCustomers,
  listProducts,
  listVariants,
  listProductImages,
  listInventoryItems,
  listDraftOrders,
  listCollections,
  listFulfillmentServices,
};
