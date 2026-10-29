import { input } from "@prismatic-io/spectral";
import { createPurchaseOrderLineInputs } from "./createPurchaseOrderLineInputs";
import { purchaseOrderLineId } from "./shared";

export const updatePurchaseOrderLineInputs = {
  purchaseOrderLineId: input({
    ...purchaseOrderLineId,
    comments: "The ID of the purchase order line to update.",
  }),
  ...createPurchaseOrderLineInputs,
  documentId: input({
    ...createPurchaseOrderLineInputs.documentId,
    required: false,
  }),
};
