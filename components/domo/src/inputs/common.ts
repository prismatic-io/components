import { input, util } from "@prismatic-io/spectral";

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Domo connection to use.",
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The display name for the resource.",
  placeholder: "Enter name",
  example: "John Doe",
  clean: util.types.toString,
});

export const id = input({
  label: "ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the resource.",
  placeholder: "Enter ID",
  example: "123456",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  comments: "A summary of the DataSet contents and purpose.",
  type: "string",
  required: true,
  placeholder: "Enter description",
  example: "Sales data for Q1 2024",
  clean: util.types.toString,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return (default is 50, maximum of 1000).",
  placeholder: "Enter limit",
  example: "100",
  clean: util.types.toString,
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  comments: "The 0-based offset position to begin retrieving results from.",
  placeholder: "Enter offset",
  example: "0",
  clean: util.types.toString,
});

export const dueDate = input({
  label: "Due Date",
  comments: "The due date for the project. Format: ISO 8601.",
  type: "string",
  required: false,
  placeholder: "Enter due date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  clean: util.types.toString,
});
