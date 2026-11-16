import { input } from "@prismatic-io/spectral";
import { connection, fetchAll, itemId, listId, pagination, siteId } from "./common";
import { toKeyValueObject, toOptionalString } from "../util/clean";

const optInFields = input({
  label: "Opt In Fields",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated field names",
  example: "name, description, id",
  comments: "Comma-separated list of fields to return. Overrides the default result set.",
  clean: toOptionalString,
});

const fields = input({
  label: "Fields",
  type: "string",
  required: true,
  collection: "keyvaluelist",
  placeholder: "Enter field key-value pairs",
  comments:
    "Key-value pairs to set as properties on the list item. Each key represents a field name and its corresponding value.",
  clean: toKeyValueObject,
});

export const listSiteListsInputs = {
  connection,
  siteId,
  fetchAll,
};

export const getListInputs = {
  connection,
  siteId,
  listId,
};

export const getListItemsInSiteInputs = {
  connection,
  siteId,
  listId,
  pagination,
  optInFields,
};

export const getItemInSiteInputs = {
  connection,
  siteId,
  listId,
  itemId,
  optInFields,
};

export const createItemInSiteInputs = {
  connection,
  siteId,
  listId,
  fields,
};
