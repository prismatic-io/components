import collections from "./collections";
import currencies from "./currencies";
import customers from "./customers";
import draftOrders from "./draftOrders";
import fulfillmentServices from "./fulfillmentServices";
import fulfillments from "./fulfillments";
import inventoryItems from "./inventoryItems";
import inventoryLevels from "./inventoryLevels";
import locations from "./locations";
import metafields from "./metafields";
import orders from "./orders";
import productImage from "./productImage";
import products from "./products";
import shops from "./shops";
import variants from "./variants";
import webhooks from "./webhooks";

export default {
  ...currencies,
  ...customers,
  ...draftOrders,
  ...fulfillments,
  ...fulfillmentServices,
  ...inventoryItems,
  ...inventoryLevels,
  ...locations,
  ...orders,
  ...productImage,
  ...products,
  ...shops,
  ...variants,
  ...webhooks,
  ...collections,
  ...metafields,
};
