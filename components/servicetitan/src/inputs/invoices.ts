import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanNumberInput,
  cleanStringInput,
  mapBooleanModelInput,
  mapModelValues,
} from "../util";
import {
  connection,
  customQueryParams,
  exportId,
  fetchAll,
  includeTotal,
  installedOn,
  operations,
  pagination,
  sort,
  summary,
  technicianId,
  typeId,
} from "./common";
const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the invoice.",
  placeholder: "Enter an invoice ID",
  clean: util.types.toNumber,
  dataSource: "selectInvoice",
});
const itemId = input({
  label: "Item ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the item.",
  placeholder: "Enter an item ID",
  clean: util.types.toString,
});
const adjustmentToId = input({
  label: "Adjustment To ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the invoice the adjustment is for.",
  placeholder: "Enter the ID of the invoice being adjusted",
  clean: util.types.toNumber,
  dataSource: "selectInvoice",
});
const number = input({
  label: "Number",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The invoice number.",
  placeholder: "Enter an invoice number",
  clean: cleanStringInput,
});
const invoicedOn = input({
  label: "Invoiced On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the invoice was invoiced on.",
  placeholder: "Enter the invoice date and time in UTC",
  clean: cleanStringInput,
});
const subtotal = input({
  label: "Subtotal",
  type: "string",
  example: "100.00",
  required: false,
  comments: "The subtotal of the invoice.",
  placeholder: "Enter a subtotal amount",
  clean: cleanNumberInput,
});
const tax = input({
  label: "Tax",
  type: "string",
  example: "100.00",
  required: false,
  comments: "The tax of the invoice.",
  placeholder: "Enter a tax amount",
  clean: cleanNumberInput,
});
const royaltyStatus = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "The royalty status of the invoice.",
  model: mapModelValues(["Pending", "Sent", "Failed"], true),
  clean: cleanStringInput,
});
const reviewStatus = input({
  label: "Review Status",
  type: "string",
  required: false,
  comments: "The review status of the invoice.",
  model: mapModelValues(["NeedsReview", "OnHold", "Reviewed"], true),
  clean: cleanStringInput,
});
const items = input({
  label: "Items",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        skuId: 0,
        skuName: "string",
        technicianId: 0,
        description: "string",
        quantity: 0,
        unitPrice: 0,
        cost: 0,
        isAddOn: true,
        signature: "string",
        technicianAcknowledgementSignature: "string",
        installedOn: "string",
        inventoryWarehouseName: "string",
        skipUpdatingMembershipPrices: true,
        itemGroupName: "string",
        itemGroupRootId: 0,
        inventoryLocationId: 0,
        durationBillingId: 0,
        id: 0,
      },
    ],
    null,
    2,
  ),
  comments: "The items of the invoice.",
  clean: cleanCodeInput,
});
const royaltyDate = input({
  label: "Date",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The royalty date of the invoice.",
  placeholder: "Enter the royalty date and time in UTC",
  clean: cleanStringInput,
});
const royaltySentOn = input({
  label: "Sent On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The royalty sent date of the invoice.",
  placeholder: "Enter the royalty sent date and time in UTC",
  clean: cleanStringInput,
});
const royaltyMemo = input({
  label: "Memo",
  type: "string",
  example: "Payment for services rendered.",
  required: false,
  comments: "A free-form note stored with the invoice's royalty record.",
  placeholder: "Enter a royalty memo",
  clean: cleanStringInput,
});
const assignedToId = input({
  label: "Assigned To ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the user the invoice is assigned to.",
  placeholder: "Enter a user ID",
  clean: cleanNumberInput,
});
const payments = input({
  label: "Payments",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        id: 0,
        settlementStatus: {},
        settlementDate: "string",
      },
    ],
    null,
    2,
  ),
  comments: "The payments of the invoice.",
  clean: cleanCodeInput,
});
const skuId = input({
  label: "SKU ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the SKU.",
  placeholder: "Enter a SKU ID",
  clean: cleanNumberInput,
});
const skuName = input({
  label: "SKU Name",
  type: "string",
  example: "Test SKU",
  required: false,
  comments: "The name of the SKU.",
  placeholder: "Enter a SKU name",
  clean: cleanStringInput,
});
const description = input({
  label: "Description",
  type: "string",
  example: "A test SKU",
  required: true,
  comments: "The description of the SKU.",
  placeholder: "Enter a description",
  clean: util.types.toString,
});
const quantity = input({
  label: "Quantity",
  type: "string",
  example: "2",
  required: true,
  comments: "The quantity of the SKU.",
  placeholder: "Enter a quantity",
  clean: util.types.toNumber,
});
const unitPrice = input({
  label: "Unit Price",
  type: "string",
  example: "2.0",
  required: false,
  comments: "The unit price of the SKU.",
  placeholder: "Enter a unit price",
  clean: cleanNumberInput,
});
const cost = input({
  label: "Cost",
  type: "string",
  example: "2.0",
  required: false,
  comments: "The cost of the SKU.",
  placeholder: "Enter a cost amount",
  clean: cleanNumberInput,
});
const isAddOn = input({
  label: "Is Add On",
  type: "string",
  required: false,
  comments: "Is the SKU an add on.",
  model: mapBooleanModelInput,
  default: "",
  clean: cleanBooleanInput,
});
const signature = input({
  label: "Signature",
  type: "string",
  example: "An example signature.",
  required: false,
  comments: "The signature of the SKU.",
  placeholder: "Enter a signature",
  clean: cleanStringInput,
});
const technicianAcknowledgementSignature = input({
  label: "Technician Acknowledgement Signature",
  type: "string",
  example: "Test Signature",
  required: false,
  comments: "The technician acknowledgement signature of the SKU.",
  placeholder: "Enter a technician acknowledgement signature",
  clean: cleanStringInput,
});
const inventoryWarehouseName = input({
  label: "Inventory Warehouse Name",
  type: "string",
  example: "Warehouse",
  required: false,
  comments: "The inventory warehouse name of the SKU.",
  placeholder: "Enter an inventory warehouse name",
  clean: cleanStringInput,
});
const skipUpdatingMembershipPrices = input({
  label: "Skip Updating Membership Prices",
  type: "string",
  required: false,
  comments: "Skip updating membership prices.",
  model: mapBooleanModelInput,
  default: "",
  clean: cleanBooleanInput,
});
const itemGroupName = input({
  label: "Item Group Name",
  type: "string",
  example: "Test Group",
  required: false,
  comments: "The item group name of the SKU.",
  placeholder: "Enter an item group name",
  clean: cleanStringInput,
});
const itemGroupRootId = input({
  label: "Item Group Root ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The item group root ID of the SKU.",
  placeholder: "Enter an item group root ID",
  clean: cleanNumberInput,
});
const inventoryLocationId = input({
  label: "Inventory Location ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The inventory location ID of the SKU.",
  placeholder: "Enter an inventory location ID",
  clean: cleanNumberInput,
});
const durationBillingId = input({
  label: "Duration Billing ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The duration billing ID of the SKU.",
  placeholder: "Enter a duration billing ID",
  clean: cleanNumberInput,
});
const id = input({
  label: "Invoice Item ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The unique identifier of the invoice item.",
  placeholder: "Enter an invoice item ID",
  clean: cleanNumberInput,
});
const royaltyDetails = structuredObjectInput({
  label: "Royalty Details",
  required: false,
  comments: "Royalty status, date, sent on, and memo.",
  inputs: {
    royaltyStatus,
    royaltyDate,
    royaltySentOn,
    royaltyMemo,
  },
});
const updateInvoiceItemsAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Unit Price, Cost, Is Add On, Signature, Technician Acknowledgement Signature, Installed On, Inventory Warehouse Name, Skip Updating Membership Prices, and Item Group Name.",
  inputs: {
    unitPrice,
    cost,
    isAddOn,
    signature,
    technicianAcknowledgementSignature,
    installedOn,
    inventoryWarehouseName,
    skipUpdatingMembershipPrices,
    itemGroupName,
  },
});
export const createInvoicesInputs = {
  connection,
  adjustmentToId,
  number,
  typeId: {
    ...typeId,
    required: false,
  },
  invoicedOn,
  subtotal,
  tax,
  summary,
  royaltyDetails,
  exportId,
  reviewStatus,
  assignedToId,
  items,
};
export const deleteInvoiceItemInputs = {
  connection,
  invoiceId,
  itemId,
};
export const listInvoicesInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const updateInvoiceInputs = {
  connection,
  invoiceId,
  number,
  typeId: {
    ...typeId,
    required: false,
  },
  invoicedOn,
  subtotal,
  tax,
  summary,
  royaltyDetails,
  exportId,
  reviewStatus,
  assignedToId,
  items,
  payments,
};
export const updateInvoiceCustomFieldsInputs = {
  connection,
  operations: {
    ...operations,
    comments: "The operations to perform on the invoice.",
  },
};
export const updateInvoiceItemsInputs = {
  connection,
  invoiceId,
  description,
  quantity,
  skuId,
  skuName,
  technicianId,
  additionalFields: updateInvoiceItemsAdditionalFields,
  itemGroupRootId,
  inventoryLocationId,
  durationBillingId,
  id,
};
