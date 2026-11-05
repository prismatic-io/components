import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../../util";

const isEditing = input({
  label: "Is Editing",
  comments:
    "If this is set to true, and the order is still a draft order, the order will remain as a draft order, otherwise the order is made a confirmed order.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const isToSequenceLines = input({
  label: "Is To Sequence Lines",
  comments:
    "If this is set to true, then the order of the line objects in the lines collection will determine the line number (print sequence number) for each line.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const overrideOnHold = input({
  label: "Override On Hold",
  comments:
    "Allows a user that has the permissions to override the order's On Hold status, applied when a customer's account balance is over its credit limit.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const recalculatePrices = input({
  label: "Recalculate Prices",
  comments: "Allows recalculation of the prices for the order when the exchange rate has changed.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const applyAvailableDocumentDiscountPercent = input({
  label: "Apply Available Document Discount Percent",
  comments:
    "This should be passed within to apply the 'available_document_discount_percent' to the sales order only if the 'available_document_discount_percent' is greater than a positive 'Document Discount Percent'.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const customerDeliveryAddressId = input({
  label: "Customer Delivery Address ID",
  comments:
    "The Id of the customer delivery address to copy details to the sales order delivery address and resets 'Use Invoice Address'. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customer_delivery_addresses) for more information.",
  type: "string",
  placeholder: "27912",
  example: "27912",
  required: false,
  dataSource: "selectCustomerDeliveryAddress",
  clean: cleanNumberInput,
});

const suppressWarnings = input({
  label: "Suppress Warnings",
  comments:
    "If this is set to true, we will suppress warnings specifically for payment with order and this is also the case if 'Is Editing' is false.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const customerType = input({
  label: "Customer Type",
  comments:
    "SOP customer type. See [Sage 200 API documentation](https://developer.sage.com/200/reference/sop_customer_types) for more information.",
  type: "string",
  placeholder: "EnumCustomerTypeCredit",
  example: "EnumCustomerTypeCredit",
  required: false,
  clean: cleanStringInput,
});

const documentDate = input({
  label: "Document Date",
  comments: "Sales order document date.",
  type: "string",
  placeholder: "2023-01-02T00:00:00Z",
  example: "2023-01-02T00:00:00Z",
  required: false,
  clean: cleanStringInput,
});

const exchangeRate = input({
  label: "Exchange Rate",
  comments: "Exchange rate.",
  type: "string",
  placeholder: "1",
  example: "1",
  required: false,
  clean: cleanNumberInput,
});

const customerDocumentNo = input({
  label: "Customer Document Number",
  comments: "Customer document number.",
  type: "string",
  placeholder: "0000000001",
  example: "0000000001",
  required: false,
  clean: cleanStringInput,
});

const useInvoiceAddress = input({
  label: "Use Invoice Address",
  comments: "True if this order uses the customer invoice address, else False.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const isTriangulated = input({
  label: "Is Triangulated",
  comments:
    "Whether this order is triangulated and applies only to an EU customer with a different country code to that set in the company details.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const settlementDiscountDays = input({
  label: "Settlement Discount Days",
  comments: "Settlement discount days.",
  type: "string",
  placeholder: "30",
  example: "30",
  required: false,
  clean: cleanNumberInput,
});

const settlementDiscountPercent = input({
  label: "Settlement Discount Percent",
  comments: "Settlement discount percent.",
  type: "string",
  placeholder: "2.5",
  example: "2.5",
  required: false,
  clean: cleanNumberInput,
});

const documentDiscountPercent = input({
  label: "Document Discount Percent",
  comments:
    "Document discount percent value, between -99.99 and 99.99. A negative value is treated as a surcharge (e.g. -10 is a 10% surcharge), and a positive value is treated as a discount.",
  type: "string",
  placeholder: "0",
  example: "0",
  required: false,
  clean: cleanNumberInput,
});

const documentCreatedBy = input({
  label: "Document Created By",
  comments: "The person who created the sales order.",
  type: "string",
  placeholder: "John Doe",
  example: "John Doe",
  required: false,
  clean: cleanStringInput,
});

const requestedDeliveryDate = input({
  label: "Requested Delivery Date",
  comments: "Requested delivery date.",
  type: "string",
  placeholder: "2024-02-28T14:06:55.723Z",
  example: "2024-02-28T14:06:55.723Z",
  required: false,
  clean: cleanStringInput,
});

const promisedDeliveryDate = input({
  label: "Promised Delivery Date",
  comments: "Promised delivery date.",
  type: "string",
  placeholder: "2024-02-28T14:06:55.723Z",
  example: "2024-02-28T14:06:55.723Z",
  required: false,
  clean: cleanStringInput,
});

const quotationExpiryDate = input({
  label: "Quotation Expiry Date",
  comments: "Quotation expiry date (only used for quotations).",
  type: "string",
  placeholder: "2024-02-28T14:06:55.723Z",
  example: "2024-02-28T14:06:55.723Z",
  required: false,
  clean: cleanStringInput,
});

const orderPriority = input({
  label: "Order Priority",
  comments: "Order priority.",
  type: "string",
  placeholder: "2",
  example: "2",
  required: false,
  clean: cleanStringInput,
});

const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that are not covered by the standard inputs. See [Sage 200 API documentation](https://developer.sage.com/200/reference/sop_orders) for more information.",
  required: false,
  example: JSON.stringify({ available_document_discount_percent: 20 }, null, 2),
  clean: cleanCodeInput,
});

export default {
  isEditing,
  isToSequenceLines,
  overrideOnHold,
  recalculatePrices,
  applyAvailableDocumentDiscountPercent,
  customerDeliveryAddressId,
  suppressWarnings,
  customerType,
  documentDate,
  exchangeRate,
  customerDocumentNo,
  useInvoiceAddress,
  isTriangulated,
  settlementDiscountDays,
  settlementDiscountPercent,
  documentDiscountPercent,
  documentCreatedBy,
  requestedDeliveryDate,
  promisedDeliveryDate,
  quotationExpiryDate,
  orderPriority,
  additionalFields,
};
