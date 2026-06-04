import { input, util } from "@prismatic-io/spectral";

export const purchaseOrderId = input({
  label: "Purchase Order ID",
  required: true,
  comments: "The unique ID of the purchase order.",
  type: "string",
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectPurchaseOrder",
  clean: util.types.toString,
});
