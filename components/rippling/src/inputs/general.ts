import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../utils";


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
  comments: "The Rippling connection to use.",
});


export const orderBy = input({
  label: "Order By",
  type: "string",
  required: false,
  placeholder: "Enter sort field and direction",
  example: "created_at desc",
  comments:
    "Sortable fields: id, created_at, updated_at. Example: created_at desc.",
  clean: toOptionalString,
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  placeholder: "Enter pagination cursor",
  example: "eyJpZCI6MTIzNDU2fQ==",
  comments:
    "Pagination cursor token from the next_link field in the previous API response.",
  clean: toOptionalString,
});


export const name = input({
  label: "Name",
  type: "string",
  required: true,
  placeholder: "Enter name",
  example: "Engineering Department",
  comments: "The name of the resource.",
  clean: util.types.toString,
});


export const description = input({
  label: "Description",
  type: "string",
  required: false,
  placeholder: "Enter description",
  example:
    "Department responsible for product development and technical infrastructure",
  comments: "A description of the resource.",
  clean: toOptionalString,
});


export const category = input({
  label: "Category",
  type: "string",
  required: false,
  placeholder: "Enter category",
  example: "Operations",
  comments: "The category for the resource.",
  clean: toOptionalString,
});


export const paginationInputs = {
  fetchAll,
  orderBy,
  cursor,
};
