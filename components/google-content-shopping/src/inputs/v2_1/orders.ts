import { input, util } from "@prismatic-io/spectral";
import {
  jsonInputClean,
  toOptionalString,
  valueListInputClean,
} from "../../util";
import { connectionInput, fetchAll, merchantId, pagination } from "./common";
const orderId = input({
  label: "Order ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Google-generated order ID. Found in the Merchant Center Orders dashboard or returned when listing orders. This ID is used to retrieve, update, or manage specific order details.",
  example: "12345678901234567890",
  placeholder: "Enter Order ID",
  required: true,
});
const returnId = input({
  label: "Return ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Google-generated merchant order return ID. Found in Merchant Center under Orders > Returns or returned when listing order returns. Used to retrieve, update, or process return details.",
  example: "1234567890123456",
  placeholder: "Enter Return ID",
  required: true,
});
const operationId = input({
  label: "Operation ID",
  type: "string",
  clean: toOptionalString,
  comments:
    "The ID of the operation. Unique across all operations for a given order.",
  example: "OP-123456",
  placeholder: "Enter Operation ID",
  required: false,
});
const fullChargeReturnShippingCost = input({
  label: "Full Charge Return Shipping Cost",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, the customer will be charged for return shipping costs.",
  required: false,
});
const placedDateStart = input({
  label: "Placed Date Start",
  type: "string",
  clean: toOptionalString,
  comments:
    "Obtains orders placed after this date (inclusively), in ISO 8601 format.",
  example: "2024-01-01T00:00:00Z",
  placeholder: "Enter Start Date (ISO 8601 Format)",
  required: false,
});
const placedDateEnd = input({
  label: "Placed Date End",
  type: "string",
  clean: toOptionalString,
  comments:
    "Obtains orders placed before this date (inclusively), in ISO 8601 format.",
  example: "2024-12-31T23:59:59Z",
  placeholder: "Enter End Date (ISO 8601 Format)",
  required: false,
});
const reasonText = input({
  label: "Reason Text",
  type: "string",
  clean: toOptionalString,
  comments: "The explanation of the reason.",
  example: "Customer requested cancellation",
  placeholder: "Enter Reason Text",
  required: false,
});
const createdStartDate = input({
  label: "Created Start Date",
  type: "string",
  clean: toOptionalString,
  comments:
    "Obtains order returns created after this date (inclusively), in ISO 8601 format.",
  example: "2024-01-01T00:00:00Z",
  placeholder: "Enter Start Date (ISO 8601 Format)",
  required: false,
});
const createdEndDate = input({
  label: "Created End Date",
  type: "string",
  clean: toOptionalString,
  comments:
    "Obtains order returns created before this date (inclusively), in ISO 8601 format.",
  example: "2024-12-31T23:59:59Z",
  placeholder: "Enter End Date (ISO 8601 Format)",
  required: false,
});
const acknowledged = input({
  label: "Acknowledged",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, filters for orders that have been acknowledged. When false, filters for orders that have not been acknowledged.",
  required: false,
});
const returnMethodType = input({
  label: "Return Method Type",
  type: "string",
  clean: toOptionalString,
  comments: "The way of the package being returned.",
  example: "SHIP_TO_MERCHANT",
  placeholder: "Enter Return Method Type",
  required: false,
});
const orderBy = input({
  label: "Order By",
  type: "string",
  clean: toOptionalString,
  comments: "Order results by placement date in descending or ascending order.",
  placeholder: "Select sort order",
  model: [
    {
      label: "PLACED DATE ASC",
      value: "placedDateAsc",
    },
    {
      label: "PLACED DATE DESC",
      value: "placedDateDesc",
    },
  ],
  required: false,
});
const statuses = input({
  label: "Statuses",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains orders that match any of the specified statuses. Note: 'active' is a shortcut for pendingShipment and partiallyShipped; 'completed' is a shortcut for shipped, delivered, returned, and canceled.",
  example: "active",
  placeholder: "Select order statuses",
  clean: valueListInputClean,
});
const reason = input({
  label: "Reason",
  type: "string",
  clean: toOptionalString,
  comments: "The reason for the cancellation.",
  placeholder: "Select cancellation reason",
  required: false,
  model: [
    {
      label: "customerInitiatedCancel",
      value: "customerInitiatedCancel",
    },
    {
      label: "invalidCoupon",
      value: "invalidCoupon",
    },
    {
      label: "malformedShippingAddress",
      value: "malformedShippingAddress",
    },
    {
      label: "noInventory",
      value: "noInventory",
    },
    {
      label: "other",
      value: "other",
    },
    {
      label: "priceError",
      value: "priceError",
    },
    {
      label: "shippingPriceError",
      value: "shippingPriceError",
    },
    {
      label: "taxError",
      value: "taxError",
    },
    {
      label: "undeliverableShippingAddress",
      value: "undeliverableShippingAddress",
    },
    {
      label: "unsupportedPoBoxAddress",
      value: "unsupportedPoBoxAddress",
    },
    {
      label: "failedToCaptureFunds",
      value: "failedToCaptureFunds",
    },
  ],
});
const shipmentTypes = input({
  label: "Shipment Types",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns that match any shipment type provided in this parameter. When this parameter is not provided, order returns are obtained regardless of their shipment types.",
  example: "STANDARD",
  placeholder: "Enter Shipment Types",
  clean: valueListInputClean,
});
const shipmentStatus = input({
  label: "Shipment Status",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns that match any shipment status provided in this parameter. When this parameter is not provided, order returns are obtained regardless of their shipment statuses.",
  example: "DELIVERED",
  placeholder: "Enter Shipment Statuses",
  clean: valueListInputClean,
});
const shipmentStates = input({
  label: "Shipment States",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns that match any shipment state provided in this parameter. When this parameter is not provided, order returns are obtained regardless of their shipment states.",
  example: "SHIPPED",
  placeholder: "Enter Shipment States",
  clean: valueListInputClean,
});
const googleOrderIds = input({
  label: "Google Order IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns with the specified order ids. If this parameter is provided, createdStartDate, createdEndDate, shipmentType, shipmentStatus, shipmentState and acknowledged parameters must be not set. Note: if googleOrderId and shipmentTrackingNumber parameters are provided, the obtained results will include all order returns that either match the specified order id or the specified tracking number.",
  example: "12345678901234567890",
  placeholder: "Enter Google Order IDs",
  clean: valueListInputClean,
});
const shipmentTrackingNumbers = input({
  label: "Shipping Tracking Numbers",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns with the specified tracking numbers. If this parameter is provided, createdStartDate, createdEndDate, shipmentType, shipmentStatus, shipmentState and acknowledged parameters must be not set. Note: if googleOrderId and shipmentTrackingNumber parameters are provided, the obtained results will include all order returns that either match the specified order id or the specified tracking number.",
  example: "1Z999AA10123456784",
  placeholder: "Enter Tracking Numbers",
  clean: valueListInputClean,
});
const lineItems = input({
  label: "Line Items",
  type: "code",
  language: "json",
  comments: "The list of line items to return.",
  example: JSON.stringify([
    {
      lineItemId: "string",
      productId: "string",
      quantity: "integer",
    },
  ]),
  clean: jsonInputClean,
});
const returnItems = input({
  label: "Return Items",
  type: "code",
  language: "json",
  comments: "The list of items to return.",
  example: JSON.stringify([
    {
      returnItemId: "string",
      refund: {
        returnRefundReason: "string",
        fullRefund: false,
        partialRefund: {
          priceAmount: {
            value: "string",
            currency: "string",
          },
          taxAmount: {
            value: "string",
            currency: "string",
          },
        },
        reasonText: "string",
        paymentType: "string",
      },
      reject: {
        reason: "string",
        reasonText: "string",
      },
    },
  ]),
  clean: jsonInputClean,
});
const refundShippingFee = input({
  label: "Refund Shipping Fee",
  type: "code",
  language: "json",
  comments: "Refunds for original shipping fee.",
  example: JSON.stringify([
    {
      returnRefundReason: "string",
      fullRefund: false,
      partialRefund: {
        priceAmount: {
          value: "string",
          currency: "string",
        },
        taxAmount: {
          value: "string",
          currency: "string",
        },
      },
      reasonText: "string",
      paymentType: "string",
    },
  ]),
  clean: jsonInputClean,
});
export const cancelOrderInputs = {
  connectionInput,
  merchantId,
  orderId,
  operationId,
  reason,
  reasonText,
};
export const getOrderInputs = {
  connectionInput,
  merchantId,
  orderId,
};
export const listOrdersInputs = {
  connectionInput,
  merchantId,
  fetchAll,
  pagination,
  statuses,
  placedDateStart,
  placedDateEnd,
  orderBy,
  acknowledged,
};
export const createOrderReturnInputs = {
  connectionInput,
  merchantId,
  orderId,
  operationId,
  lineItems,
  returnMethodType,
};
export const getOrderReturnInputs = {
  connectionInput,
  merchantId,
  returnId,
};
export const listReturnsOrdersInputs = {
  connectionInput,
  merchantId,
  fetchAll,
  pagination,
  orderBy,
  createdStartDate,
  createdEndDate,
  shipmentTypes,
  shipmentStatus,
  shipmentStates,
  acknowledged,
  googleOrderIds,
  shipmentTrackingNumbers,
};
export const processOrderReturnInputs = {
  connectionInput,
  merchantId,
  returnId,
  operationId,
  returnItems,
  fullChargeReturnShippingCost,
  refundShippingFee,
};
