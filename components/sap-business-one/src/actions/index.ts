import businessPartners from "./businessPartners";
import invoices from "./invoices";
import items from "./items";
import orders from "./orders";
import priceLists from "./priceLists";
import purchaseOrders from "./purchaseOrders";
import { rawRequest } from "./rawRequest";
import records from "./records";
import warehouses from "./warehouses";

export default {
  ...businessPartners,
  ...items,
  ...orders,
  ...priceLists,
  ...purchaseOrders,
  ...warehouses,
  ...invoices,
  ...records,
  rawRequest,
};
