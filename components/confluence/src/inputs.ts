import { input, util } from "@prismatic-io/spectral";
import {
  cleanKeyValList,
  cleanKeyValPairInput,
  cleanNumberInput,
  cleanStringInput,
  jsonInputClean,
  valueListInputClean,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Confluence connection to use.",
});

export const attachmentId = input({
  label: "Attachment Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the attachment.",
  clean: util.types.toString,
  example: "att123456789",
  placeholder: "Enter attachment ID",
  dataSource: "listAttachments",
});

export const webhookId = input({
  label: "Webhook Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the webhook.",
  clean: util.types.toString,
  example: "7",
  placeholder: "Enter webhook ID",
});

export const customContentId = input({
  label: "Custom Content Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the custom content.",
  clean: util.types.toString,
  example: "123456789",
  placeholder: "Enter custom content ID",
});

export const propertyId = input({
  label: "Property Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the content property.",
  clean: util.types.toString,
  example: "content-prop-123",
  placeholder: "Enter property ID",
});

export const pageId = input({
  label: "Page Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the page.",
  clean: util.types.toString,
  example: "123456789",
  placeholder: "Enter page ID",
  dataSource: "listPages",
});

export const spaceId = input({
  label: "Space Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the space.",
  clean: util.types.toString,
  example: "123456789",
  placeholder: "Enter space ID",
  dataSource: "listSpaces",
});

export const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The Function type.",
  model: [
    { label: "DESTINATION", value: "DESTINATION" },
    { label: "INSERT_DESTINATION", value: "INSERT_DESTINATION" },
    { label: "SOURCE", value: "SOURCE" },
  ],
  clean: util.types.toString,
});

