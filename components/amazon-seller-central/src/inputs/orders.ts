import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import marketplacesIds from "../marketplaces_ids.json";
import {
  jsonInputClean,
  sortedArray,
  valueListStringInputClean,
} from "../util";
import {
  connectionInput,
  MarketplaceIds,
  NextToken,
  SellerOrderId,
  ShipDate,
} from "./common";

export const CreatedAfter = input({
  label: "Created After",
  type: "string",
  required: false,
  placeholder: "Enter created after date (ISO 8601)",
  comments:
    "Date used for selecting orders created after (or at) a specified time in ISO 8601 format. Only orders placed after the specified time are returned. Either the CreatedAfter parameter or the LastUpdatedAfter parameter is required.",
  example: "2024-01-15T10:30:00.000Z",
  clean: util.types.toString,
});

export const CreatedBefore = input({
  label: "Created Before",
  type: "string",
  required: false,
  placeholder: "Enter created before date (ISO 8601)",
  comments:
    "Date used for selecting orders created before (or at) a specified time in ISO 8601 format. Only orders placed before the specified time are returned.",
  example: "2024-12-31T23:59:59.999Z",
  clean: util.types.toString,
});

export const LastUpdatedAfter = input({
  label: "Last Updated After",
  type: "string",
  required: false,
  placeholder: "Enter last updated after date (ISO 8601)",
  comments:
    "Date used for selecting orders that were last updated after (or at) a specified time in ISO 8601 format. An update is defined as any change in order status, including the creation of a new order. Includes updates made by Amazon and by the seller.",
  example: "2024-01-15T10:30:00.000Z",
  clean: util.types.toString,
});

export const LastUpdatedBefore = input({
  label: "Last Updated Before",
  type: "string",
  required: false,
  placeholder: "Enter last updated before date (ISO 8601)",
  comments:
    "Date used for selecting orders that were last updated before (or at) a specified time in ISO 8601 format. An update is defined as any change in order status, including the creation of a new order. Includes updates made by Amazon and by the seller.",
  example: "2024-12-31T23:59:59.999Z",
  clean: util.types.toString,
});

const OrderStatuses = input({
  label: "Order Statuses",
  type: "string",
  comments:
    "List of OrderStatus values used to filter the results. Select one or more of: PendingAvailability, Pending, Unshipped, PartiallyShipped, Shipped, Canceled, Unfulfillable, or InvoiceUnconfirmed.",
  collection: "valuelist",
  placeholder: "Select order statuses",
  model: [
    { value: "PendingAvailability", label: "PendingAvailability" },
    { value: "Pending", label: "Pending" },
    { value: "Unshipped", label: "Unshipped" },
    { value: "PartiallyShipped", label: "PartiallyShipped" },
    { value: "Shipped", label: "Shipped" },
    { value: "Canceled", label: "Canceled" },
    { value: "Unfulfillable", label: "Unfulfillable" },
    { value: "InvoiceUnconfirmed", label: "InvoiceUnconfirmed" },
    { value: "", label: "" },
  ],
  clean: valueListStringInputClean,
});

const marketplaceId = input({
  label: "Marketplace ID",
  type: "string",
  placeholder: "Select marketplace",
  comments:
    "The marketplace identifier. See the [Marketplace IDs documentation](https://developer-docs.amazon/sp-api/docs/marketplace-ids) for available marketplaces.",
  example: "ATVPDKIKX0DER",
  model: marketplacesIds.sort(sortedArray).map((marketplace) => ({
    value: marketplace.marketplaceId,
    label: `${marketplace.countryName} - ${marketplace.marketplaceId}`,
  })),
  required: true,
  clean: util.types.toString,
});

const FulfillmentChannels = input({
  label: "Fulfillment Channels",
  type: "string",
  placeholder: "Select fulfillment channels",
  comments:
    "List that indicates how an order was fulfilled. Filters the results by fulfillment channel. Possible values: AFN (Fulfillment by Amazon); MFN (Fulfilled by the seller).",
  collection: "valuelist",
  model: [
    {
      label: "AFN",
      value: "AFN",
    },
    {
      label: "MFN",
      value: "MFN",
    },
    {
      label: "",
      value: "",
    },
  ],
  clean: valueListStringInputClean,
});

