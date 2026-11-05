import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { MAX_FETCH_ALL_PAGES, MAX_PAGE_LIMIT, SORT_ORDERS } from "../constants";
import { cleanLimit, cleanString } from "../utils/clean";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The AEM as a Cloud Service connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: `When true, automatically fetches all pages of results using pagination, up to ${MAX_FETCH_ALL_PAGES} pages of ${MAX_PAGE_LIMIT}. Limit is ignored; when Cursor is set, fetching starts from that page. When more results remain, the output includes a cursor to continue from.`,
  clean: util.types.toBool,
});

const cursor = input({
  label: "Cursor",
  placeholder: "Enter cursor",
  type: "string",
  required: false,
  comments: "The cursor returned by a previous page, used to fetch the next page.",
  example: "eyJsYXN0SWQiOiIxMjM0NSJ9",
  clean: cleanString,
});

const limit = input({
  label: "Limit",
  placeholder: "Enter limit",
  type: "string",
  required: false,
  comments: `The maximum number of results to return per page, from 1 to ${MAX_PAGE_LIMIT}.`,
  example: "25",
  clean: cleanLimit,
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { cursor, limit },
});

export const sortOrder = input({
  label: "Sort Order",
  type: "string",
  required: false,
  default: "ASC",
  model: SORT_ORDERS,
  comments: "The direction to sort results in. Used only when Sort By is set.",
  clean: cleanString,
});
