import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Airtable connection to use.",
});

export const baseIdInput = input({
  label: "Base ID",
  type: "string",
  
  required: false,
  example: "appLkNDICXNqxSDhG",
  placeholder: "Enter base ID",
  comments:
    "The ID of the base to interact with. Required if you use an OAuth connection, and optional if you specify base ID with a legacy API Key connection.",
  clean: util.types.toString,
  dataSource: "selectBase",
});

export const tableName = input({
  label: "Table Name",
  type: "string",
  required: true,
  example: "Marketing Campaigns",
  placeholder: "Enter table name",
  comments: "The name of the table to access.",
  dataSource: "selectTable",
  clean: util.types.toString,
});
