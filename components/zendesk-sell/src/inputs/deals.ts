import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

const createUpdateValue = input({
  label: "Value",
  comments: "Value of the deal in decimal format (e.g., two decimal places).",
  placeholder: "Enter deal value",
  example: "5000.00",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const createUpdateCurrency = input({
  label: "Currency",
  comments:
    "The currency code for the deal value. If omitted, the account default currency is used.",
  placeholder: "Enter currency code",
  example: "USD",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const createUpdateTags = input({
  label: "Tags",
  comments: "Tags to apply.",
  placeholder: "Enter tags",
  type: "string",
  collection: "valuelist",
  required: false,
  example: "important",
});

const lastStageChangeAt = input({
  label: "Last Stage Change At",
  comments:
    "Date and time when the deal was moved into the current stage in UTC (ISO8601 format).",
  placeholder: "Enter last stage change date (ISO8601)",
  example: "2014-09-27T16:32:56Z",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addedAt = input({
  label: "Added At",
  comments: "Date and time that the deal was started in UTC (ISO8601 format).",
  placeholder: "Enter added date (ISO8601)",
  example: "2014-09-27T16:32:56Z",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const createUpdateEstimatedCloseDate = input({
  label: "Estimated Close Date",
  comments: "Expected date when the deal will close.",
  placeholder: "Enter estimated close date (YYYY-MM-DD)",
  example: "2024-06-30",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const customizedWinLikelihood = input({
  label: "Customized Win Likelihood",
  comments: "User-provided win likelihood with value range 0-100.",
  placeholder: "Enter win likelihood (0-100)",
  example: "75",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const createUpdateSourceId = input({
  label: "Source ID",
  placeholder: "Enter Source ID",
  example: "12345678",
  comments: "The unique identifier of the source that originated the deal.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const lossReasonId = input({
  label: "Loss Reason ID",
  placeholder: "Enter Loss Reason ID",
  example: "12345678",
  comments: "The unique identifier of the reason the deal was marked as lost.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const unqualifiedReasonId = input({
  label: "Unqualified Reason ID",
  placeholder: "Enter Unqualified Reason ID",
  example: "12345678",
  comments: "The unique identifier of the reason the deal was unqualified.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sortBy = input({
  label: "Sort By",
  comments: "A field to sort by. Filterable custom fields can also be used.",
  placeholder: "Enter field to sort by",
  example: "name",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of deal IDs to be returned in a request.",
  placeholder: "Enter comma-separated IDs",
  example: "12345678,87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const includes = input({
  label: "Includes",
  comments:
    "Comma-separated list of one or more resources related to the deal. Possible values: associated_contacts.",
  placeholder: "Enter related resources",
  example: "associated_contacts",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const creatorId = input({
  label: "Creator ID",
  comments:
    "Unique identifier of the user the deal was created by. Returns all deals created by the user.",
  placeholder: "Enter Creator ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerId = input({
  label: "Owner ID",
  placeholder: "Enter Owner ID",
  example: "12345678",
  comments: "The unique identifier of the user who owns the deal.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerIdFilter = input({
  label: "Owner ID",
  placeholder: "Enter Owner ID",
  example: "12345678",
  comments:
    "Unique identifier of the user the deal is owned by. Returns all deals owned by the user.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const contactId = input({
  label: "Contact ID",
  placeholder: "Enter Contact ID",
  example: "87654321",
  comments: "Unique identifier of a primary contact.",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const organizationId = input({
  label: "Organization ID",
  comments: "Unique identifier of an organization.",
  placeholder: "Enter Organization ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const hot = input({
  label: "Hot",
  comments: "Indicator of whether or not the deal is hot.",
  placeholder: "Select whether deal is hot",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const sourceId = input({
  label: "Source ID",
  placeholder: "Enter Source ID",
  example: "12345678",
  comments: "Filters results to deals that originated from this source.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const stageId = input({
  label: "Stage ID",
  placeholder: "Enter Stage ID",
  example: "12345678",
  comments: "The unique identifier of the pipeline stage for this deal.",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectStage",
});

const stageIdFilter = input({
  label: "Stage ID",
  placeholder: "Enter Stage ID",
  example: "12345678",
  comments: "Filters results to deals currently in this pipeline stage.",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectStage",
});

const name = input({
  label: "Name",
  placeholder: "Enter name",
  example: "Q1 Enterprise Deal",
  comments: "A descriptive title identifying the deal in the pipeline.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const nameFilter = input({
  label: "Name",
  placeholder: "Enter name",
  example: "Q1 Enterprise Deal",
  comments: "Filters results to deals whose name matches this value.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const value = input({
  label: "Value",
  comments: "Value of the deal. Use a string with two decimal places.",
  placeholder: "Enter deal value",
  example: "5000.00",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const estimatedCloseDate = input({
  label: "Estimated Close Date",
  comments: "Estimated close date of the deal.",
  placeholder: "Enter estimated close date (YYYY-MM-DD)",
  example: "2024-06-30",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const inclusive = input({
  label: "Inclusive",
  comments:
    "Indicates how filters should be combined. true value, the default, uses AND logic. false value uses OR logic to combine filters.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "Number of records to return per page. Default limit is _25_ and the maximum number that can be returned is _100_.",
  placeholder: "Enter results per page",
  example: "25",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const customFields = input({
  label: "Custom Fields",
  comments: "Custom field key-value pairs.",
  placeholder: "Enter custom field key-value pairs",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  example: "key: external_id value: SKU01",
});

const createDealName = input({
  label: "Name",
  placeholder: "Enter name",
  comments: "A descriptive title identifying the deal in the pipeline.",
  example: "Q1 Enterprise Deal",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const createDealContactId = input({
  label: "Contact ID",
  comments:
    "The unique identifier of the primary contact associated with the deal.",
  placeholder: "Enter Contact ID",
  example: "87654321",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const dealId = input({
  label: "Deal ID",
  comments: "The unique identifier of the deal.",
  placeholder: "Enter deal ID",
  example: "12345678",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectDeal",
});

const streamPosition = input({
  label: "Position",
  comments:
    "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
  placeholder: "Enter stream position",
  example: "top",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const streamLimit = input({
  label: "Limit",
  comments: "The maximum number of events to return in a single response.",
  placeholder: "Enter limit",
  example: "100",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, perPage },
});

const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields for the request. Includes: Sort By, Includes, Inclusive, Value, Hot, and Estimated Close Date.",
  inputs: {
    sortBy,
    includes,
    inclusive,
    value,
    hot,
    estimatedCloseDate,
  },
});

export const createDealInputs = {
  connection,
  name: createDealName,

  value: createUpdateValue,

  currency: createUpdateCurrency,

  customFields,

  tags: createUpdateTags,

  hot,
  lastStageChangeAt,
  addedAt,
  estimatedCloseDate: createUpdateEstimatedCloseDate,
  customizedWinLikelihood,

  contactId: createDealContactId,

  ownerId,

  stageId,

  sourceId: createUpdateSourceId,

  lossReasonId,

  unqualifiedReasonId,
};

export const deleteDealInputs = {
  connection,
  id: dealId,
};

export const getDealInputs = {
  connection,
  id: dealId,
  includes,
};

export const getDealsStreamInputs = {
  connection,
  position: streamPosition,
  limit: streamLimit,
};

export const listDealsInputs = {
  connection,
  fetchAll,
  name: nameFilter,
  ids,
  creatorId,
  ownerId: ownerIdFilter,
  contactId,
  organizationId,
  sourceId,
  stageId: stageIdFilter,
  customFields,
  pagination,
  additionalFields,
};

export const updateDealInputs = {
  connection,
  id: dealId,
  name,

  value: createUpdateValue,

  currency: createUpdateCurrency,

  customFields,

  tags: createUpdateTags,

  hot,
  lastStageChangeAt,
  addedAt,
  estimatedCloseDate: createUpdateEstimatedCloseDate,
  customizedWinLikelihood,

  contactId,

  ownerId,

  stageId,

  sourceId: createUpdateSourceId,

  lossReasonId,

  unqualifiedReasonId,
};