export const eventType = input({
  label: "Event Type",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of strings which filters the results to the given EventNames.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const functionSettings = input({
  label: "Function Settings",
  type: "code",
  language: "json",
  comments: "The list of settings for this Function.",
  default: JSON.stringify(
    [
      {
        name: "apiKey",
        label: "api key",
        type: "STRING",
        description: "api key",
        required: false,
        sensitive: false,
      },
      {
        name: "mySecret",
        label: "my secret key",
        type: "STRING",
        description: "secret key",
        required: false,
        sensitive: true,
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments:
    "Maximum number of pages per result to return. If more results exist, use the Link header to retrieve a relative URL that will return the next set of results.",
  clean: cleanNumberInput,
  example: "25",
  default: "25",
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  comments:
    "Used for pagination, this opaque cursor will be returned in the next URL in the Link response header. Use the relative URL in the Link header to retrieve the next set of results.",
  clean: cleanStringInput,
  example: "c25hcHNob3RzLzE1NjQ4NjQ3MjMvMjU=",
  placeholder: "Enter cursor value",
});

export const parentId = input({
  label: "Parent Id",
  type: "string",
  required: false,
  comments: "The unique identifier of the parent page.",
  clean: util.types.toString,
  example: "987654321",
  placeholder: "Enter parent page ID",
});

export const status = input({
  label: "Status",
  type: "string",
  required: true,
  comments: "The status of the page.",
  model: [
    { label: "current", value: "current" },
    { label: "draft", value: "draft" },
    { label: "archived", value: "archived" },
    { label: "deleted", value: "deleted" },
  ],
  clean: util.types.toString,
});

export const title = input({
  label: "Title",
  type: "string",
  required: true,
  comments: "The title of the page.",
  clean: util.types.toString,
  example: "Product Documentation",
  placeholder: "Enter page title",
});

export const body = input({
  label: "Body",
  type: "code",
  language: "json",
  comments: "The body of the page.",
  default: JSON.stringify(
    {
      representation: "storage",
      value: "<string>",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const version = input({
  label: "Version",
  type: "code",
  language: "json",
  comments: "The version of the page.",
  default: JSON.stringify(
    {
      number: 47,
      message: "<string>",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const embedded = input({
  label: "Embedded",
  type: "boolean",
  required: false,
  comments:
    "When true, tags the content as embedded and creates content in NCS.",
  clean: util.types.toBool,
});

export const privateInput = input({
  label: "Private",
  type: "boolean",
  required: false,
  comments:
    "When true, the page will be private and only the user who creates the page will have permission to view and edit it.",
  clean: util.types.toBool,
});

export const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments: "Used to sort the result by a particular field.",
  model: [
    { label: "Id", value: "id" },
    { label: "Id Descending", value: "-id" },
    { label: "Created Date", value: "created-date" },
    { label: "Created Date Descending", value: "-created-date" },
    { label: "Modified Date", value: "modified-date" },
    { label: "Modified Date Descending", value: "-modified-date" },
    { label: "Title", value: "title" },
    { label: "Title Descending", value: "-title" },
  ],
  clean: cleanStringInput,
});

export const bodyData = input({
  label: "Body Data",
  type: "code",
  language: "json",
  comments: "The content property data to create or update.",
  default: JSON.stringify(
    {
      key: "my-property-key",
      value: "property-value",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments: "The URL where webhook events will be sent.",
  example: "https://hooks.example.com/webhook/abc123",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});

export const webhookDetails = input({
  label: "Webhook Details",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Webhook Details payload to send in this create request; must match structure of `webhooks` property for Register Dynamic Webhook endpoint: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-post",
  clean: util.types.toObject,
  example: JSON.stringify(
    [
      {
        events: [
          "attachment_archived",
          "attachment_created",
          "attachment_removed",
        ],
        fieldIdsFilter: ["summary", "customfield_10029"],
        filter: "project = PROJ",
      },
      {
        events: ["page_restored"],
        filter: "project IN (PROJ, EXP) AND status = done",
      },
      {
        events: ["relation_deleted"],
        filter: "project = PROJ",
      },
    ],
    null,
    2,
  ),
});

export const queryInput = input({
  label: "Query or Mutation",
  type: "code",
  required: true,
  language: "graphql",
  default: `query ($customerName: String!) {
    customers(name: $customerName) {
      nodes {
        id
        labels
        users {
          nodes {
            id
            email
          }
        }
      }
    }
  }`,
  clean: util.types.toString,
});

export const variablesInput = input({
  label: "Variables",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Variables to pass in to your query or mutation",
  clean: cleanKeyValPairInput,
});

export const headersInput = input({
  label: "Headers",
  comments: "Custom headers to send along with your request",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  clean: cleanKeyValPairInput,
});

export const queryParameters = input({
  label: "Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Query parameters to pass in to your request. Ex. Key: include-versions Value: true",
  clean: cleanKeyValList,
});

export const bodyFormat = input({
  label: "Body Format",
  type: "string",
  required: false,
  comments:
    "The content format types to be returned in the body field of the response.",
  model: [
    { label: "Storage", value: "storage" },
    { label: "Atlas Doc Format", value: "atlas_doc_format" },
    { label: "View", value: "view" },
    { label: "Export View", value: "export_view" },
    { label: "Anonymous Export View", value: "anonymous_export_view" },
    { label: "Styled View", value: "styled_view" },
    { label: "Editor", value: "editor" },
  ],
  clean: cleanStringInput,
});

export const getDraft = input({
  label: "Get Draft",
  type: "string",
  required: false,
  comments: "Retrieve the draft version of this page.",
  clean: util.types.toBool,
});

export const previousVersion = input({
  label: "Version",
  type: "string",
  required: false,
  example: "47",
  placeholder: "Enter version number",
  comments:
    "Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its details.",
  clean: cleanNumberInput,
});

export const includeLabels = input({
  label: "Include Labels",
  type: "boolean",
  required: false,
  comments:
    "When true, includes labels associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});

export const includeProperties = input({
  label: "Include Properties",
  type: "boolean",
  required: false,
  comments:
    "When true, includes content properties associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});

export const includeOperations = input({
  label: "Include Operations",
  type: "boolean",
  required: false,
  comments:
    "When true, includes operations associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});

export const includeLikes = input({
  label: "Include Likes",
  type: "boolean",
  required: false,
  comments:
    "When true, includes likes associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});

export const includeVersions = input({
  label: "Include Versions",
  type: "boolean",
  required: false,
  comments:
    "When true, includes versions associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});

export const includeVersion = input({
  label: "Include Version",
  type: "boolean",
  required: false,
  comments:
    "When true, includes the current version associated with this page in the response.",
  clean: util.types.toBool,
  default: "true",
});

export const includeFavoritedByCurrentUserStatus = input({
  label: "Include Favorited By Current User Status",
  type: "boolean",
  required: false,
  comments:
    "When true, includes whether this page has been favorited by the current user.",
  clean: util.types.toBool,
});

export const purge = input({
  label: "Purge",
  type: "boolean",
  required: false,
  comments:
    "When true, permanently deletes the page instead of moving it to trash.",
  clean: util.types.toBool,
});

export const draft = input({
  label: "Draft",
  type: "boolean",
  required: false,
  comments: "When true, deletes a page that is in draft status.",
  clean: util.types.toBool,
});

export const id = input({
  label: "Id",
  type: "string",
  required: false,
  comments:
    "Filter the results based on page IDs. Multiple page IDs can be specified as a comma-separated list.",
  example: "123456789,987654321",
  placeholder: "Enter page IDs (comma-separated)",
  clean: cleanStringInput,
});

export const spaceIdFilter = input({
  label: "Space Id",
  type: "string",
  required: false,
  comments:
    "Filter the results based on space IDs. Multiple space IDs can be specified as a comma-separated list.",
  example: "123456789,987654321",
  placeholder: "Enter space IDs (comma-separated)",
  clean: cleanStringInput,
});

export const statusPages = input({
  label: "Status",
  type: "string",
  required: false,
  comments:
    "Filter the results to pages based on their status. By default, current and archived are used. Valid values: current, archived, deleted, trashed",
  example: "current,archived",
  placeholder: "Enter status values (comma-separated)",
  clean: cleanStringInput,
});

export const titlePages = input({
  label: "Title",
  type: "string",
  required: false,
  comments: "Filter the results to pages based on their title.",
  example: "Product Documentation",
  placeholder: "Enter page title",
  clean: cleanStringInput,
});

export const bodyFormatPages = input({
  label: "Body Format",
  type: "string",
  required: false,
  comments:
    "The content format types to be returned in the body field of the response.",
  model: [
    { label: "Storage", value: "storage" },
    { label: "Atlas Doc Format", value: "atlas_doc_format" },
  ],
  clean: cleanStringInput,
});

export const purgeAttachment = input({
  label: "Purge",
  type: "boolean",
  required: false,
  comments:
    "When true, permanently deletes the attachment instead of moving it to trash.",
  clean: util.types.toBool,
});

export const depth = input({
  label: "Depth",
  type: "string",
  required: false,
  comments:
    "Filter the results to pages at the root level of the space or to all pages in the space.",
  model: [
    { label: "All", value: "all" },
    { label: "Root", value: "root" },
  ],
  clean: cleanStringInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When enabled, fetches all results by automatically paginating through all pages. When disabled, returns a single page of results.",
  clean: util.types.toBool,
});
