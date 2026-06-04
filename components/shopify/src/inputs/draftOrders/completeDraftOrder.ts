import { connectionInput, orderId } from "../common";

export const completeDraftOrderInputs = {
  draftOrderId: { ...orderId, label: "Draft Order ID" },
  shopifyConnection: connectionInput,
};
