import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanStringInput,
} from "../util";
import { connection, fetchAll, reportUrl } from "./common";
export const reportPrompts = input({
  label: "Prompts",
  comments:
    "Prompt values for the report as key-value pairs. Keys are the prompt XML aliases, which can differ from the labels shown in Workday. For a single-instance prompt by WID, use a key such as Organization!WID.",
  type: "string",
  placeholder: "Enter prompt values",
  collection: "keyvaluelist",
  required: false,
  example: '{"Effective_as_of_Date": "2026-10-01"}',
  clean: cleanKeyValueListInput,
});
const reportFormat = input({
  label: "Format",
  comments: "The output format Workday returns the report in.",
  type: "string",
  required: true,
  default: "json",
  model: [
    { label: "JSON", value: "json" },
    { label: "CSV", value: "csv" },
    { label: "Simple XML", value: "simplexml" },
  ],
  clean: util.types.toString,
});
const wqlQuery = input({
  label: "Query",
  comments:
    "The WQL query to run. Use the LIMIT clause to cap the total rows returned.",
  type: "text",
  example: "SELECT worker, fullName FROM allWorkers",
  placeholder: "Enter query",
  required: true,
  clean: util.types.toString,
});
export const wqlTenant = input({
  label: "Tenant",
  comments:
    "The Workday tenant to query. Leave blank with the Refresh Token connection to use the tenant from its REST API Endpoint. Required with the OAuth 2.0 connection.",
  type: "string",
  example: "acme",
  placeholder: "Enter tenant",
  required: false,
  clean: cleanStringInput,
});
const wqlPagination = structuredObjectInput({
  label: "Pagination",
  comments: "Page-size and starting-row controls for the query results.",
  required: false,
  inputs: {
    limit: input({
      label: "Limit",
      comments:
        "The number of rows in one page of results, between 0 and 10,000. With Fetch All enabled, this sets the page size and defaults to 1,000.",
      type: "string",
      example: "1000",
      placeholder: "Enter limit",
      required: false,
      clean: cleanNumberInput,
    }),
    offset: input({
      label: "Offset",
      comments:
        "The zero-based starting row of the results. Increase it by Limit to read the next page. Workday caches query results for up to 30 minutes and 10,000 rows.",
      type: "string",
      example: "0",
      placeholder: "Enter offset",
      required: false,
      clean: cleanNumberInput,
    }),
  },
});
export const getRaasReportInputs = {
  connection,
  reportUrl,
  format: reportFormat,
  prompts: reportPrompts,
};
export const runWqlQueryInputs = {
  connection,
  query: wqlQuery,
  tenant: wqlTenant,
  fetchAll: {
    ...fetchAll,
    comments:
      "When true, automatically fetches all pages of results using pagination. Reads up to the 10,000 rows Workday caches for a query; Offset is ignored and Limit sets the page size.",
  },
  pagination: wqlPagination,
};
