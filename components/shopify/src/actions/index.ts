import customers from "./customers";
import draftOrders from "./draftOrders";
import fulfillments from "./fulfillments";
import graphqlActions from "./graphql";
import misc from "./misc";
import orders from "./orders";
import productImages from "./productImages";
import products from "./products";
import webhooks from "./webhooks";

const { createCustomer, getCustomer, listCustomers } = customers;
const { listDraftOrders } = draftOrders;
const { getFulfillmentOrder, listFulfillmentOrders, listFulfillments } = fulfillments;
const { getShopConfig, graphQlRawRequest, rawRequest } = misc;
const { getOrder } = orders;
const { listProductImages } = productImages;
const { countProducts, getProduct, listProducts } = products;
const { createWebhook, deleteInstanceWebhooks, deleteWebhook, listWebhooks } = webhooks;

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
