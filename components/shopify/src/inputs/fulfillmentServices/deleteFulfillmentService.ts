import { connectionInput } from "../common";
import { fulfillmentServiceId } from "./common";

export const deleteFulfillmentServiceInputs = {
  shopifyConnection: connectionInput,
  fulfillmentServiceId,
};
