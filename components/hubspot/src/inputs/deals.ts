import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalProperties,
  after,
  archived,
  associationsList,
  connectionInput,
  dynamicValues,
  fetchAll,
  fieldValues,
  hubspotOwnerId,
  pagination,
  timeout,
  value,
} from "./common";
import { operator, propertyName } from "./search";
const amount = input({
  label: "Amount",
  type: "string",
  required: false,
  placeholder: "Enter amount",
  comments: "The amount value for the deal.",
  example: "34,000",
  clean: toOptionalString,
});
const closeDate = input({
  label: "Close Date",
  type: "string",
  required: false,
  placeholder: "Enter close date",
  comments: "The date when the sale will close.",
  example: "2019-12-07T16:50:06.678Z",
  clean: toOptionalString,
});
const dealName = input({
  label: "Deal Name",
  type: "string",
  required: true,
  placeholder: "Enter deal name",
  comments: "The display name for the deal, visible in the deals pipeline.",
  example: "My Example Deal",
  clean: util.types.toString,
});
const updateDealName = input({
  label: "Deal Name",
  type: "string",
  required: false,
  placeholder: "Enter deal name",
  comments: "The updated display name for the deal.",
  example: "My Example Deal",
  clean: toOptionalString,
});
const dealId = input({
  label: "Deal ID",
  type: "string",
  required: true,
  placeholder: "Enter Deal ID",
  comments: "The unique identifier of the deal.",
  dataSource: "selectDeal",
  example: "804874",
  clean: util.types.toString,
});
const dealStage = input({
  label: "Deal Stage",
  type: "string",
  required: true,
  placeholder: "Enter deal stage",
  comments:
    "The stage of the deal. Deal stages categorize deals and track their progress.",
  example: "presentationscheduled",
  clean: util.types.toString,
});
const updateDealStage = input({
  label: "Deal Stage",
  type: "string",
  required: false,
  placeholder: "Enter deal stage",
  comments:
    "The stage of the deal. Deal stages categorize deals and track their progress.",
  example: "presentationscheduled",
  clean: toOptionalString,
});
const pipeline = input({
  label: "Pipeline",
  type: "string",
  required: true,
  placeholder: "Enter pipeline",
  example: "default",
  comments: "The pipeline to interact with.",
  clean: util.types.toString,
});
const updatePipeline = input({
  label: "Pipeline",
  type: "string",
  required: false,
  placeholder: "Enter pipeline",
  example: "default",
  comments: "The pipeline to interact with.",
  clean: toOptionalString,
});
const dealType = input({
  label: "Deal Type",
  type: "string",
  required: false,
  placeholder: "Enter deal type",
  example: "newbusiness",
  comments:
    "The type of deal. By default, a deal is categorized as either New Business or Existing Business. The picklist of values for this property is configurable through HubSpot.",
  clean: toOptionalString,
});
const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  model: [
    { label: "low", value: "low" },
    { label: "medium", value: "medium" },
    { label: "high", value: "high" },
  ],
  comments: "The priority level assigned to the deal: low, medium, or high.",
  clean: toOptionalString,
});
export const listDealsInputs = {
  hubspotConnection: connectionInput,
  archived,
  additionalProperties,
  associationsList,
  timeout,
  fetchAll,
  pagination,
};
export const createDealInputs = {
  amount,
  closeDate,
  dealName,
  hubspotOwnerId,
  pipeline,
  dealStage,
  priority,
  dealType,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const updateDealInputs = {
  dealId,
  amount,
  closeDate,
  updateDealName,
  hubspotOwnerId,
  updatePipeline,
  updateDealStage,
  priority,
  dealType,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const deleteDealInputs = {
  dealId,
  timeout,
  hubspotConnection: connectionInput,
};
export const getDealByIdInputs = {
  dealId: { ...dealId, required: false, clean: toOptionalString },
  dealName: { ...dealName, required: false, clean: toOptionalString },
  additionalProperties,
  associationsList,
  archived,
  timeout,
  hubspotConnection: connectionInput,
};
const searchLimit = input({
  label: "Limit",
  type: "string",
  required: false,
  default: "100",
  example: "100",
  comments: "The maximum number of items that will be returned by the search.",
  clean: (value: unknown): number => util.types.toInt(value, 100),
});
const searchPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor-based pagination: page size and cursor token.",
  inputs: { limit: searchLimit, after },
});
export const searchDealsInputs = {
  propertyName,
  value,
  operator,
  pagination: searchPagination,
  timeout,
  hubspotConnection: connectionInput,
};