const PaymentMethods = input({
  label: "Payment Methods",
  type: "string",
  placeholder: "Select payment methods",
  comments:
    "List of payment method values. Used to select orders paid using the specified payment methods. Possible values: COD (Cash on delivery); CVS (Convenience store payment); Other (Any payment method other than COD or CVS).",
  collection: "valuelist",
  model: [
    {
      label: "COD (Cash on delivery)",
      value: "COD",
    },
    {
      label: "CVS (Convenience store payment)",
      value: "CVS",
    },
    {
      label: "Other (Any payment method other than COD or CVS)",
      value: "Other",
    },
    {
      label: "",
      value: "",
    },
  ],
  clean: valueListStringInputClean,
});

const BuyerEmail = input({
  label: "Buyer Email",
  type: "string",
  required: false,
  placeholder: "Enter buyer email address",
  comments:
    "The email address of a buyer. Used to select orders that contain the specified email address.",
  example: "buyer@example.com",
  clean: util.types.toString,
});

const MaxResultsPerPage = input({
  label: "Max Results Per Page",
  type: "string",
  required: false,
  placeholder: "Enter max results per page",
  comments:
    "Maximum number of orders that can be returned per page. Value must be 1 - 100. Default 100.",
  example: "50",
  default: "100",
  clean: util.types.toString,
});

const EasyShipShipmentStatuses = input({
  label: "Easy Ship Shipment Statuses",
  type: "string",
  placeholder: "Select Easy Ship shipment statuses",
  comments:
    "List of EasyShipShipmentStatus values. Used to select Easy Ship orders with statuses that match the specified values. If EasyShipShipmentStatus is specified, only Amazon Easy Ship orders are returned.",
  collection: "valuelist",
  model: [
    {
      label: "PendingSchedule",
      value: "PendingSchedule",
    },
    {
      label: "PendingPickUp",
      value: "PendingPickUp",
    },
    {
      label: "PendingDropOff",
      value: "PendingDropOff",
    },
    {
      label: "LabelCanceled",
      value: "LabelCanceled",
    },
    {
      label: "PickedUp",
      value: "PickedUp",
    },
    {
      label: "DroppedOff",
      value: "DroppedOff",
    },
    {
      label: "AtOriginFC",
      value: "AtOriginFC",
    },
    {
      label: "AtDestinationFC",
      value: "AtDestinationFC",
    },
    {
      label: "Delivered",
      value: "Delivered",
    },
    {
      label: "RejectedByBuyer",
      value: "RejectedByBuyer",
    },
    {
      label: "Undeliverable",
      value: "Undeliverable",
    },
    {
      label: "ReturningToSeller",
      value: "ReturningToSeller",
    },
    {
      label: "ReturnedToSeller",
      value: "ReturnedToSeller",
    },
    {
      label: "Lost",
      value: "Lost",
    },
    {
      label: "OutForDelivery",
      value: "OutForDelivery",
    },
    {
      label: "Damaged",
      value: "Damaged",
    },
    {
      label: "",
      value: "",
    },
  ],
  clean: valueListStringInputClean,
});

const ElectronicInvoiceStatuses = input({
  label: "Electronic Invoice Statuses",
  type: "string",
  placeholder: "Select electronic invoice statuses",
  comments:
    "List of ElectronicInvoiceStatus values. Used to select orders with electronic invoice statuses that match the specified values.",
  collection: "valuelist",
  model: [
    {
      label: "NotRequired",
      value: "NotRequired",
    },
    {
      label: "NotFound",
      value: "NotFound",
    },
    {
      label: "Processing",
      value: "Processing",
    },
    {
      label: "Errored",
      value: "Errored",
    },
    {
      label: "Accepted",
      value: "Accepted",
    },
    {
      label: "",
      value: "",
    },
  ],
  clean: valueListStringInputClean,
});

const AmazonOrderIds = input({
  label: "Amazon Order IDs",
  type: "string",
  placeholder: "Enter Amazon order IDs",
  comments:
    "List of AmazonOrderId values. An AmazonOrderId is an Amazon-defined order identifier in 3-7-7 format.",
  collection: "valuelist",
  example: "123-1234567-1234567",
  clean: valueListStringInputClean,
});

const ActualFulfillmentSupplySourceId = input({
  label: "Actual Fulfillment Supply Source ID",
  type: "string",
  required: false,
  placeholder: "Enter fulfillment supply source ID",
  comments:
    "Denotes the recommended sourceId where the order should be fulfilled from.",
  example: "SOURCE-12345",
  clean: util.types.toString,
});

const IsISPU = input({
  label: "Is ISPU",
  type: "boolean",
  required: false,
  comments:
    "When true, this order is marked to be picked up from a store rather than delivered.",
  clean: util.types.toBool,
});

