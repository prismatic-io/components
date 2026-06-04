import { input, util } from "@prismatic-io/spectral";
import {
  getTopicsInputModel,
  jsonInputClean,
  valueListInputClean,
  valueListStringInputClean,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ShipBob connection to use.",
});

export const version = input({
  label: "Version",
  type: "string",
  required: true,
  default: "1.0",
  placeholder: "Enter API version",
  example: "1.0",
  comments: "The version of the ShipBob API to use",
  clean: util.types.toString,
});

export const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  placeholder: "Enter Order ID",
  example: "123456789",
  comments: "The order ID to retrieve",
  dataSource: "selectOrder",
  clean: util.types.toString,
});

export const productId = input({
  label: "Product ID",
  type: "string",
  required: true,
  placeholder: "Enter Product ID",
  example: "987654",
  comments: "The product ID to retrieve",
  dataSource: "products",
  clean: util.types.toString,
});

export const inventoryId = input({
  label: "Inventory ID",
  type: "string",
  required: true,
  placeholder: "Enter Inventory ID",
  example: "456789",
  comments: "The inventory ID to retrieve",
  dataSource: "inventory",
  clean: util.types.toString,
});

export const shipmentId = input({
  label: "Shipment ID",
  type: "string",
  required: true,
  placeholder: "Enter Shipment ID",
  example: "789012",
  comments: "The shipment ID to retrieve",
  clean: util.types.toString,
});

