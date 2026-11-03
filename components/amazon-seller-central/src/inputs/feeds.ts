import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { jsonInputClean, valueListStringInputClean } from "../util";
import {
  connectionInput,
  MarketplaceIds,
  MarketplaceIdsBody,
  NextToken,
  pageSize,
} from "./common";

const feedType = input({
  label: "Feed Type",
  type: "string",
  required: true,
  placeholder: "Enter feed type",
  comments:
    "The feed type. See the [Feeds API documentation](https://developer-docs.amazon/sp-api/docs/feeds-api-v2021-06-30-reference) for available feed types.",
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

const feedId = input({
  label: "Feed ID",
  type: "string",
  required: true,
  placeholder: "Enter feed ID",
  comments:
    "The identifier for the feed. This identifier is unique only in combination with a seller ID.",
  example: "50017017797",
  clean: util.types.toString,
  dataSource: "selectFeed",
});

const inputFeedDocumentId = input({
  label: "Input Feed Document ID",
  type: "string",
  required: true,
  placeholder: "Enter input feed document ID",
  comments:
    "The document identifier returned by the createFeedDocument operation. Upload the feed document contents before calling the createFeed operation.",
  example: "amzn1.tortuga.3.edbcd0d8-3434-8222-ac6f-bac123456789.T1URXX1LHU1Q",
  clean: util.types.toString,
});

const feedDocumentId = input({
  label: "Feed Document ID",
  type: "string",
  required: true,
  placeholder: "Enter feed document ID",
  comments: "The identifier of the feed document.",
  example: "amzn1.tortuga.3.edbcd0d8-3434-8222-ac6f-bac123456789.T1URXX1LHU1Q",
  clean: util.types.toString,
});

const feedOptions = input({
  label: "Feed Options",
  type: "code",
  language: "json",
  comments: "Additional options to control the feed. These vary by feed type.",
  clean: jsonInputClean,
  required: false,
});

const contentType = input({
  label: "Content Type",
  type: "string",
  placeholder: "Enter content type",
  comments: "The content type of the feed.",
  clean: util.types.toString,
  required: true,
  example: "text/xml; charset=UTF-8",
});

const listFeedsPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and continuation token for paginated results.",
  inputs: { pageSize, nextToken: NextToken },
});

export const listFeedsInputs = {
  connectionInput,
  feedTypes,
  marketplaceIds: { ...MarketplaceIds, required: false },
  processingStatuses,
  createdSince,
  createdUntil,
  pagination: listFeedsPagination,
};

export const createFeedInputs = {
  connectionInput,
  feedType,
  marketplaceIds: MarketplaceIdsBody,
  inputFeedDocumentId,
  feedOptions,
};

export const createFeedDocumentInputs = {
  connectionInput,
  contentType,
};

export const getFeedInputs = {
  connectionInput,
  feedId,
};

export const cancelFeedInputs = {
  connectionInput,
  feedId,
};

export const getFeedDocumentInputs = {
  connectionInput,
  feedDocumentId,
};
