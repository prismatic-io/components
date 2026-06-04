import { input, util } from "@prismatic-io/spectral";
import { cleanNumber, cleanString } from "../util";
export { debugRequest } from "@prismatic-io/spectral/dist/clients/http/inputs";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Pipedrive connection to use.",
});

export const activityIdInput = input({
  label: "Activity ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the activity.",
  dataSource: "selectActivity",
  example: "123",
  placeholder: "Enter Activity ID",
});

export const callLogIdInput = input({
  label: "Call Log ID",
  type: "string",
  required: true,
  example: "3cde3b05035cae14dcfc172bd8000d08",
  placeholder: "Enter Call Log ID",
  clean: util.types.toString,
  comments: "The unique identifier returned when the call log was created.",
});

export const dealIdInput = input({
  label: "Deal ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the deal.",
  example: "123",
  placeholder: "Enter Deal ID",
  dataSource: "selectDeal",
  clean: util.types.toNumber,
});

export const dealFieldIdInput = input({
  label: "Deal Field ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the deal field.",
  example: "123",
  placeholder: "Enter Deal Field ID",
});

export const fileIdInput = input({
  label: "File ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the file.",
  dataSource: "selectFile",
  example: "123",
  placeholder: "Enter File ID",
});

export const filterIdInput = input({
  label: "Filter ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the filter.",
  dataSource: "selectFilter",
  example: "123",
  placeholder: "Enter Filter ID",
});

export const leadIdInput = input({
  label: "Lead ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the lead.",
  dataSource: "selectLead",
  example: "3cde3b05-035c-ae14-dcfc-172bd8000d08",
  placeholder: "Enter Lead ID",
});

export const leadLabelIdInput = input({
  label: "Lead Label ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the lead label.",
  example: "3cde3b05-035c-ae14-dcfc-172bd8000d08",
  placeholder: "Enter Lead Label ID",
});

export const mailThreadIdInput = input({
  label: "Mail Thread ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the mail thread.",
  example: "123",
  placeholder: "Enter Mail Thread ID",
});

export const organizationIdInput = input({
  label: "Organization ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the organization.",
  example: "123",
  placeholder: "Enter Organization ID",
  clean: util.types.toNumber,
  dataSource: "selectOrganization",
});

export const permissionSetIdInput = input({
  label: "Permission Set ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the permission set.",
  example: "123",
  placeholder: "Enter Permission Set ID",
});

export const personFieldIdInput = input({
  label: "Person Field ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the person field.",
  example: "123",
  placeholder: "Enter Person Field ID",
  clean: util.types.toNumber,
});

export const paginationStartInput = input({
  label: "Start",
  type: "string",
  default: "0",
  clean: (value) => util.types.toNumber(value, 0),
  comments: "The 0-based offset of the first item to return.",
  example: "0",
  placeholder: "Enter start index",
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  comments: "The pagination cursor from a previous request.",
  example: "1234567890",
  placeholder: "Enter cursor value",
  clean: cleanString,
});

export const paginationLimitInput = input({
  label: "Limit",
  type: "string",
  clean: cleanNumber,
  comments: "The maximum number of results to return per page.",
  example: "100",
  placeholder: "Enter limit",
});

export const personIdInput = input({
  label: "Person ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the person.",
  example: "123",
  placeholder: "Enter Person ID",
  dataSource: "selectPerson",
  clean: util.types.toNumber,
});

export const pipelineIdInput = input({
  label: "Pipeline ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the pipeline.",
  example: "123",
  placeholder: "Enter Pipeline ID",
  clean: util.types.toNumber,
  dataSource: "selectPipeline",
});

export const productIdInput = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product.",
  example: "123",
  placeholder: "Enter Product ID",
  clean: util.types.toNumber,
  dataSource: "selectProduct",
});

export const sortInput = input({
  label: "Sort",
  type: "string",
  clean: cleanString,
  comments:
    'The field names and sorting mode separated by a comma (e.g. "field_name_1 ASC, field_name_2 DESC").',
  example: "title ASC, id DESC",
  placeholder: "Enter sort parameters",
});

export const sortBy = input({
  label: "Sort By",
  type: "string",
  comments: "The field name used to order the results.",
  example: "title",
  placeholder: "Enter field name",
  clean: cleanString,
});

export const sortDirection = input({
  label: "Sort Direction",
  type: "string",
  comments: "The direction in which results are ordered.",
  example: "asc",
  placeholder: "Select sort direction",
  model: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
  clean: cleanString,
});

export const stageIdInput = input({
  label: "Stage ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the stage.",
  dataSource: "selectStage",
  example: "123",
  placeholder: "Enter Stage ID",
});

export const subscriptionIdInput = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the subscription.",
  example: "123",
  placeholder: "Enter Subscription ID",
});

export const userIdInput = input({
  label: "User ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The unique identifier for the user.",
  dataSource: "selectUser",
  example: "123",
  placeholder: "Enter User ID",
});

export const webhookVersion = input({
  label: "Version",
  type: "string",
  required: true,
  comments: "The Pipedrive webhook version that controls the payload schema.",
  example: "2.0",
  placeholder: "Select API version",
  model: [
    { label: "1.0", value: "1.0" },
    { label: "2.0", value: "2.0" },
  ],
  default: "2.0",
  clean: util.types.toString,
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  required: true,
  comments: "The Pipedrive REST API version used for the request.",
  example: "v1",
  placeholder: "Select API version",
  model: [
    { label: "v1", value: "v1" },
    { label: "v2", value: "v2" },
  ],
  default: "v1",
  clean: util.types.toString,
});

