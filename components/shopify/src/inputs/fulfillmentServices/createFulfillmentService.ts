import { connectionInput } from "../common";
import {
  callbackUrl,
  fulfillmentServiceName,
  inventoryManagement,
  permitsSkuSharing,
  requiresShippingMethod,
  trackingSupport,
} from "./common";

export const createFulfillmentServiceInputs = {
  shopifyConnection: connectionInput,
  callbackUrl,
  inventoryManagement,
  fulfillmentServiceName,
  permitsSkuSharing,
  requiresShippingMethod,
  trackingSupport,
};
