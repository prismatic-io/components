import { connectionInput, orderId } from "../common";

export const deleteDraftOrderInputs = {
  draftOrderId: { ...orderId, label: "Draft Order ID" },
  shopifyConnection: connectionInput,
};