const StoreChainStoreId = input({
  label: "Store Chain Store ID",
  type: "string",
  required: false,
  placeholder: "Enter store chain store ID",
  comments:
    "The store chain store identifier. Linked to a specific store in a store chain.",
  example: "STORE-12345",
  clean: util.types.toString,
});

const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  placeholder: "Enter order ID",
  comments: "An Amazon-defined order identifier in 3-7-7 format.",
  example: "123-1234567-1234567",
  clean: util.types.toString,
  dataSource: "selectOrder",
});

const codCollectionMethod = input({
  label: "COD Collection Method",
  type: "string",
  placeholder: "Select COD collection method",
  comments: "The COD collection method. Supported in Japan marketplace only.",
  model: [
    {
      label: "DirectPayment",
      value: "DirectPayment",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

const packageReferenceId = input({
  label: "Package Reference ID",
  type: "string",
  required: true,
  placeholder: "Enter package reference ID",
  comments:
    "A seller-supplied identifier that uniquely identifies a package within the scope of an order. Only positive numeric values are supported.",
  example: "12345",
  clean: util.types.toString,
});

const carrierCode = input({
  label: "Carrier Code",
  type: "string",
  required: true,
  placeholder: "Enter carrier code",
  comments: "Identifies the carrier that will deliver the package.",
  example: "USPS",
  clean: util.types.toString,
});

const carrierName = input({
  label: "Carrier Name",
  type: "string",
  required: false,
  placeholder: "Enter carrier name",
  comments:
    "Carrier name that will deliver the package. <strong>Important:</strong> Required when carrierCode is 'Others'.",
  example: "Amazon Logistics",
  clean: util.types.toString,
});

const shippingMethod = input({
  label: "Shipping Method",
  type: "string",
  required: false,
  placeholder: "Enter shipping method",
  comments: "Ship method to be used for shipping the order.",
  example: "Standard",
  clean: util.types.toString,
});

const trackingNumber = input({
  label: "Tracking Number",
  type: "string",
  required: true,
  placeholder: "Enter tracking number",
  comments:
    "The tracking number used to obtain tracking and delivery information.",
  example: "1Z999AA10123456784",
  clean: util.types.toString,
});

const shipFromSupplySourceId = input({
  label: "Ship From Supply Source Id",
  type: "string",
  required: false,
  placeholder: "Enter supply source ID",
  comments: "The unique identifier of the supply source.",
  example: "SUPPLY-12345",
  clean: util.types.toString,
});

const orderItems = input({
  label: "Order Items",
  type: "code",
  language: "json",
  comments: "The list of order items and quantities to be updated.",
  default: JSON.stringify(
    [
      {
        orderItemId: "79039765272157",
        quantity: 1,
        transparencyCodes: ["09876543211234567890"],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const listOrdersPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments:
    "Pagination controls: includes Max Results Per Page and Next Token.",
  inputs: { MaxResultsPerPage, NextToken },
});

const listOrdersFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments:
    "Optional query controls to refine the results: includes Created Before, Last Updated Before, Buyer Email, and Is ISPU.",
  inputs: { CreatedBefore, LastUpdatedBefore, BuyerEmail, IsISPU },
});

const confirmOrderShipmentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Carrier Name, Shipping Method, and COD Collection Method.",
  inputs: { carrierName, shippingMethod, codCollectionMethod },
});

export const listOrdersInputs = {
  connectionInput,
  MarketplaceIds,
  CreatedAfter,
  LastUpdatedAfter,
  OrderStatuses,
  FulfillmentChannels,
  PaymentMethods,
  SellerOrderId,
  EasyShipShipmentStatuses,
  ElectronicInvoiceStatuses,
  AmazonOrderIds,
  ActualFulfillmentSupplySourceId,
  StoreChainStoreId,
  pagination: listOrdersPagination,
  filters: listOrdersFilters,
};

export const getOrderInputs = {
  connectionInput,
  orderId,
};

export const getOrderAddressInputs = {
  connectionInput,
  orderId,
};

export const getOrderBuyerInfoInputs = {
  connectionInput,
  orderId,
};

export const getOrderItemsInputs = {
  connectionInput,
  orderId,
  NextToken,
};

export const getOrderItemsBuyerInfoInputs = {
  connectionInput,
  orderId,
};

export const confirmOrderShipmentInputs = {
  connectionInput,
  orderId,
  marketplaceId,
  packageReferenceId,
  carrierCode,
  trackingNumber,
  shipDate: ShipDate,
  orderItems,
  shipFromSupplySourceId,
  additionalFields: confirmOrderShipmentAdditionalFields,
};
