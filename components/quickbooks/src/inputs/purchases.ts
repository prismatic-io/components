import { input, util } from "@prismatic-io/spectral";

export const purchaseOrderId = input({
  label: "Purchase Order ID",
  placeholder: "Enter purchase order ID",
  type: "string",
  required: true,
  example: "259",
  comments: "The ID of the purchase order.",
  dataSource: "selectPurchaseOrder",
  clean: util.types.toString,
});

export const apAccountIdInput = input({
  label: "AP Account ID",
  placeholder: "Enter AP account ID",
  type: "string",
  required: true,
  comments: "The AP account to which the bill is credited.",
  clean: util.types.toString,
});

export const vendorIdInput = input({
  label: "Vendor ID",
  placeholder: "Enter vendor ID",
  type: "string",
  required: true,
  comments: "The vendor referenced in this transaction.",
  clean: util.types.toString,
});

export const linesInput = input({
  label: "Lines",
  type: "data",
  required: true,
  comments:
    "Data representing line items of purchase orders. See 'Line' in QuickBooks' docs at https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/purchaseorder#create-a-purchase-order.",
});
