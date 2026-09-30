import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import {
  cleanKeyValList,
  cleanKeyValPairInput,
  cleanNumberInput,
  cleanStringInput,
  jsonInputClean,
  valueListInputClean,
} from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Confluence connection to use.",
});
export const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the attachment.",
  clean: util.types.toString,
  example: "att123456789",
  placeholder: "Enter attachment ID",
  dataSource: "listAttachments",
});
export const pageId = input({
  label: "Page ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the page.",
  clean: util.types.toString,
  example: "123456789",
  placeholder: "Enter page ID",
  dataSource: "listPages",
});
export const spaceId = input({
  label: "Space ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the space.",
  clean: util.types.toString,
  example: "123456789",
  placeholder: "Enter space ID",
  dataSource: "listSpaces",
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
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { limit, cursor },
});
export const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments: "Used to sort the result by a particular field.",
  model: [
    { label: "ID", value: "id" },
    { label: "ID Descending", value: "-id" },
    { label: "Created Date", value: "created-date" },
    { label: "Created Date Descending", value: "-created-date" },
    { label: "Modified Date", value: "modified-date" },
    { label: "Modified Date Descending", value: "-modified-date" },
    { label: "Title", value: "title" },
    { label: "Title Descending", value: "-title" },
  ],
  clean: cleanStringInput,
});
export const queryParameters = input({
  label: "Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Query parameters to pass in to the request. For example, key `include-versions`, value `true`.",
  clean: cleanKeyValList,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results. When false, returns a single page.",
  clean: util.types.toBool,
});
const queryInput = input({
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
const variablesInput = input({
  label: "Variables",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Variables to pass in to the query or mutation.",
  clean: cleanKeyValPairInput,
});
const headersInput = input({
  label: "Headers",
  comments: "Custom headers to send along with the request.",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  clean: cleanKeyValPairInput,
});
const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource.",
  model: [
    { label: "DESTINATION", value: "DESTINATION" },
    { label: "INSERT_DESTINATION", value: "INSERT_DESTINATION" },
    { label: "SOURCE", value: "SOURCE" },
  ],
  clean: util.types.toString,
});
const eventType = input({
  label: "Event Type",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of strings which filters the results to the given EventNames.",
  default: ["000xxx"],
  clean: valueListInputClean,
});
const functionSettings = input({
  label: "Function Settings",
  type: "code",
  language: "json",
  comments: "The list of settings for the webhook subscription.",
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
const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;
export const graphqlRequestInputs = {
  connection: connectionInput,
  query: queryInput,
  variables: variablesInput,
  headers: headersInput,
};
export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/wiki/api/v2/attachments/attachments), The base URL is already included (https://{your-domain}). For example, to connect to https://{your-domain}/wiki/api/v2/attachments, only /wiki/api/v2/attachments/attachments is entered in this field.",
    example: "/wiki/api/v2/attachments/attachments",
    placeholder: "/wiki/api/v2/attachments/attachments",
  },
};
