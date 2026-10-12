import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  dealIdInput,
  dealStatus,
  fetchAll,
  filterId,
  mixedPagination,
  productIdInput,
  sortBy,
  sortDirection,
  sortInput,
  stageId,
} from "./common";
import { cleanNumber, cleanString } from "../util";
const dealPersonId = input({
  label: "Person ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of a person which this deal will be linked to",
  example: "123",
  placeholder: "Enter Person ID",
});
const dealOrgId = input({
  label: "Org ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of an organization which this deal will be linked to",
  example: "123",
  placeholder: "Enter Organization ID",
});
const dealPipelineId = input({
  label: "Pipeline ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the pipeline this deal will be added to",
  example: "123",
  placeholder: "Enter Pipeline ID",
});
const dealStageId = input({
  label: "Stage ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the stage this deal will be added to",
  example: "123",
  placeholder: "Enter Stage ID",
});
const addDealTitle = input({
  label: "Title",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The display name shown in the Pipedrive deals pipeline.",
  example: "Q1 Software License Deal",
  placeholder: "Enter deal title",
});
const addDealAdditionalFieldsValue = input({
  label: "Value",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The monetary amount associated with the deal, in the specified currency.",
  example: "5000",
  placeholder: "Enter deal value",
});
const addDealAdditionalFieldsCurrency = input({
  label: "Currency",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The three-letter ISO 4217 currency code for the deal value (e.g. USD, EUR).",
  example: "USD",
  placeholder: "Enter currency code",
});
const addDealStatus = input({
  label: "Status",
  type: "string",
  required: false,
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanString,
  comments: "The current lifecycle status of the deal.",
});
const addDealExpectedCloseDate = input({
  label: "Expected Close Date",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The expected close date of the deal",
  example: "2024-12-31",
  placeholder: "Enter date (YYYY-MM-DD)",
});
const addDealProbability = input({
  label: "Probability",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The success probability percentage of the deal",
  example: "75",
  placeholder: "Enter probability percentage",
});
const addDealLostReason = input({
  label: "Lost Reason",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The optional message about why the deal was lost (to be used when status = lost)",
  example: "Budget constraints",
  placeholder: "Enter reason for losing deal",
});
const addDealVisibleTo = input({
  label: "Visible To",
  type: "string",
  required: false,
  model: [
    { label: "1", value: "1" },
    { label: "3", value: "3" },
    { label: "5", value: "5" },
    { label: "7", value: "7" },
  ],
  clean: cleanString,
  comments:
    "Controls which users can see this record. 1 = owner only, 3 = owner's group, 5 = owner's group and sub-groups, 7 = entire company.",
});
const addDealAddTime = input({
  label: "Add Time",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The optional creation date & time of the deal in UTC",
  example: "2024-01-15T10:30:00Z",
  placeholder: "Enter date & time (ISO 8601 format)",
});
export const addDealInputs = {
  connection: connectionInput,
  title: addDealTitle,
  personId: dealPersonId,
  orgId: dealOrgId,
  pipelineId: dealPipelineId,
  stageId: dealStageId,
  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    comments:
      "Optional deal attributes: value, currency, status, dates, probability, visibility.",
    inputs: {
      value: addDealAdditionalFieldsValue,
      currency: addDealAdditionalFieldsCurrency,
      status: addDealStatus,
      expectedCloseDate: addDealExpectedCloseDate,
      probability: addDealProbability,
      lostReason: addDealLostReason,
      visibleTo: addDealVisibleTo,
      addTime: addDealAddTime,
    },
  }),
};
const updateDealTitle = input({
  label: "Title",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The display name shown in the Pipedrive deals pipeline.",
  example: "Q1 Software License Deal",
  placeholder: "Enter deal title",
});
const updateDealValue = input({
  label: "Value",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The monetary amount associated with the deal, in the specified currency.",
  example: "5000",
  placeholder: "Enter deal value",
});
const updateDealCurrency = input({
  label: "Currency",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The three-letter ISO 4217 currency code for the deal value (e.g. USD, EUR).",
  example: "USD",
  placeholder: "Enter currency code",
});
const updateDealStatus = input({
  label: "Status",
  type: "string",
  required: false,
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanString,
  comments: "The current lifecycle status of the deal.",
});
const updateDealExpectedCloseDate = input({
  label: "Expected Close Date",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The expected close date of the deal",
  example: "2024-12-31",
  placeholder: "Enter date (YYYY-MM-DD)",
});
const updateDealProbability = input({
  label: "Probability",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The success probability percentage of the deal",
  example: "75",
  placeholder: "Enter probability percentage",
});
const updateDealLostReason = input({
  label: "Lost Reason",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The optional message about why the deal was lost (to be used when status = lost)",
  example: "Budget constraints",
  placeholder: "Enter reason for losing deal",
});
const updateDealVisibleTo = input({
  label: "Visible To",
  type: "string",
  required: false,
  model: [
    { label: "1", value: "1" },
    { label: "3", value: "3" },
    { label: "5", value: "5" },
    { label: "7", value: "7" },
  ],
  clean: cleanString,
  comments:
    "Controls which users can see this record. 1 = owner only, 3 = owner's group, 5 = owner's group and sub-groups, 7 = entire company.",
});
export const updateDealInputs = {
  connection: connectionInput,
  id: dealIdInput,
  personId: dealPersonId,
  orgId: dealOrgId,
  pipelineId: dealPipelineId,
  stageId: dealStageId,
  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    comments: "Optional deal attributes.",
    inputs: {
      title: updateDealTitle,
      value: updateDealValue,
      currency: updateDealCurrency,
      status: updateDealStatus,
      expectedCloseDate: updateDealExpectedCloseDate,
      probability: updateDealProbability,
      lostReason: updateDealLostReason,
      visibleTo: updateDealVisibleTo,
    },
  }),
};
const searchDealsTerm = input({
  label: "Term",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The keyword or phrase to match against deal fields.",
  example: "Software License",
  placeholder: "Enter search term",
});
const searchDealsFields = input({
  label: "Fields",
  type: "string",
  default: "custom_fields,notes,title",
  clean: cleanString,
  comments:
    "The deal properties to search in. Provide as a comma-separated list (e.g. custom_fields, notes, title).",
  example: "custom_fields,notes,title",
  placeholder: "Enter fields (comma-separated)",
});
const searchDealsExactMatch = input({
  label: "Exact Match",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, only full exact matches against the given term are returned",
});
const searchDealsPersonId = input({
  label: "Person ID",
  type: "string",
  clean: cleanNumber,
  comments: "Will filter deals by the provided person ID",
  example: "123",
  placeholder: "Enter Person ID",
});
const searchDealsOrganizationId = input({
  label: "Organization ID",
  type: "string",
  clean: cleanNumber,
  comments: "Will filter deals by the provided organization ID",
  example: "123",
  placeholder: "Enter Organization ID",
});
const searchDealsStatus = input({
  label: "Status",
  type: "string",
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
  ],
  clean: cleanString,
  comments: "Will filter deals by the provided specific status",
});
const searchDealsIncludeFields = input({
  label: "Include Fields",
  type: "string",
  model: [{ label: "Deal Cc Email", value: "deal.cc_email" }],
  clean: cleanString,
  comments:
    "Supports including optional fields in the results which are not provided by default",
});
export const searchDealsInputs = {
  connection: connectionInput,
  term: searchDealsTerm,
  fields: searchDealsFields,
  exactMatch: searchDealsExactMatch,
  personId: searchDealsPersonId,
  organizationId: searchDealsOrganizationId,
  status: searchDealsStatus,
  includeFields: searchDealsIncludeFields,
  pagination: cursorPagination,
};
const getDealsSummaryStatus = input({
  label: "Status",
  type: "string",
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
  ],
  clean: cleanString,
  comments: "Only fetch deals with a specific status",
});
const getDealsSummaryFilterId = input({
  label: "Filter ID",
  type: "string",
  clean: cleanNumber,
  comments:
    "The unique identifier of the filter to apply. When set, user_id is not considered.",
  example: "123",
  placeholder: "Enter Filter ID",
});
const getDealsSummaryUserId = input({
  label: "User ID",
  type: "string",
  clean: cleanNumber,
  comments: "Only deals matching the given user will be returned.",
  example: "123",
  placeholder: "Enter User ID",
});
const getDealsSummaryStageId = input({
  label: "Stage ID",
  type: "string",
  clean: cleanNumber,
  comments: "Only deals within the given stage will be returned.",
  example: "123",
  placeholder: "Enter Stage ID",
});
export const getDealsSummaryInputs = {
  connection: connectionInput,
  status: getDealsSummaryStatus,
  filterId: getDealsSummaryFilterId,
  userId: getDealsSummaryUserId,
  stageId: getDealsSummaryStageId,
};
const getDealsTimelineStartDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The date when the first interval starts",
  example: "2024-01-01",
  placeholder: "Enter start date (YYYY-MM-DD)",
});
const getDealsTimelineInterval = input({
  label: "Interval",
  type: "string",
  required: true,
  model: [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
  ],
  clean: util.types.toString,
  comments: "The type of the interval",
});
const getDealsTimelineAmount = input({
  label: "Amount",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments:
    'The number of given intervals, starting from "start_date", to fetch',
  example: "12",
  placeholder: "Enter number of intervals",
});
const getDealsTimelineFieldKey = input({
  label: "Field Key",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The date field key which deals will be retrieved from",
  example: "close_time",
  placeholder: "Enter field key",
});
const getDealsTimelineUserId = input({
  label: "User ID",
  type: "string",
  clean: cleanNumber,
  comments: "If supplied, only deals matching the given user will be returned.",
  example: "123",
  placeholder: "Enter User ID",
});
const getDealsTimelinePipelineId = input({
  label: "Pipeline ID",
  type: "string",
  clean: cleanNumber,
  comments:
    "If supplied, only deals matching the given pipeline will be returned.",
  example: "123",
  placeholder: "Enter Pipeline ID",
});
const getDealsTimelineFilterId = input({
  label: "Filter ID",
  type: "string",
  clean: cleanNumber,
  comments:
    "If supplied, only deals matching the given filter will be returned.",
  example: "123",
  placeholder: "Enter Filter ID",
});
const getDealsTimelineExcludeDeals = input({
  label: "Exclude Deals",
  type: "string",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "Whether to exclude deals list (1) or not (0)",
});
const getDealsTimelineTotalsConvertCurrency = input({
  label: "Totals Convert Currency",
  type: "string",
  clean: cleanString,
  comments: "The 3-letter currency code of any of the supported currencies.",
  example: "USD",
  placeholder: "Enter currency code (e.g. USD)",
});
export const getDealsTimelineInputs = {
  connection: connectionInput,
  startDate: getDealsTimelineStartDate,
  interval: getDealsTimelineInterval,
  amount: getDealsTimelineAmount,
  fieldKey: getDealsTimelineFieldKey,
  userId: getDealsTimelineUserId,
  pipelineId: getDealsTimelinePipelineId,
  filterId: getDealsTimelineFilterId,
  excludeDeals: getDealsTimelineExcludeDeals,
  totalsConvertCurrency: getDealsTimelineTotalsConvertCurrency,
};
const mergeDealsWithId = input({
  label: "Merge With ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The ID of the deal that the deal will be merged with.",
  example: "456",
  placeholder: "Enter Deal ID to merge with",
});
export const mergeDealsInputs = {
  connection: connectionInput,
  id: dealIdInput,
  mergeWithId: mergeDealsWithId,
};
const addDealFollowerUserId = input({
  label: "User ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The ID of the user to add as a follower of the deal.",
  example: "123",
  placeholder: "Enter User ID",
});
export const addDealFollowerInputs = {
  connection: connectionInput,
  id: dealIdInput,
  userId: addDealFollowerUserId,
};
const deleteDealFollowerId = input({
  label: "Follower ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the follower relationship to remove from the deal.",
  example: "123",
  placeholder: "Enter Follower ID",
});
export const deleteDealFollowerInputs = {
  connection: connectionInput,
  id: dealIdInput,
  followerId: deleteDealFollowerId,
};
const addDealParticipantPersonId = input({
  label: "Person ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The ID of the person to add as a participant in the deal.",
  example: "123",
  placeholder: "Enter Person ID",
});
export const addDealParticipantInputs = {
  connection: connectionInput,
  id: dealIdInput,
  personId: addDealParticipantPersonId,
};
const deleteDealParticipantId = input({
  label: "Deal Participant ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the participant of the deal.",
  example: "123",
  placeholder: "Enter Deal Participant ID",
});
export const deleteDealParticipantInputs = {
  connection: connectionInput,
  id: dealIdInput,
  dealParticipantId: deleteDealParticipantId,
};
const deleteDealProductAttachmentId = input({
  label: "Product Attachment ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The product attachment ID.",
  example: "123",
  placeholder: "Enter Product Attachment ID",
});
export const deleteDealProductInputs = {
  connection: connectionInput,
  id: dealIdInput,
  productAttachmentId: deleteDealProductAttachmentId,
};
const dealProductVariationId = input({
  label: "Product Variation ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the product variation to use.",
  example: "123",
  placeholder: "Enter Product Variation ID",
});
const addDealProductItemPrice = input({
  label: "Item Price",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The price value of the product.",
  example: "99.99",
  placeholder: "Enter item price",
});
const addDealProductQuantity = input({
  label: "Quantity",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The quantity of the product.",
  example: "10",
  placeholder: "Enter quantity",
});
const addDealProductDiscount = input({
  label: "Discount Percentage",
  type: "string",
  required: false,
  default: "0",
  comments: "The discount %.",
  example: "15",
  placeholder: "Enter discount percentage",
  clean: cleanNumber,
});
const addDealProductDiscountType = input({
  label: "Discount Type",
  type: "string",
  required: false,
  comments: "The type of discount",
  model: [
    { label: "Percentage", value: "percentage" },
    { label: "Amount", value: "amount" },
  ],
  clean: cleanString,
});
const addDealProductComments = input({
  label: "Comments",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "Any textual comment associated with this product-deal attachment.",
  example: "Annual license, billed monthly",
  placeholder: "Enter comments",
});
const addDealProductTax = input({
  label: "Tax",
  type: "string",
  required: false,
  default: "0",
  clean: cleanNumber,
  comments: "The tax percentage.",
  example: "10",
  placeholder: "Enter tax percentage",
});
const addDealProductIsEnabled = input({
  label: "Is Enabled",
  type: "boolean",
  required: false,
  comments: "Whether the product is enabled on the deal or not",
  clean: util.types.toBool,
});
export const addDealProductInputs = {
  connection: connectionInput,
  id: dealIdInput,
  productId: {
    ...productIdInput,
    comments: "The ID of the product to add to the deal",
  },
  itemPrice: addDealProductItemPrice,
  quantity: addDealProductQuantity,
  discount: addDealProductDiscount,
  discountType: addDealProductDiscountType,
  productVariationId: dealProductVariationId,
  comments: addDealProductComments,
  tax: addDealProductTax,
  isEnabled: addDealProductIsEnabled,
};
const updateDealProductAttachmentId = input({
  label: "Product Attachment ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The ID of the deal-product (the ID of the product attached to the deal).",
  example: "123",
  placeholder: "Enter Product Attachment ID",
});
const updateDealProductItemPrice = input({
  label: "Item Price",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The price value of the product.",
  example: "99.99",
  placeholder: "Enter item price",
});
const updateDealProductQuantity = input({
  label: "Quantity",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The quantity of the product.",
  example: "10",
  placeholder: "Enter quantity",
});
const updateDealProductDiscount = input({
  label: "Discount Percentage",
  type: "string",
  required: false,
  default: "0",
  comments: "The discount %.",
  example: "15",
  placeholder: "Enter discount percentage",
  clean: cleanNumber,
});
const updateDealProductDiscountType = input({
  label: "Discount Type",
  type: "string",
  required: false,
  comments: "The type of discount",
  model: [
    { label: "Percentage", value: "percentage" },
    { label: "Amount", value: "amount" },
  ],
  clean: cleanString,
});
const updateDealProductComments = input({
  label: "Comments",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "Any textual comment associated with this product-deal attachment.",
  example: "Annual license, billed monthly",
  placeholder: "Enter comments",
});
const updateDealProductTax = input({
  label: "Tax",
  type: "string",
  required: false,
  default: "0",
  clean: cleanNumber,
  comments: "The tax percentage.",
  example: "10",
  placeholder: "Enter tax percentage",
});
export const updateDealProductInputs = {
  connection: connectionInput,
  id: dealIdInput,
  productAttachmentId: updateDealProductAttachmentId,
  productVariationId: dealProductVariationId,
  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    comments: "Optional deal product attributes.",
    inputs: {
      itemPrice: updateDealProductItemPrice,
      quantity: updateDealProductQuantity,
      discount: updateDealProductDiscount,
      discountType: updateDealProductDiscountType,
      comments: updateDealProductComments,
      tax: updateDealProductTax,
    },
  }),
};
const getDealFilesIncludeDeletedFiles = input({
  label: "Include Deleted Files",
  type: "string",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "When enabled, the list of files will also include deleted files",
});
export const getDealFilesInputs = {
  connection: connectionInput,
  id: dealIdInput,
  pagination: mixedPagination,
  includeDeletedFiles: getDealFilesIncludeDeletedFiles,
  sort: sortInput,
};
const getDealActivitiesDone = input({
  label: "Done",
  type: "boolean",
  comments: "Whether the activity is done or not",
  clean: util.types.toBool,
});
export const getDealActivitiesInputs = {
  connection: connectionInput,
  id: dealIdInput,
  pagination: cursorPagination,
  done: getDealActivitiesDone,
  sortBy: sortBy,
  sortDirection: sortDirection,
};
export const getDealsInputs = {
  fetchAll,
  pagination: cursorPagination,
  sortBy: sortBy,
  sortDirection: sortDirection,
  filterId,
  stageId,
  status: dealStatus,
  connection: connectionInput,
};
export const getDealInputs = {
  connection: connectionInput,
  id: dealIdInput,
};
export const deleteDealInputs = {
  connection: connectionInput,
  id: dealIdInput,
};
export const getDealFollowersInputs = {
  connection: connectionInput,
  id: dealIdInput,
  pagination: cursorPagination,
};
export const getDealMailMessagesInputs = {
  connection: connectionInput,
  id: dealIdInput,
  pagination: mixedPagination,
};
export const getDealParticipantsInputs = {
  connection: connectionInput,
  id: dealIdInput,
  pagination: mixedPagination,
};
export const getDealProductsInputs = {
  connection: connectionInput,
  id: dealIdInput,
  pagination: cursorPagination,
  sortBy: sortBy,
  sortDirection: sortDirection,
};
export const getDealUsersInputs = {
  connection: connectionInput,
  id: dealIdInput,
};
