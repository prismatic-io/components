import { connectionInput } from "../common";
import {
  callbackUrl,
  fulfillmentServiceId,
  fulfillmentServiceName,
  inventoryManagement,
  permitsSkuSharing,
  requiresShippingMethod,
  trackingSupport,
} from "./common";

export const updateFulfillmentServiceInputs = {
  shopifyConnection: connectionInput,
  fulfillmentServiceId,
  callbackUrl,
  inventoryManagement,
  fulfillmentServiceName,
  permitsSkuSharing,
  requiresShippingMethod,
  trackingSupport,
};
