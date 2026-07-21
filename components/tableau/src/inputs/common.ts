import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
export const timeout = input({
  label: "Timeout",
  type: "string",
  required: false,
  comments: "The maximum amount of time the client will await a response.",
  example: "3000",
  placeholder: "Enter timeout in milliseconds",
  clean: util.types.toInt,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The maximum number of results to return.",
  example: "20",
  placeholder: "Enter page size",
  clean: util.types.toNumber,
});
export const pageNumber = input({
  label: "Page Number",
  type: "string",
  required: false,
  comments: "The page offset for the given object's results.",
  example: "3",
  placeholder: "Enter page number",
  clean: util.types.toNumber,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and page number controls for paginated results.",
  inputs: { pageSize, pageNumber },
});
export const apiVersion = input({
  label: "API Version",
  type: "string",
  required: false,
  comments: "The version of the Tableau API to use.",
  example: "3.6",
  placeholder: "Enter API version",
  default: "3.6",
  clean: util.types.toString,
});
export const searchString = input({
  label: "Search",
  type: "string",
  required: true,
  comments: "The text value to search on.",
  example: "My Project",
  placeholder: "Enter search text",
  clean: util.types.toString,
});
export const projectId = input({
  label: "Project ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the project.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  placeholder: "Enter project ID",
  dataSource: "selectProject",
  clean: util.types.toString,
});
export const workbookId = input({
  label: "Workbook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the workbook.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  placeholder: "Enter workbook ID",
  dataSource: "selectWorkbook",
  clean: util.types.toString,
});
export const userId = input({
  label: "User ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the user.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  placeholder: "Enter user ID",
  dataSource: "selectUser",
  clean: toOptionalString,
});
export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the webhook.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  placeholder: "Enter webhook ID",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});
