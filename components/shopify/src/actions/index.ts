import { createCustomer, getCustomer, listCustomers } from "./customers";
import { listDraftOrders } from "./draftOrders";
import {
  getFulfillmentOrder,
  listFulfillmentOrders,
  listFulfillments,
} from "./fulfillments";
import graphqlActions from "./graphql";
import { getShopConfig, graphQlRawRequest, rawRequest } from "./misc";
import { getOrder } from "./orders";
import { listProductImages } from "./productImages";
import { countProducts, getProduct, listProducts } from "./products";
import {
  createWebhook,
  deleteInstanceWebhooks,
  deleteWebhook,
  listWebhooks,
} from "./webhooks";
export default {
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
};
