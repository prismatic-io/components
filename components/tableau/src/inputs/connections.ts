import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalBoolean, toOptionalString } from "../util";
import {
  connectionInput,
  pagination,
  searchString,
  timeout,
  workbookId,
} from "./common";
const connectionId = input({
  label: "Connection ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the connection.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  placeholder: "Enter connection ID",
  dataSource: "selectConnection",
  clean: toOptionalString,
});
const serverPort = input({
  label: "Server Port",
  type: "string",
  required: false,
  comments: "The port of the server to connect to.",
  example: "8080",
  placeholder: "Enter server port",
  clean: toOptionalString,
});
const serverAddress = input({
  label: "Server Address",
  type: "string",
  required: false,
  comments: "The address of the server to connect to.",
  example: "192.168.0.1",
  placeholder: "Enter server address",
  clean: toOptionalString,
});
const connectionUsername = input({
  label: "Connection Username",
  type: "string",
  required: false,
  comments: "The username used to authenticate the connection.",
  example: "myExampleUsername",
  placeholder: "Enter connection username",
  clean: toOptionalString,
});
const connectionPassword = input({
  label: "Connection Password",
  type: "string",
  required: false,
  comments: "The password used to authenticate the connection.",
  example: "mySafePassword",
  placeholder: "Enter connection password",
  clean: toOptionalString,
});
const embedPassword = input({
  label: "Embed Password",
  type: "boolean",
  required: false,
  comments: "When true, embeds the password for the connection.",
  clean: toOptionalBoolean,
});
const queryTaggingEnabled = input({
  label: "Query Tagging Enabled",
  type: "boolean",
  required: false,
  comments:
    "When true, associates a server log query event with the Tableau resource that made the query.",
  clean: toOptionalBoolean,
});
const connectionSettings = structuredObjectInput({
  label: "Connection Settings",
  required: false,
  comments:
    "Server address, credentials, and query behavior for the connection.",
  inputs: {
    serverAddress,
    serverPort,
    connectionUsername,
    connectionPassword,
    embedPassword,
    queryTaggingEnabled,
  },
});
const connectionSearchField = input({
  label: "Search Field",
  type: "string",
  required: true,
  comments: "The field to filter connections on.",
  example: "serverAddress",
  placeholder: "Enter search field",
  clean: util.types.toString,
});
export const listConnectionsInputs = {
  workbookId,
  timeout,
  pagination,
  tableauConnection: connectionInput,
};
export const searchConnectionsInputs = {
  workbookId,
  searchString,
  searchField: connectionSearchField,
  timeout,
  tableauConnection: connectionInput,
  pagination,
};
export const updateConnectionInputs = {
  workbookId,
  connectionId,
  connectionSettings,
  timeout,
  tableauConnection: connectionInput,
};
