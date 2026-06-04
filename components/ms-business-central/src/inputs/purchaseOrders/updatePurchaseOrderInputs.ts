import { input } from "@prismatic-io/spectral";
import { createPurchaseOrderInputs } from "./createPurchaseOrderInputs";
import { purchaseOrderId } from "./shared";

export const updatePurchaseOrderInputs = {
  purchaseOrderId: input({
    ...purchaseOrderId,
    comments: "The ID of the purchase order to update.",
  }),
  ...createPurchaseOrderInputs,
  vendorNumber: input({
    ...createPurchaseOrderInputs.vendorNumber,
    required: false,
  }),
};
