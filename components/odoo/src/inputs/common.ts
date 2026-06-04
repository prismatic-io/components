import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Odoo connection to use.",
});

export const model = input({
  label: "Model",
  type: "string",
  comments:
    "The type of record to query. Use the 'List Models' action for a list of available models.",
  required: true,
  example: "res.partner",
  placeholder: "Enter the model name",
  dataSource: "selectModel",
  clean: util.types.toString,
});

export const limit = input({
  label: "Limit",
  type: "string",
  comments:
    "The maximum number of records to return per page. See [Pagination](https://www.odoo.com/documentation/19.0/developer/reference/external_api.html#pagination).",
  example: "10",
  placeholder: "Enter the page size",
  required: false,
  clean: util.types.toNumber,
});

export const offset = input({
  label: "Offset",
  type: "string",
  comments:
    "The number of records to skip before starting the page (0-based). See [Pagination](https://www.odoo.com/documentation/19.0/developer/reference/external_api.html#pagination).",
  example: "20",
  placeholder: "Enter the offset",
  required: false,
  clean: util.types.toNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of records. Overrides the Limit and Offset inputs.",
  clean: util.types.toBool,
});

export const nameSearch = input({
  label: "Name Search",
  type: "string",
  required: false,
  comments:
    "Filter results to entries whose name contains this case-insensitive search term.",
  example: "Partner",
  placeholder: "Enter a search term",
  clean: toOptionalString,
});

export const modelSearch = input({
  label: "Model Search",
  type: "string",
  required: false,
  comments:
    "Filter results to entries whose technical model identifier contains this case-insensitive search term.",
  example: "res.partner",
  placeholder: "Enter a model search term",
  clean: toOptionalString,
});
