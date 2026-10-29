import { input, util } from "@prismatic-io/spectral";

export const oneDriveConnection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft OneDrive connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results by following @odata.nextLink. Page Limit and Page Token inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

export const requestBody = input({
  label: "Request Body",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      name: "newFileName.txt",
      description: "Updated file description",
    },
    null,
    2,
  ),
  comments: "The JSON request body for the operation.",
  clean: util.types.toObject,
});

export const timeout = input({
  label: "Timeout",
  type: "string",
  required: false,
  example: "3000",
  placeholder: "Enter timeout in milliseconds",
  comments: "The maximum time in milliseconds to wait for a response.",
  clean: util.types.toString,
});

export const pageLimit = input({
  label: "Page Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter page size",
  comments: "The maximum number of results to return per page.",
  clean: util.types.toString,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  example: "X%2744537079ghv",
  placeholder: "Enter page token",
  comments: "The token for retrieving the next page of results.",
  clean: util.types.toString,
});
