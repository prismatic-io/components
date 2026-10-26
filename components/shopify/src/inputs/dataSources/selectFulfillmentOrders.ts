import { connectionInput, orderId } from "../common";
export const selectFulfillmentOrdersInputs = {
  shopifyConnection: connectionInput,
  orderId: {
    ...orderId,
    dataSource: undefined,
  },
};
