import { connectionInput, orderId } from "../common";

export const selectFulfillmentsInputs = {
  shopifyConnection: connectionInput,
  orderId: {
    ...orderId,
    dataSource: undefined,
  },
};
