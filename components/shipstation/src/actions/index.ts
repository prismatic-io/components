import { getCustomer, listCustomers } from "./customers";
import { rawRequest } from "./misc";
import {
  createLabelForOrder,
  createOrUpdateMultipleOrders,
  createOrUpdateOrder,
  deleteOrder,
  getOrder,
  listFulfillments,
  listOrders,
} from "./orders";
import { getProduct, listProducts, updateProduct } from "./products";
import {
  createShipmentLabel,
  listCarriers,
  listPackages,
  listServices,
  listShipments,
} from "./shipments";
import { deactivateStore, getStore, listStores, updateStore } from "./stores";
import { listUsers } from "./users";
import {
  createWarehouse,
  deleteWarehouse,
  getWarehouse,
  listWarehouses,
  updateWarehouse,
} from "./warehouses";
import {
  deleteInstancedWebhooks,
  listWebhooks,
  subscribeToWebhook,
  unsubscribeToWebhook,
} from "./webhooks";

export default {
  listCarriers,
  listPackages,
  listServices,
  listFulfillments,
  listOrders,
  getCustomer,
  listCustomers,
  createOrUpdateOrder,
  createOrUpdateMultipleOrders,
  getOrder,
  deleteOrder,
  createLabelForOrder,
  listProducts,
  getProduct,
  updateProduct,
  listShipments,
  createShipmentLabel,
  listStores,
  getStore,
  updateStore,
  deactivateStore,
  listUsers,
  listWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  listWebhooks,
  subscribeToWebhook,
  unsubscribeToWebhook,
  deleteInstancedWebhooks,
  rawRequest,
};
