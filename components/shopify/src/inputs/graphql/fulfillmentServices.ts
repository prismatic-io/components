import { input, util } from "@prismatic-io/spectral";
import { LIST_FULFILLMENT_SERVICES_DATASOURCE_REFERENCE } from "../../constants";
import { cleanStringInput } from "../../util";
import { callbackUrl, optionalBoolean, shopifyConnection } from "./common";
const fulfillmentServiceId = input({
  label: "Fulfillment Service ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment service.",
  example: "gid://shopify/FulfillmentService/18961920?id=true",
  placeholder: "Enter fulfillment service ID",
  clean: util.types.toString,
  dataSource: LIST_FULFILLMENT_SERVICES_DATASOURCE_REFERENCE,
});
const inventoryManagement = input({
  label: "Inventory Management",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Whether the fulfillment services tracks product inventory and provides updates to Shopify.",
  clean: util.types.toBool,
});
const fulfillmentServiceName = input({
  label: "Fulfillment Service Name",
  type: "string",
  required: true,
  comments: "The name of the fulfillment service.",
  example: "MyFulfillmentService",
  placeholder: "Enter fulfillment service name",
  clean: util.types.toString,
});
const trackingSupport = input({
  label: "Tracking Support",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Whether the fulfillment service supports tracking numbers for packages.",
  clean: util.types.toBool,
});
export const listFulfillmentServicesInputs = {
  shopifyConnection,
};
export const getFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceId,
};
export const createFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceName,
  callbackUrl,
  inventoryManagement,
  trackingSupport,
};
export const updateFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceId,
  fulfillmentServiceName: input({
    ...fulfillmentServiceName,
    required: false,
    clean: cleanStringInput,
  }),
  callbackUrl: input({
    ...callbackUrl,
    required: false,
    clean: cleanStringInput,
  }),
  inventoryManagement: input({
    ...inventoryManagement,
    ...optionalBoolean,
    label: "Inventory Management",
  }),
  trackingSupport: input({
    ...trackingSupport,
    ...optionalBoolean,
    label: "Tracking Support",
  }),
};
export const deleteFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceId,
};
