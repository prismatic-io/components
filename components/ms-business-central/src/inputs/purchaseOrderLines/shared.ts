import { input, util } from "@prismatic-io/spectral";

export const purchaseOrderLineId = input({
  label: "Purchase Order Line ID",
  required: true,
  comments: "The unique ID of the purchase order line.",
  type: "string",
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "00000000-0000-0000-0000-000000000000",
  dataSource: "selectPurchaseOrderLine",
  clean: util.types.toString,
});
