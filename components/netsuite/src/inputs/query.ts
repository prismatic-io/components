import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { suiteQlParametersClean } from "../utils";
import { connectionInput, limitInput, offsetInput } from "./common";

const queryPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { limitInput, offsetInput },
});

export const selectPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { limit: limitInput, offset: offsetInput },
});

export const suiteQLInput = input({
  label: "SuiteQL Payload",
  type: "code",
  language: "plaintext",
  required: true,
  comments:
    "SuiteQL query string to execute. Write a ? placeholder for each value and supply the values in Query Parameters. A query returns at most 100,000 results; when paging, ORDER BY a unique column such as id so no row is skipped or repeated. See [Executing SuiteQL Queries](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_157909186990.html) for details.",
  placeholder: "Enter SuiteQL query",
  clean: util.types.toString,
  default: "SELECT email, COUNT(*) as count FROM transaction GROUP BY email",
});

export const parametersInput = input({
  label: "Query Parameters",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Values for the query's ? placeholders, as a JSON array in placeholder order. NetSuite binds them to the query, so a value is never parsed as SuiteQL.",
  example: '["-7", "0"]',
  placeholder: "Enter query parameters",
  clean: suiteQlParametersClean,
});

export const keyInput = input({
  label: "Key Field",
  type: "string",
  required: true,
  example: "id",
  placeholder: "Enter key field name",
  comments:
    "The field name from returned items to use as the key for the picklist.",
  clean: util.types.toString,
});

export const labelInput = input({
  label: "Label Field",
  type: "string",
  required: true,
  example: "email",
  placeholder: "Enter label field name",
  comments:
    "The field name from returned items to use as the label for the picklist.",
  clean: util.types.toString,
});

export const suiteQLQueryInputs = {
  connection: connectionInput,
  suiteQLInput,
  parameters: parametersInput,
  pagination: queryPagination,
};