export const firstChar = input({
  label: "First Char",
  type: "string",
  clean: cleanString,
  comments:
    "If supplied, only persons whose name starts with the specified letter are returned (case insensitive).",
  example: "A",
  placeholder: "Enter first character",
});

export const filterId = input({
  label: "Filter ID",
  type: "string",
  clean: cleanNumber,
  comments: "The unique identifier of the filter to apply.",
  example: "123",
  placeholder: "Enter Filter ID",
});

export const userId = input({
  label: "User ID",
  type: "string",
  clean: cleanNumber,
  comments: "If supplied, only persons owned by the specified user are returned.",
  required: false,
  example: "123",
  placeholder: "Enter User ID",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments:
    "When true, automatically fetches all pages of results. When false, only the requested page is returned.",
  required: false,
  clean: util.types.toBool,
});

export const stageId = input({
  label: "Stage ID",
  type: "string",
  clean: cleanNumber,
  comments: "If supplied, only deals within the specified stage are returned.",
  example: "123",
  placeholder: "Enter Stage ID",
});

export const dealStatus = input({
  label: "Status",
  type: "string",
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanString,
  comments: "Filter the response to only include deals matching the selected status.",
  example: "open",
  placeholder: "Select deal status",
});

export const ownedByYou = input({
  label: "Owned By You",
  type: "string",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "When set to 1, only deals owned by the authenticated user are returned.",
  example: "1",
  placeholder: "Select option",
});

export const subscriptionUrl = input({
  label: "Subscription URL",
  type: "string",
  required: true,
  comments: "The URL that Pipedrive will call when a subscribed event occurs.",
  example: "https://example.com/pipedrive/webhook",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});

export const eventAction = input({
  label: "Event Action",
  type: "string",
  required: true,
  comments: "The type of action that triggers the webhook.",
  example: "create",
  placeholder: "Select event action",
  model: [
    { label: "Create", value: "create" },
    { label: "Change", value: "change" },
    { label: "Delete", value: "delete" },
    { label: "All", value: "*" },
  ],
  clean: util.types.toString,
});

export const eventObject = input({
  label: "Event Object",
  type: "string",
  required: true,
  comments: "The Pipedrive resource type that triggers the webhook.",
  example: "deal",
  placeholder: "Select event object",
  model: [
    { label: "Activity", value: "activity" },
    { label: "Deal", value: "deal" },
    { label: "Lead", value: "lead" },
    { label: "Note", value: "note" },
    { label: "Organization", value: "organization" },
    { label: "Person", value: "person" },
    { label: "Pipeline", value: "pipeline" },
    { label: "Product", value: "product" },
    { label: "Stage", value: "stage" },
    { label: "User", value: "user" },
    { label: "All", value: "*" },
  ],
  clean: util.types.toString,
});

export const httpAuthUser = input({
  label: "HTTP Auth User",
  type: "string",
  required: false,
  comments: "The username used for HTTP Basic Auth when Pipedrive calls the subscription URL.",
  example: "admin",
  placeholder: "Enter username",
  clean: cleanString,
});

export const httpAuthPassword = input({
  label: "HTTP Auth Password",
  type: "password",
  required: false,
  comments: "The password used for HTTP Basic Auth when Pipedrive calls the subscription URL.",
  placeholder: "Enter password",
  clean: cleanString,
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the webhook.",
  example: "123",
  placeholder: "Enter Webhook ID",
  clean: util.types.toString,
});

export const webhookUserId = {
  ...userId,
  required: false,
  comments:
    "The ID of the user that this webhook will be authorized with. A different user's user_id may be used. If not set, the authenticated user's user_id is used. Each webhook event is checked against the user's permissions, so the webhook is only sent if the user has access to the affected object(s). To receive notifications for all events, use a top-level admin user's user_id.",
};

export const createWebhookInputs = {
  connection: connectionInput,
  subscriptionUrl,
  eventAction,
  eventObject,
  version: {
    ...webhookVersion,
    default: "2.0",
    comments:
      "The webhook's version. NB! Webhooks v2 is the default from March 17th, 2025. See this [Changelog](https://developers.pipedrive.com/changelog/post/breaking-change-webhooks-v2-will-become-the-new-default-version) post for more details.",
  },
  userId: webhookUserId,
  httpAuthUser,
  httpAuthPassword,
};

export const deleteWebhookInputs = {
  connection: connectionInput,
  webhookId,
};

export const listWebhooksInputs = {
  connection: connectionInput,
};

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: [
    { label: "Activities", value: "activity" },
    { label: "Activity Types", value: "activityType" },
    { label: "Deals", value: "deal" },
    { label: "Files", value: "file" },
    { label: "Filters", value: "filter" },
    { label: "Notes", value: "note" },
    { label: "Organizations", value: "organization" },
    { label: "Persons", value: "person" },
    { label: "Pipelines", value: "pipeline" },
    { label: "Products", value: "product" },
    { label: "Stages", value: "stage" },
    { label: "Users", value: "user" },
  ],
  clean: util.types.toString,
  comments: "The Pipedrive item type to monitor for new and updated records.",
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When enabled, records created since the last poll are returned in the trigger payload.",
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When enabled, records updated since the last poll are returned in the trigger payload.",
});
