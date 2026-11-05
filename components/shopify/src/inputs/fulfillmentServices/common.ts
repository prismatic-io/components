import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const fulfillmentServiceId = input({
  label: "Fulfillment Service ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment service.",
  example: "39072856",
  placeholder: "Enter fulfillment service ID",
  clean: util.types.toString,
});

export const scope = input({
  label: "Scope",
  type: "string",
  required: true,
  comments: "Specify which fulfillment services to retrieve.",
  default: "all",
  placeholder: "Select scope",
  model: ["current_client", "all"].map((value) => ({ label: value, value })),
  clean: util.types.toString,
});

export const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  required: false,
  example: "https://example.com/fulfillment-callback",
  placeholder: "Enter callback URL",
  comments: "The callback URL that the fulfillment service has registered for request.",
  clean: cleanStringInput,
});

export const inventoryManagement = input({
  label: "Inventory Management",
  type: "boolean",
  required: false,
  comments:
    "When true, the fulfillment service tracks product inventory and provides updates to Shopify.",
  clean: util.types.toBool,
});

export const fulfillmentServiceName = input({
  label: "Fulfillment Service Name",
  type: "string",
  required: false,
  comments: "The name of the fulfillment service.",
  example: "MyFulfillmentService",
  placeholder: "Enter fulfillment service name",
  clean: cleanStringInput,
});

export const permitsSkuSharing = input({
  label: "Permits SKU Sharing",
  type: "boolean",
  required: false,
  comments: "When true, the fulfillment service can stock inventory alongside other locations.",
  clean: util.types.toBool,
});

export const requiresShippingMethod = input({
  label: "Requires Shipping Method",
  type: "boolean",
  required: false,
  comments: "When true, the fulfillment service requires a shipping method to be specified.",
  clean: util.types.toBool,
});

export const trackingSupport = input({
  label: "Tracking Support",
  type: "boolean",
  required: false,
  comments: "When true, the fulfillment service supports tracking numbers for packages.",
  clean: util.types.toBool,
});
