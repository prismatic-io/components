import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createCustomer, getCustomer, listCustomers } from "./actions/customers";
import { listDraftOrders } from "./actions/draftOrders";
import {
  getFulfillmentOrder,
  listFulfillmentOrders,
  listFulfillments,
} from "./actions/fulfillments";
import graphqlActions from "./actions/graphql";
import { getShopConfig, graphQlRawRequest, rawRequest } from "./actions/misc";
import { getOrder, listOrders } from "./actions/orders";
import { listProductImages } from "./actions/productImages";
import { countProducts, getProduct, listProducts } from "./actions/products";
import {
  createWebhook,
  deleteInstanceWebhooks,
  deleteWebhook,
  listWebhooks,
} from "./actions/webhooks";
import connections from "./connections";
import * as dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "shopify",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/shopify/",
  display: {
    label: "Shopify",
    description: "Manage customers, products, and orders in Shopify.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions: {
    createWebhook,
    deleteInstanceWebhooks,
    deleteWebhook,
    listWebhooks,
    listCustomers,
    createCustomer,
    getCustomer,
    listProducts,
    getProduct,
    getOrder,
    listOrders,
    rawRequest,
    listFulfillments,
    getFulfillmentOrder,
    listFulfillmentOrders,
    countProducts,
    listDraftOrders,
    getShopConfig,
    listProductImages,
    graphQlRawRequest,
    ...graphqlActions,
  },
  triggers: { ...triggers },
  dataSources: { ...dataSources },
  connections,
  hooks: { error: handleErrors },
});
