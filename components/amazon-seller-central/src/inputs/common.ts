import { input, util } from "@prismatic-io/spectral";
import marketplacesIds from "../marketplaces_ids.json";
import notificationTypes from "../notification_types.json";
import {
  sortedArray,
  valueListInputClean,
  valueListStringInputClean,
} from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Amazon Seller Central connection to use.",
});

export const spAPIEndpoints = input({
  label: "SP-API Endpoint",
  type: "string",
  placeholder: "Select SP-API endpoint",
  comments:
    "Selling Partner API endpoints are associated with a particular AWS Region. The AWS Region is important because it is part of the credential scope, which is required for calculating a signature when calling the Selling Partner API. [Learn more](https://developer-docs.amazon/sp-api/docs/sp-api-endpoints)",
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

export const MarketplaceIds = input({
  label: "Marketplace IDs",
  type: "string",
  placeholder: "Select marketplaces",
  comments:
    "List of MarketplaceId values. Used to select orders that were placed in the specified marketplaces. See the [Marketplace IDs documentation](https://developer-docs.amazon/sp-api/docs/marketplace-ids) for a complete list of marketplaceId values.",
  collection: "valuelist",
  model: marketplacesIds.sort(sortedArray).map((marketplace) => ({
    value: marketplace.marketplaceId,
    label: `${marketplace.countryName} - ${marketplace.marketplaceId}`,
  })),
  required: true,
  clean: valueListStringInputClean,
});

export const MarketplaceIdsBody = input({
  label: "Marketplace IDs",
  type: "string",
  placeholder: "Select marketplaces",
  comments:
    "List of MarketplaceId values. Used to select orders that were placed in the specified marketplaces. See the [Marketplace IDs documentation](https://developer-docs.amazon/sp-api/docs/marketplace-ids) for a complete list of marketplaceId values.",
  collection: "valuelist",
  model: marketplacesIds.sort(sortedArray).map((marketplace) => ({
    value: marketplace.marketplaceId,
    label: `${marketplace.countryName} - ${marketplace.marketplaceId}`,
  })),
  required: true,
  clean: valueListInputClean,
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

export const SellerOrderId = input({
  label: "Seller Order ID",
  type: "string",
  required: false,
  placeholder: "Enter seller order ID",
  comments:
    "An order identifier that is specified by the seller. Used to select only the orders that match the order identifier. <strong>Important:</strong> If SellerOrderId is specified, then FulfillmentChannels, OrderStatuses, PaymentMethod, LastUpdatedAfter, LastUpdatedBefore, and BuyerEmail cannot be specified.",
  example: "ORDER-12345",
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

export const destinationId = input({
  label: "Destination ID",
  type: "string",
  placeholder: "Enter destination ID",
  comments:
    "The identifier for the destination where notifications will be delivered.",
  required: false,
  example: "amzn1.sp-api.destination.12345678-90ab-cdef-1234-567890abcdef",
  clean: util.types.toString,
  dataSource: "selectDestinations",
});

export const notificationType = input({
  label: "Notification Type",
  type: "string",
  placeholder: "Select notification type",
  comments:
    "The type of notification. See the [Notifications API documentation](https://developer-docs.amazon/sp-api/docs/notifications-api-v1-reference) for available notification types.",
  model: notificationTypes.map((notificationType) => ({
    value: notificationType,
    label: notificationType,
  })),
  required: true,
  clean: util.types.toString,
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
