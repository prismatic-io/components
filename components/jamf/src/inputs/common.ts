import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Jamf Pro connection to use.",
});

export const resourceId = input({
  label: "ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the resource.",
  clean: util.types.toString,
  placeholder: "Enter resource ID",
  example: "1",
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  default: "0",
  comments:
    "The zero-indexed page number for paginated results. Page 0 is the first page.",
  clean: toOptionalString,
  placeholder: "Enter page number",
  example: "0",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum 1000.",
  clean: toOptionalString,
  placeholder: "Enter page size",
  example: "100",
  default: "100",
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    'An RSQL filter expression to narrow results. Example: name=="Apps*" or id>=5. Leave blank to return all results.',
  clean: toOptionalString,
  placeholder: "Enter filter expression",
  example: 'name=="Acme*"',
});

export const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments:
    "The sort criteria in the format property:asc or property:desc. Multiple criteria are comma-separated.",
  clean: toOptionalString,
  placeholder: "Enter sort criteria",
  example: "name:asc,id:desc",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If true, fetch every page of results and ignore the Page and Page Size inputs. If false, return a single page.",
  clean: util.types.toBool,
});
