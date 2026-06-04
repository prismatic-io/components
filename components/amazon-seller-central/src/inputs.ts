import { input, util } from "@prismatic-io/spectral";
import { awsRegion as awsRegionInput } from "aws-utils";
import { pollResourceModel } from "./constants";
import marketplacesIds from "./marketplaces_ids.json";
import notificationTypes from "./notification_types.json";
import {
  jsonInputClean,
  sortedArray,
  valueListInputClean,
  valueListStringInputClean,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Amazon Seller Central connection to use.",
});

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

export const OrderStatuses = input({
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

export const spAPIEndpoints = input({
  label: "SP-API Endpoint",
  type: "string",
  placeholder: "Select SP-API endpoint",
  comments:
    "Selling Partner API endpoints are associated with a particular AWS Region. The AWS Region is important because it is part of the credential scope, which is required for calculating a signature when calling the Selling Partner API. [Learn more](https://developer-docs.amazon.com/sp-api/docs/sp-api-endpoints)",
  model: [
    {
      label: "North America (Canada, US, Mexico, and Brazil marketplaces)",
      value: "sellingpartnerapi-na.amazon.com",
    },
    {
      label:
        "Europe (Spain, UK, France, Belgium, Netherlands, Germany, Italy, Sweden, South Africa, Poland, Saudi Arabia, Egypt, Turkey, United Arab Emirates, and India marketplaces)",
      value: "sellingpartnerapi-eu.amazon.com",
    },
    {
      label: "Far East (Singapore, Australia, and Japan marketplaces)",
      value: "sellingpartnerapi-fe.amazon.com",
    },
  ],
  required: true,
  default: "sellingpartnerapi-na.amazon.com",
  clean: util.types.toString,
});

export const marketplaceId = input({
  label: "Marketplace Id",
  type: "string",
  placeholder: "Select marketplace",
  comments:
    "The marketplace identifier. See the [Marketplace IDs documentation](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids) for available marketplaces.",
  example: "ATVPDKIKX0DER",
  model: marketplacesIds.sort(sortedArray).map((marketplace) => ({
    value: marketplace.marketplaceId,
    label: `${marketplace.countryName} - ${marketplace.marketplaceId}`,
  })),
  required: true,
  clean: util.types.toString,
});

export const MarketplaceIds = input({
  label: "Marketplace Ids",
  type: "string",
  placeholder: "Select marketplaces",
  comments:
    "List of MarketplaceId values. Used to select orders that were placed in the specified marketplaces. See the [Marketplace IDs documentation](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids) for a complete list of marketplaceId values.",
  collection: "valuelist",
  model: marketplacesIds.sort(sortedArray).map((marketplace) => ({
    value: marketplace.marketplaceId,
    label: `${marketplace.countryName} - ${marketplace.marketplaceId}`,
  })),
  required: true,
  clean: valueListStringInputClean,
});

export const MarketplaceIdsBody = input({
  label: "Marketplace Ids",
  type: "string",
  placeholder: "Select marketplaces",
  comments:
    "List of MarketplaceId values. Used to select orders that were placed in the specified marketplaces. See the [Marketplace IDs documentation](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids) for a complete list of marketplaceId values.",
  collection: "valuelist",
  model: marketplacesIds.sort(sortedArray).map((marketplace) => ({
    value: marketplace.marketplaceId,
    label: `${marketplace.countryName} - ${marketplace.marketplaceId}`,
  })),
  required: true,
  clean: valueListInputClean,
});

export const FulfillmentChannels = input({
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

export const PaymentMethods = input({
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

export const BuyerEmail = input({
  label: "Buyer Email",
  type: "string",
  required: false,
  placeholder: "Enter buyer email address",
  comments:
    "The email address of a buyer. Used to select orders that contain the specified email address.",
  example: "buyer@example.com",
  clean: util.types.toString,
});

export const SellerOrderId = input({
  label: "Seller Order Id",
  type: "string",
  required: false,
  placeholder: "Enter seller order ID",
  comments:
    "An order identifier that is specified by the seller. Used to select only the orders that match the order identifier. <strong>Important:</strong> If SellerOrderId is specified, then FulfillmentChannels, OrderStatuses, PaymentMethod, LastUpdatedAfter, LastUpdatedBefore, and BuyerEmail cannot be specified.",
  example: "ORDER-12345",
  clean: util.types.toString,
});

export const MaxResultsPerPage = input({
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

export const EasyShipShipmentStatuses = input({
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

export const ElectronicInvoiceStatuses = input({
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

export const NextToken = input({
  label: "Next Token",
  type: "string",
  required: false,
  placeholder: "Enter next token",
  comments:
    "String token returned in the response of your previous request for pagination.",
  example: "amzn1.aos.4e9ba8a1-1234-5678-90ab-cdef12345678",
  clean: util.types.toString,
});

export const AmazonOrderId = input({
  label: "Amazon Order Id",
  type: "string",
  required: true,
  placeholder: "Enter Amazon order ID",
  comments: "An Amazon-defined order identifier in 3-7-7 format.",
  example: "123-1234567-1234567",
  clean: util.types.toString,
});

export const AmazonOrderIds = input({
  label: "Amazon Order Ids",
  type: "string",
  placeholder: "Enter Amazon order IDs",
  comments:
    "List of AmazonOrderId values. An AmazonOrderId is an Amazon-defined order identifier in 3-7-7 format.",
  collection: "valuelist",
  example: "123-1234567-1234567",
  clean: valueListStringInputClean,
});

export const ActualFulfillmentSupplySourceId = input({
  label: "Actual Fulfillment Supply Source Id",
  type: "string",
  required: false,
  placeholder: "Enter fulfillment supply source ID",
  comments:
    "Denotes the recommended sourceId where the order should be fulfilled from.",
  example: "SOURCE-12345",
  clean: util.types.toString,
});

export const IsISPU = input({
  label: "Is ISPU",
  type: "boolean",
  required: false,
  comments:
    "When true, this order is marked to be picked up from a store rather than delivered.",
  clean: util.types.toBool,
});

export const StoreChainStoreId = input({
  label: "Store Chain Store Id",
  type: "string",
  required: false,
  placeholder: "Enter store chain store ID",
  comments:
    "The store chain store identifier. Linked to a specific store in a store chain.",
  example: "STORE-12345",
  clean: util.types.toString,
});

export const orderId = input({
  label: "Order Id",
  type: "string",
  required: true,
  placeholder: "Enter order ID",
  comments: "An Amazon-defined order identifier in 3-7-7 format.",
  example: "123-1234567-1234567",
  clean: util.types.toString,
  dataSource: "selectOrder",
});

export const codCollectionMethod = input({
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

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated records in trigger results.",
  clean: util.types.toBool,
});

export const packageReferenceId = input({
  label: "Package Reference Id",
  type: "string",
  required: true,
  placeholder: "Enter package reference ID",
  comments:
    "A seller-supplied identifier that uniquely identifies a package within the scope of an order. Only positive numeric values are supported.",
  example: "12345",
  clean: util.types.toString,
});

export const carrierCode = input({
  label: "Carrier Code",
  type: "string",
  required: true,
  placeholder: "Enter carrier code",
  comments: "Identifies the carrier that will deliver the package.",
  example: "USPS",
  clean: util.types.toString,
});

export const carrierName = input({
  label: "Carrier Name",
  type: "string",
  required: false,
  placeholder: "Enter carrier name",
  comments:
    "Carrier name that will deliver the package. <strong>Important:</strong> Required when carrierCode is 'Others'.",
  example: "Amazon Logistics",
  clean: util.types.toString,
});

export const shippingMethod = input({
  label: "Shipping Method",
  type: "string",
  required: false,
  placeholder: "Enter shipping method",
  comments: "Ship method to be used for shipping the order.",
  example: "Standard",
  clean: util.types.toString,
});

export const trackingNumber = input({
  label: "Tracking Number",
  type: "string",
  required: true,
  placeholder: "Enter tracking number",
  comments:
    "The tracking number used to obtain tracking and delivery information.",
  example: "1Z999AA10123456784",
  clean: util.types.toString,
});

export const ShipDate = input({
  label: "Ship Date",
  type: "string",
  required: true,
  placeholder: "Enter ship date (ISO 8601)",
  comments: "The shipping date for the package in ISO 8601 date/time format.",
  example: "2024-03-15T14:30:00.000Z",
  clean: util.types.toString,
});

export const shipFromSupplySourceId = input({
  label: "Ship From Supply Source Id",
  type: "string",
  required: false,
  placeholder: "Enter supply source ID",
  comments: "The unique identifier of the supply source.",
  example: "SUPPLY-12345",
  clean: util.types.toString,
});

export const orderItems = input({
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

export const feedType = input({
  label: "Feed Type",
  type: "string",
  required: true,
  placeholder: "Enter feed type",
  comments:
    "The feed type. See the [Feeds API documentation](https://developer-docs.amazon.com/sp-api/docs/feeds-api-v2021-06-30-reference) for available feed types.",
  example: "POST_PRODUCT_DATA",
  clean: util.types.toString,
});

export const feedTypes = input({
  label: "Feed Types",
  type: "string",
  placeholder: "Enter feed types",
  comments:
    "List of feed types used to filter feeds. When feedTypes is provided, the other filter parameters (processingStatuses, marketplaceIds, createdSince, createdUntil) and pageSize may also be provided. <strong>Important:</strong> Either feedTypes or nextToken is required.",
  collection: "valuelist",
  example: "POST_PRODUCT_DATA",
  clean: valueListStringInputClean,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  comments: "The maximum number of feeds to return in a single call.",
  example: "25",
  default: "10",
  clean: util.types.toString,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter page token",
  comments:
    "Token to fetch a certain page when there are multiple pages worth of results.",
  example: "amzn1.page.12345678-90ab-cdef-1234-567890abcdef",
  clean: util.types.toString,
});

export const processingStatuses = input({
  label: "Processing Statuses",
  type: "string",
  collection: "valuelist",
  placeholder: "Select processing statuses",
  comments: "List of processing statuses used to filter feeds.",
  model: [
    {
      label: "CANCELLED",
      value: "CANCELLED",
    },
    {
      label: "DONE",
      value: "DONE",
    },
    {
      label: "FATAL",
      value: "FATAL",
    },
    {
      label: "IN_PROGRESS",
      value: "IN_PROGRESS",
    },
    {
      label: "IN_QUEUE",
      value: "IN_QUEUE",
    },
    {
      label: "",
      value: "",
    },
  ],
  clean: util.types.toString,
});

export const createdSince = input({
  label: "Created Since",
  type: "string",
  required: false,
  placeholder: "Enter created since date (ISO 8601)",
  comments:
    "The earliest feed creation date and time for feeds included in the response in ISO 8601 format. The default is 90 days ago. Feeds are retained for a maximum of 90 days.",
  example: "2024-01-01T00:00:00.000Z",
  default: new Date(Date.now() - 90 * (24 * 60 * 60 * 1000)).toISOString(), 
  clean: util.types.toString,
});

export const createdUntil = input({
  label: "Created Until",
  type: "string",
  required: false,
  placeholder: "Enter created until date (ISO 8601)",
  comments:
    "The latest feed creation date and time for feeds included in the response in ISO 8601 format. The default is now.",
  example: "2024-12-31T23:59:59.999Z",
  default: new Date().toISOString(),
  clean: util.types.toString,
});

export const feedId = input({
  label: "Feed Id",
  type: "string",
  required: true,
  placeholder: "Enter feed ID",
  comments:
    "The identifier for the feed. This identifier is unique only in combination with a seller ID.",
  example: "50017017797",
  clean: util.types.toString,
  dataSource: "selectFeed",
});

export const inputFeedDocumentId = input({
  label: "Input Feed Document Id",
  type: "string",
  required: true,
  placeholder: "Enter input feed document ID",
  comments:
    "The document identifier returned by the createFeedDocument operation. Upload the feed document contents before calling the createFeed operation.",
  example: "amzn1.tortuga.3.edbcd0d8-3434-8222-ac6f-bac123456789.T1URXX1LHU1Q",
  clean: util.types.toString,
});

export const feedDocumentId = input({
  label: "Feed Document Id",
  type: "string",
  required: true,
  placeholder: "Enter feed document ID",
  comments: "The identifier of the feed document.",
  example: "amzn1.tortuga.3.edbcd0d8-3434-8222-ac6f-bac123456789.T1URXX1LHU1Q",
  clean: util.types.toString,
});

export const feedOptions = input({
  label: "Feed Options",
  type: "code",
  language: "json",
  comments: "Additional options to control the feed. These vary by feed type.",
  clean: jsonInputClean,
  required: false,
});

export const contentType = input({
  label: "Content Type",
  type: "string",
  placeholder: "Enter content type",
  comments: "The content type of the feed.",
  clean: util.types.toString,
  required: true,
  example: "text/xml; charset=UTF-8",
});

export const identifiers = input({
  label: "Identifiers",
  type: "string",
  placeholder: "Enter product identifiers",
  comments:
    "List of product identifiers to search the Amazon catalog for. <strong>Important:</strong> Cannot be used with keywords.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "B07H65KP63",
});

export const identifiersType = input({
  label: "Identifiers Type",
  type: "string",
  placeholder: "Select identifier type",
  comments:
    "Type of product identifiers to search the Amazon catalog for. <strong>Important:</strong> Required when identifiers are provided.",
  model: [
    {
      label: "ASIN",
      value: "ASIN",
    },
    {
      label: "EAN",
      value: "EAN",
    },
    {
      label: "GTIN",
      value: "GTIN",
    },
    {
      label: "ISBN",
      value: "ISBN",
    },
    {
      label: "JAN",
      value: "JAN",
    },
    {
      label: "MINSAN",
      value: "MINSAN",
    },
    {
      label: "SKU",
      value: "SKU",
    },
    {
      label: "UPC",
      value: "UPC",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

export const includedData = input({
  label: "Included Data",
  type: "string",
  collection: "valuelist",
  placeholder: "Select data sets to include",
  comments: "List of data sets to include in the response. Default: summaries.",
  model: [
    {
      label: "attributes",
      value: "attributes",
    },
    {
      label: "dimensions",
      value: "dimensions",
    },
    {
      label: "identifiers",
      value: "identifiers",
    },
    {
      label: "images",
      value: "images",
    },
    {
      label: "productTypes",
      value: "productTypes",
    },
    {
      label: "relationships",
      value: "relationships",
    },
    {
      label: "salesRanks",
      value: "salesRanks",
    },
    {
      label: "summaries",
      value: "summaries",
    },
    {
      label: "vendorDetails",
      value: "vendorDetails",
    },
  ],
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  type: "string",
  placeholder: "Enter locale",
  comments:
    "Locale for retrieving localized summaries. Defaults to the primary locale of the marketplace.",
  required: false,
  clean: util.types.toString,
  example: "en_US",
});

export const sellerId = input({
  label: "Seller Id",
  type: "string",
  placeholder: "Enter seller ID",
  comments:
    "A selling partner identifier, such as a seller account or vendor code. <strong>Important:</strong> Required when identifiersType is SKU.",
  required: false,
  clean: util.types.toString,
  example: "A2EXAMPLE123456",
});

export const keywords = input({
  label: "Keywords",
  type: "string",
  placeholder: "Enter keywords",
  comments:
    "List of words to search the Amazon catalog for. <strong>Important:</strong> Cannot be used with identifiers.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "laptop",
});

export const brandNames = input({
  label: "Brand Names",
  type: "string",
  placeholder: "Enter brand names",
  comments:
    "List of brand names to limit the search for keywords-based queries. <strong>Important:</strong> Cannot be used with identifiers.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "Samsung",
});

export const classificationsIds = input({
  label: "Classification Ids",
  type: "string",
  placeholder: "Enter classification IDs",
  comments:
    "List of classification identifiers to limit the search for keywords-based queries. <strong>Important:</strong> Cannot be used with identifiers.",
  collection: "valuelist",
  required: false,
  clean: valueListStringInputClean,
  example: "12345678",
});

export const keywordsLocale = input({
  label: "Keywords Locale",
  type: "string",
  required: false,
  placeholder: "Enter keywords locale",
  comments:
    "The language of the keywords provided for keywords-based queries. Defaults to the primary locale of the marketplace. <strong>Important:</strong> Cannot be used with identifiers.",
  example: "en_US",
  clean: util.types.toString,
});

export const asin = input({
  label: "Amazon Standard Identification Number (ASIN)",
  type: "string",
  placeholder: "Enter ASIN",
  comments: "The Amazon Standard Identification Number (ASIN) of the item.",
  required: true,
  clean: util.types.toString,
  example: "B07H65KP63",
});

export const sku = input({
  label: "Stock Keeping Unit (SKU)",
  type: "string",
  placeholder: "Enter SKU",
  comments: "A selling partner provided identifier for an Amazon listing.",
  required: true,
  clean: util.types.toString,
  example: "MY-PRODUCT-SKU-001",
});

export const issueLocale = input({
  label: "Issue Locale",
  type: "string",
  placeholder: "Enter issue locale",
  comments:
    "A locale for localization of issues. When not provided, the default language code of the first marketplace is used. Examples: 'en_US', 'fr_CA', 'fr_FR'. Localized messages default to 'en_US' when a localization is not available in the specified locale.",
  required: false,
  clean: util.types.toString,
  example: "en_US",
});

export const productType = input({
  label: "Product Type",
  type: "string",
  placeholder: "Enter product type",
  comments: "The Amazon product type of the listings item.",
  required: true,
  example: "LUGGAGE",
  clean: util.types.toString,
});

export const requirements = input({
  label: "Requirements",
  type: "string",
  placeholder: "Select requirements set",
  comments: "The name of the requirements set for the provided data.",
  model: [
    {
      label: "LISTING",
      value: "LISTING",
    },
    {
      label: "LISTING_PRODUCT_ONLY",
      value: "LISTING_PRODUCT_ONLY",
    },
    {
      label: "LISTING_OFFER_ONLY",
      value: "LISTING_OFFER_ONLY",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

export const attributes = input({
  label: "Attributes",
  type: "code",
  language: "json",
  comments:
    "JSON object containing structured listings item attribute data keyed by attribute name.",
  example: JSON.stringify(
    {
      condition_type: [{ value: "new_new", marketplace_id: "ATVPDKIKX0DER" }],
      item_name: [
        { value: "Example Product Name", marketplace_id: "ATVPDKIKX0DER" },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const patches = input({
  label: "Patches",
  type: "code",
  language: "json",
  comments:
    "One or more JSON Patch operations to perform on the listings item.",
  example: JSON.stringify(
    [
      {
        op: "replace",
        path: "/attributes/fulfillment_availability",
        value: [{ fulfillment_channel_code: "DEFAULT", quantity: 10 }],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const shipmentId = input({
  label: "Shipment Id",
  type: "string",
  placeholder: "Enter shipment ID",
  comments: "The Amazon-defined shipment identifier for the shipment.",
  example: "6f77095e-9f75-47eb-aaab-a42d5428fa1a",
  clean: util.types.toString,
  required: true,
});

export const ShippingServiceId = input({
  label: "Shipping Service Id",
  type: "string",
  placeholder: "Enter shipping service ID",
  comments: "An Amazon-defined shipping service identifier.",
  example: "USPS-PTP-PRI",
  clean: util.types.toString,
  required: true,
});

export const ShippingServiceOfferId = input({
  label: "Shipping Service Offer Id",
  type: "string",
  placeholder: "Enter shipping service offer ID",
  comments: "Identifies a shipping service order made by a carrier.",
  example: "OFFER-12345",
  clean: util.types.toString,
  required: false,
});

export const HazmatType = input({
  label: "Hazmat Type",
  type: "string",
  placeholder: "Select hazmat type",
  comments:
    "Hazardous materials options for a package. Consult the terms and conditions for each carrier for more information about hazardous materials.",
  model: [
    {
      label: "None",
      value: "None",
    },
    {
      label: "LQHazmat",
      value: "LQHazmat",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

export const IncludePackingSlipWithLabel = input({
  label: "Include Packing Slip With Label",
  type: "boolean",
  comments: "When true, include a packing slip with the label.",
  clean: util.types.toBool,
  required: false,
});

export const ItemList = input({
  label: "Item List",
  type: "code",
  language: "json",
  comments: "The list of items to be included in a shipment.",
  example: JSON.stringify(
    [
      {
        orderItemId: "12345678901234",
        quantity: 1,
        ItemWeight: {
          Value: 2.5,
          Unit: "oz",
        },
        ItemDescription: "Product Description",
        TransparencyCodeList: ["AMZN1234567890"],
        ItemLevelSellerInputsList: [
          {
            AdditionalInputFieldName: "CustomField",
            AdditionalSellerInput: {
              DataType: "String",
              ValueAsString: "Custom Value",
            },
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const ShipFromAddress = input({
  label: "Ship From Address",
  type: "code",
  language: "json",
  comments: "The address of the sender.",
  example: JSON.stringify(
    {
      Name: "John Doe",
      AddressLine1: "123 Main Street",
      AddressLine2: "Suite 100",
      AddressLine3: "",
      DistrictOrCounty: "",
      Email: "seller@example.com",
      City: "Seattle",
      StateOrProvinceCode: "WA",
      PostalCode: "98101",
      CountryCode: "US",
      Phone: "206-555-0123",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const PackageDimensions = input({
  label: "Package Dimensions",
  type: "code",
  language: "json",
  comments: "The package dimensions.",
  example: JSON.stringify(
    {
      Length: 12.5,
      Width: 10.0,
      Height: 8.0,
      Unit: "inches",
      PredefinedPackageDimensions: "FedEx_Box_10kg",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const Weight = input({
  label: "Weight",
  type: "string",
  placeholder: "Select weight unit",
  comments: "The package weight unit.",
  model: [
    {
      label: "oz",
      value: "oz",
    },
    {
      label: "g",
      value: "g",
    },
  ],
  required: true,
  clean: util.types.toString,
});

export const MustArriveByDate = input({
  label: "Must Arrive By Date",
  type: "string",
  placeholder: "Enter must arrive by date (ISO 8601)",
  comments:
    "The date by which the package must arrive to keep the promise to the customer in ISO 8601 datetime format. If MustArriveByDate is specified, only shipping service offers that can be delivered by that date are returned.",
  example: "2024-03-20T23:59:59.999Z",
  clean: util.types.toString,
  required: false,
});

export const ShippingServiceOptions = input({
  label: "Shipping Service Options",
  type: "code",
  language: "json",
  comments: "Extra services offered by the carrier.",
  example: JSON.stringify(
    {
      DeliveryExperience: "DeliveryConfirmationWithAdultSignature",
      DeclaredValue: {
        CurrencyCode: "USD",
        Amount: 100.0,
      },
      CarrierWillPickUp: true,
      CarrierWillPickUpOption: "ShipperWillDropOff",
      LabelFormat: "ZPL203",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const LabelCustomization = input({
  label: "Label Customization",
  type: "code",
  language: "json",
  comments: "Label customization options.",
  example: JSON.stringify(
    {
      CustomTextForLabel: "FRAGILE - HANDLE WITH CARE",
      StandardIdForLabel: "AmazonOrderId",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const ShipmentLevelSellerInputsList = input({
  label: "Shipment Level Seller Inputs List",
  type: "code",
  language: "json",
  comments: "Additional seller-provided inputs for the shipment.",
  example: JSON.stringify(
    [
      {
        AdditionalInputFieldName: "ShipmentNote",
        AdditionalSellerInput: {
          DataType: "String",
          ValueAsString: "Rush delivery requested",
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const subscriptionId = input({
  label: "Subscription Id",
  type: "string",
  placeholder: "Enter subscription ID",
  comments: "The identifier for the subscription that you want to get.",
  example: "7fcacc7e-727b-11e9-8848-1681be663d3e",
  clean: util.types.toString,
  required: true,
  dataSource: "selectSubscription",
});

export const notificationType = input({
  label: "Notification Type",
  type: "string",
  placeholder: "Select notification type",
  comments:
    "The type of notification. See the [Notifications API documentation](https://developer-docs.amazon.com/sp-api/docs/notifications-api-v1-reference) for available notification types.",
  model: notificationTypes.map((notificationType) => ({
    value: notificationType,
    label: notificationType,
  })),
  required: true,
  clean: util.types.toString,
});

export const payloadVersion = input({
  label: "Payload Version",
  type: "string",
  placeholder: "Enter payload version",
  comments: "The version of the payload object to be used in the notification.",
  required: false,
  example: "1.0",
  clean: util.types.toString,
});

export const destinationId = input({
  label: "Destination Id",
  type: "string",
  placeholder: "Enter destination ID",
  comments:
    "The identifier for the destination where notifications will be delivered.",
  required: false,
  example: "amzn1.sp-api.destination.12345678-90ab-cdef-1234-567890abcdef",
  clean: util.types.toString,
  dataSource: "selectDestinations",
});

export const aggregationTimePeriod = input({
  label: "Aggregation Time Period",
  type: "string",
  placeholder: "Select aggregation time period",
  comments:
    "The supported aggregation time periods. For example, if FiveMinutes is the value chosen, and 50 price updates occur for an ASIN within 5 minutes, Amazon will send only two notifications; one for the first event, and then a subsequent notification 5 minutes later with the final end state of the data. The 48 interim events will be dropped.",
  model: [
    {
      label: "FiveMinutes",
      value: "FiveMinutes",
    },
    {
      label: "TenMinutes",
      value: "TenMinutes",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  required: false,
  clean: util.types.toString,
});

export const orderChangeTypes = input({
  label: "Order Change Types",
  type: "string",
  collection: "valuelist",
  placeholder: "Select order change types",
  comments:
    "List of order change types to subscribe to (e.g. BuyerRequestedChange). To receive notifications of all change types, do not provide this list.",
  model: [
    {
      label: "OrderStatusChange",
      value: "OrderStatusChange",
    },
    {
      label: "BuyerRequestedChange",
      value: "BuyerRequestedChange",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  clean: valueListInputClean,
});

export const eventFilterType = input({
  label: "Event Filter Type",
  type: "string",
  placeholder: "Select event filter type",
  comments:
    "An eventFilterType value that is supported by the specific notificationType. This is used by the subscription service to determine the type of event filter. Refer to the [Notifications Use Case Guide](https://developer-docs.amazon.com/sp-api/docs/notifications-api-v1-use-case-guide) for the specific notificationType to determine if an eventFilterType is supported.",
  model: [
    {
      label: "ANY_OFFER_CHANGED",
      value: "ANY_OFFER_CHANGED",
    },
    {
      label: "ORDER_CHANGE",
      value: "ORDER_CHANGE",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  required: false,
  clean: util.types.toString,
});

export const destinationName = input({
  label: "Name",
  type: "string",
  placeholder: "Enter destination name",
  comments: "A developer-defined name to help identify this destination.",
  required: true,
  example: "MyNotificationDestination",
  clean: util.types.toString,
});

export const arn = input({
  label: "ARN",
  type: "string",
  placeholder: "Enter ARN",
  comments: "The Amazon Resource Name (ARN) associated with the SQS queue.",
  required: false,
  example: "arn:aws:sqs:us-east-1:123456789012:my-notification-queue",
  clean: util.types.toString,
});

export const awsRegion = awsRegionInput;

export const accountId = input({
  label: "Account Id",
  type: "string",
  placeholder: "Enter AWS account ID",
  comments:
    "The identifier for the AWS account that is responsible for charges related to receiving notifications.",
  required: false,
  example: "123456789012",
  clean: util.types.toString,
});
