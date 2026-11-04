import { selectCollections } from "./selectCollections";
import { selectCustomers } from "./selectCustomers";
import { selectDraftOrders } from "./selectDraftOrders";
import { selectFulfillmentOrders } from "./selectFulfillmentOrders";
import { selectFulfillmentServices } from "./selectFulfillmentServices";
import { selectFulfillments } from "./selectFulfillments";
import { selectInventoryItems } from "./selectInventoryItems";
import { selectLocations } from "./selectLocations";
import { selectOrders } from "./selectOrders";
import { selectProductImages } from "./selectProductImages";
import { selectProducts } from "./selectProducts";
import { selectVariants } from "./selectVariants";

export default {
  listCollections: selectCollections,
  listCustomers: selectCustomers,
  listDraftOrders: selectDraftOrders,
  listFulfillmentOrders: selectFulfillmentOrders,
  listFulfillmentServices: selectFulfillmentServices,
  listFulfillments: selectFulfillments,
  listInventoryItems: selectInventoryItems,
  listLocations: selectLocations,
  listOrders: selectOrders,
  listProductImages: selectProductImages,
  listProducts: selectProducts,
  listVariants: selectVariants,
};
