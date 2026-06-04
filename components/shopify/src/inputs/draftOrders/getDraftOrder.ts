import { connectionInput, orderId } from "../common";

export const getDraftOrderInputs = {
  draftOrderId: { ...orderId, label: "Draft Order ID" },
  shopifyConnection: connectionInput,
};