export const receivingId = input({
  label: "Receiving ID",
  type: "string",
  required: true,
  placeholder: "Enter Receiving ID",
  example: "345678",
  comments: "ID of the receiving order",
  dataSource: "selectReceivingOrder",
  clean: util.types.toString,
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  placeholder: "Enter Webhook ID",
  example: "234567",
  comments: "ID of the webhook",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const shipbob_channel_id = input({
  label: "ShipBob Channel ID",
  type: "string",
  required: false,
  placeholder: "Enter Channel ID",
  example: "567890",
  comments: "Channel ID for operation",
  dataSource: "selectChannel",
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. Page and Limit inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

export const Page = input({
  label: "Page",
  type: "string",
  required: false,
  placeholder: "Enter page number",
  example: "1",
  comments: "Page number of orders to retrieve",
  clean: util.types.toString,
});

export const Limit = input({
  label: "Limit",
  type: "string",
  required: false,
  placeholder: "Enter limit",
  example: "50",
  comments: "Number of orders per page to retrieve",
  clean: util.types.toString,
});

export const IDs = input({
  label: "Order IDs",
  type: "string",
  required: false,
  placeholder: "Enter order IDs",
  example: "123456,789012,345678",
  comments: "Comma-separated list of order IDs to filter by",
  clean: util.types.toString,
});

export const ReferenceIds = input({
  label: "Reference IDs",
  type: "string",
  required: false,
  placeholder: "Enter reference IDs",
  example: "REF-001,REF-002,REF-003",
  comments: "Comma-separated list of reference IDs to filter by",
  clean: util.types.toString,
});

export const StartDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2025-01-01",
  comments:
    "Start date to filter orders inserted on or after this date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const EndDate = input({
  label: "End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2025-12-31",
  comments:
    "End date to filter orders inserted on or before this date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const SortOrder = input({
  label: "Sort Order",
  type: "string",
  required: false,
  placeholder: "Select sort order",
  example: "Newest",
  comments: "Order to sort results. Options: Newest, Oldest",
  clean: util.types.toString,
});

export const HasTracking = input({
  label: "Has Tracking",
  type: "boolean",
  required: false,
  comments:
    "When true, filters to orders that have been assigned a tracking number",
  clean: util.types.toBool,
});

export const LastUpdateStartDate = input({
  label: "Last Update Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2025-01-01",
  comments:
    "Start date to filter orders updated on or after this date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const LastUpdateEndDate = input({
  label: "Last Update End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2025-12-31",
  comments:
    "End date to filter orders updated on or before this date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const IsTrackingUploaded = input({
  label: "Is Tracking Uploaded",
  type: "boolean",
  required: false,
  comments:
    "When true, filters to orders with tracking information fully uploaded",
  clean: util.types.toBool,
});

export const LastTrackingUpdateStartDate = input({
  label: "Last Tracking Update Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2025-01-01",
  comments:
    "Start date to filter orders with tracking updates on or after this date (YYYY-MM-DD). Only returns orders with tracking information",
  clean: util.types.toString,
});

export const LastTrackingUpdateEndDate = input({
  label: "Last Tracking Update End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2025-12-31",
  comments:
    "End date to filter orders with tracking updates on or before this date (YYYY-MM-DD). Only returns orders with tracking information",
  clean: util.types.toString,
});

export const DeliveryStartDate = input({
  label: "Delivery Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2025-01-01",
  comments:
    "Start date to filter orders with delivery date on or after this date (YYYY-MM-DD). Only returns orders with tracking information",
  clean: util.types.toString,
});

export const DeliveryEndDate = input({
  label: "Delivery En Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2025-12-31",
  comments:
    "End date to filter orders with delivery date on or before this date (YYYY-MM-DD). Only returns orders with tracking information",
  clean: util.types.toString,
});

export const FulfillmentStartDate = input({
  label: "Fulfillment Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2025-01-01",
  comments:
    "Start date to filter orders with fulfillment date on or after this date (YYYY-MM-DD). Only returns orders with tracking information",
  clean: util.types.toString,
});

export const FulfillmentEndDate = input({
  label: "Fulfillment End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2025-12-31",
  comments:
    "End date to filter orders with fulfillment date on or before this date (YYYY-MM-DD). Only returns orders with tracking information",
  clean: util.types.toString,
});

export const shipping_method = input({
  label: "Shipping Method",
  type: "string",
  required: true,
  placeholder: "Enter shipping method",
  example: "Standard",
  comments:
    "Client-defined shipping method matching what the user has listed as the shipping method on the Ship Option Mapping setup page in the ShipBob Merchant Portal. If they don't match, a new one will be created and defaulted to Standard",
  clean: util.types.toString,
});

export const recipient = input({
  label: "Recipient",
  type: "code",
  language: "json",
  comments: "Information about the recipient of an order",
  example: JSON.stringify(
    {
      name: "John Doe",
      address: "123 Main St, Apt 4B, New York, NY 10001",
      email: "john.doe@example.com",
      phone_number: "+1-555-123-4567",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const products = input({
  label: "Products",
  type: "code",
  language: "json",
  comments:
    "Products included in the order. Products identified by reference_id must also include the product name if there is no matching ShipBob product",
  example: JSON.stringify(
    [
      {
        id: 987654,
        quantity: 2,
        quantity_unit_of_measure_code: "EA",
        external_line_id: 1001,
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const reference_id = input({
  label: "Reference ID",
  type: "string",
  required: true,
  placeholder: "Enter reference ID",
  example: "ORD-2025-001234",
  comments: "Unique and immutable order identifier from your upstream system",
  clean: util.types.toString,
});

export const order_number = input({
  label: "Order Number",
  type: "string",
  required: false,
  placeholder: "Enter order number",
  example: "ORDER-12345",
  comments:
    "User-friendly order ID or store order number that will be shown on the Orders Page. If not provided, reference ID will be used",
  clean: util.types.toString,
});

export const type = input({
  label: "Type",
  type: "string",
  required: false,
  placeholder: "Select type",
  example: "DTC",
  comments:
    "Order type. Options: DTC (Direct to Consumer), DropShip. Defaults to DTC if not provided. Note: B2B is not currently supported",
  clean: util.types.toString,
});

export const tags = input({
  label: "Tags",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Enter key-value pairs",
  example: '{"priority": "high", "source": "shopify"}',
  comments:
    "Key-value pairs to store extra information at the order level for API purposes. ShipBob won't display the info in the ShipBob Merchant Portal or react based on this data",
});

export const shipment_ids = input({
  label: "Shipment IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter shipment IDs",
  example: '["789012", "789013", "789014"]',
  comments: "List of shipment IDs to cancel",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const purchase_date = input({
  label: "Purchase Date",
  type: "string",
  required: false,
  placeholder: "Enter purchase date",
  example: "2025-01-15",
  comments: "Date this order was purchased by the end user (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const location_id = input({
  label: "Location ID",
  type: "string",
  required: false,
  placeholder: "Enter Location ID",
  example: "12345",
  comments:
    "Desired fulfillment center location ID. If not specified, ShipBob will determine the location that fulfills this order",
  dataSource: "locations",
  clean: util.types.toString,
});

export const shipping_terms = input({
  label: "Shipping Terms",
  type: "code",
  language: "json",
  comments: "Shipping properties to be used for fulfilling an order",
  example: JSON.stringify(
    {
      carrier_type: "UPS",
      payment_term: "Prepaid",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const retailer_program_data = input({
  label: "Retailer Program Data",
  type: "code",
  language: "json",
  comments: "Retailer-specific program data for fulfilling orders",
  example: JSON.stringify(
    {
      purchase_order_number: "PO-12345",
      retailer_program_type: "Amazon",
      mark_for_store: "Store-NY-001",
      department: "Electronics",
      delivery_date: "2025-02-15",
      addresses: [
        {
          type: "MarkFor",
          required: "true",
          address1: "456 Warehouse Rd",
          address2: "Building A",
          city: "New York",
          state: "NY",
          country: "US",
          zip_code: "10002",
        },
      ],
      customer_ticket_number: "TKT-789012",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const gift_message = input({
  label: "Gift Message",
  type: "string",
  required: false,
  placeholder: "Enter gift message",
  example: "Happy Birthday! Enjoy your gift!",
  comments: "Gift message to include with the order",
  clean: util.types.toString,
});

export const financials = input({
  label: "Financials",
  type: "code",
  language: "json",
  comments: "Sum of all line item prices, discounts, and taxes in USD",
  example: JSON.stringify(
    {
      total_price: 149.99,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const Statuses = input({
  label: "Statuses",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Select statuses",
  example: '["Processing", "Completed"]',
  comments:
    "List of WRO statuses to filter by. Options: Awaiting, Processing, Completed, Cancelled, Incomplete, Arrived, PartiallyArrived",
  default: ["000xxx"],
  clean: valueListStringInputClean,
});

export const InsertStartDate = input({
  label: "Insert Start Date",
  type: "string",
  required: false,
  placeholder: "Enter start date",
  example: "2025-01-01",
  comments: "Earliest date that a WRO was created (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const InsertEndDate = input({
  label: "Insert End Date",
  type: "string",
  required: false,
  placeholder: "Enter end date",
  example: "2025-12-31",
  comments: "Latest date that a WRO was created (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const FulfillmentCenterIds = input({
  label: "Fulfillment Center IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter fulfillment center IDs",
  example: '["12345", "67890"]',
  comments: "List of WRO fulfillment center IDs to filter by",
  default: ["000xxx"],
  clean: valueListStringInputClean,
});

export const PurchaseOrderNumbers = input({
  label: "Purchase Order Numbers",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter purchase order numbers",
  example: '["PO-12345", "PO-67890"]',
  comments: "List of WRO purchase order numbers to filter by",
  default: ["000xxx"],
  clean: valueListStringInputClean,
});

export const fulfillment_center = input({
  label: "Fulfillment Center",
  type: "code",
  language: "json",
  comments:
    "Information that assigns a receiving order to a fulfillment center. If the fulfillment center is in a receiving hub region, the response will be the receiving hub location",
  example: JSON.stringify(
    {
      id: 12345,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const package_type = input({
  label: "Package Type",
  type: "string",
  placeholder: "Select package type",
  example: "Package",
  comments: "Type of package for the shipment",
  clean: util.types.toString,
  model: [
    {
      label: "Package",
      value: "Package",
    },
    {
      label: "Pallet",
      value: "Pallet",
    },
    {
      label: "FloorLoadedContainer",
      value: "FloorLoadedContainer",
    },
  ],
  required: true,
});

export const box_packaging_type = input({
  label: "Box Packaging Type",
  type: "string",
  placeholder: "Select box packaging type",
  example: "OneSkuPerBox",
  comments: "How items are packaged in boxes",
  clean: util.types.toString,
  model: [
    {
      label: "EverythingInOneBox",
      value: "EverythingInOneBox",
    },
    {
      label: "OneSkuPerBox",
      value: "OneSkuPerBox",
    },
    {
      label: "MultipleSkuPerBox",
      value: "MultipleSkuPerBox",
    },
  ],
  required: true,
});

export const boxes = input({
  label: "Boxes",
  type: "code",
  language: "json",
  comments: "Box shipments to be added to this receiving order",
  example: JSON.stringify(
    [
      {
        tracking_number: "1Z999AA10123456784",
        box_items: [
          {
            quantity: 50,
            inventory_id: 456789,
            lot_number: "LOT-2025-001",
            lot_date: "2025-01-15",
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

export const expected_arrival_date = input({
  label: "Expected Arrival Date",
  type: "string",
  required: true,
  placeholder: "Enter expected arrival date",
  example: "2025-02-01",
  comments:
    "Expected arrival date of all the box shipments in this receiving order (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const purchase_order_number = input({
  label: "Purchase Order Number",
  type: "string",
  required: false,
  placeholder: "Enter purchase order number",
  example: "PO-2025-12345",
  comments: "Purchase order number for this receiving order",
  clean: util.types.toString,
});

export const Topic = input({
  label: "Topic",
  type: "string",
  placeholder: "Select webhook topic",
  example: "order_shipped",
  comments: "Topic of the webhook to subscribe to",
  clean: util.types.toString,
  model: getTopicsInputModel(),
});

export const subscription_url = input({
  label: "Subscription URL",
  type: "string",
  required: true,
  placeholder: "Enter subscription URL",
  example: "https://example.com/webhook/shipbob",
  comments:
    "URL to call when an event matching the subscription topic is raised. Must have SSL enabled (https) and accept POST requests with content type application/json",
  clean: util.types.toString,
});

export const IncludeInactive = input({
  label: "Include Inactive",
  type: "boolean",
  required: false,
  comments: "When true, includes inactive locations in the results",
  clean: util.types.toBool,
});

export const ReceivingEnabled = input({
  label: "Receiving Enabled",
  type: "boolean",
  required: false,
  comments: "When true, returns only receiving-enabled locations",
  clean: util.types.toBool,
});

export const AccessGranted = input({
  label: "Access Granted",
  type: "boolean",
  required: false,
  comments: "When true, returns only locations with access granted",
  clean: util.types.toBool,
});

export const Search = input({
  label: "Search",
  type: "string",
  required: false,
  placeholder: "Enter search term",
  example: "Widget-A",
  comments: "Search term to filter by Inventory ID or Name",
  clean: util.types.toString,
});

export const ActiveStatus = input({
  label: "Active Status",
  type: "string",
  placeholder: "Select active status",
  example: "Active",
  comments: "Filter by active status",
  clean: util.types.toString,
  model: [
    {
      label: "Any",
      value: "Any",
    },
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Inactive",
      value: "Inactive",
    },
  ],
  required: false,
});

export const BundleStatus = input({
  label: "Bundle Status",
  type: "string",
  placeholder: "Select bundle status",
  example: "NotBundle",
  comments: "Filter by bundle status",
  clean: util.types.toString,
  model: [
    {
      label: "Any",
      value: "Any",
    },
    {
      label: "Bundle",
      value: "Bundle",
    },
    {
      label: "NotBundle",
      value: "NotBundle",
    },
  ],
  required: false,
});

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  placeholder: "Enter product name",
  example: "Blue Widget Pro",
  comments: "The name of the product",
  clean: util.types.toString,
});

export const sku = input({
  label: "Sku",
  type: "string",
  required: false,
  placeholder: "Enter SKU",
  example: "SKU-WDG-BLU-001",
  comments: "The stock keeping unit (SKU) of the product",
  clean: util.types.toString,
});

export const barcode = input({
  label: "Barcode",
  type: "string",
  required: false,
  placeholder: "Enter barcode",
  example: "012345678901",
  comments: "Barcode for the product",
  clean: util.types.toString,
});

export const gtin = input({
  label: "GTIN",
  type: "string",
  required: false,
  placeholder: "Enter GTIN",
  example: "00012345678905",
  comments:
    "Global Trade Item Number - unique and internationally recognized identifier assigned to item by company GS1",
  clean: util.types.toString,
});

export const upc = input({
  label: "UPC",
  type: "string",
  required: false,
  placeholder: "Enter UPC",
  example: "012345678901",
  comments: "Universal Product Code (UPC) - unique external identifier",
  clean: util.types.toString,
});

export const unit_price = input({
  label: "Unit Price",
  type: "string",
  required: false,
  placeholder: "Enter unit price",
  example: "29.99",
  comments: "The price of one unit in USD",
  clean: util.types.toNumber,
});

export const IsActive = input({
  label: "IsActive",
  type: "boolean",
  required: false,
  comments: "When true, marks the inventory as active",
  clean: util.types.toBool,
});

export const IsDigital = input({
  label: "IsDigital",
  type: "boolean",
  required: false,
  comments: "When true, marks the inventory as digital (non-physical)",
  clean: util.types.toBool,
});

export const Sort = input({
  label: "Sort",
  type: "string",
  required: false,
  placeholder: "Enter sort fields",
  example: "-onHand,name",
  comments:
    "Sort field(s) in ascending order (default). Prefix field with '-' for descending order. Example: -onHand,name sorts by onHand descending, then name ascending",
  clean: util.types.toString,
});

export const LocationType = input({
  label: "Location Type",
  type: "string",
  required: false,
  placeholder: "Select location type",
  example: "hub",
  comments:
    "Location type to filter by. Options: hub, spoke, lts. Defaults to all locations if not specified",
  clean: util.types.toString,
});

export const topicsToSubscribe = input({
  type: "string",
  collection: "valuelist",
  label: "Topics to Subscribe",
  placeholder: "Select topics",
  example: '["order_shipped", "order_cancelled"]',
  model: getTopicsInputModel(),
  comments: "List of webhook topics to subscribe to",
  required: true,
  clean: valueListInputClean,
});

export const overwriteWebhookSettings = input({
  type: "boolean",
  label: "Overwrite Webhook Settings",
  required: false,
  default: "false",
  comments:
    "When true, deletes existing webhook settings pointing to this flow's URL and creates new ones",
  clean: util.types.toBool,
});
