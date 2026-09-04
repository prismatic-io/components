import { util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  actionInput,
  assignableInput,
  categoryGuidInput,
  connectionInput,
  creatableOnlyInput,
  editableOnlyInput,
  includeDeletedInput,
  includePossibleValuesInput,
  objectTypeInput,
  pathInput,
  searchableOnlyInput,
  userInput,
} from "./common";
export const listBomAttributesInputs = {
  connection: connectionInput,
  includePossibleValues: includePossibleValuesInput,
  creatableOnly: creatableOnlyInput,
  editableOnly: editableOnlyInput,
  searchableOnly: searchableOnlyInput,
  includeDeleted: {
    ...includeDeletedInput,
    comments: "Whether to include deleted attributes in the results.",
  },
};
export const listCategoriesInputs = {
  connection: connectionInput,
  objectType: {
    ...objectTypeInput,
    required: true,
    placeholder: "Select an object type",
    comments: "The type of object to get categories for.",
    model: [
      { label: "Items", value: "items" },
      { label: "Files", value: "files" },
      { label: "Changes", value: "changes" },
      { label: "Requests", value: "requests" },
    ],
    default: "items",
    clean: util.types.toString,
  },
  path: {
    ...pathInput,
    comments: "Filter categories by path (optional).",
  },
  includeDeleted: {
    ...includeDeletedInput,
    comments: "Whether to include deleted categories in the results.",
  },
  assignable: {
    ...assignableInput,
    label: "Assignable Only",
  },
  user: {
    ...userInput,
    comments: "Filter categories accessible to the specified user.",
    clean: toOptionalString,
  },
  action: {
    ...actionInput,
    comments: "Filter categories by the specified action.",
    clean: toOptionalString,
  },
};
export const listCategoryAttributesInputs = {
  connection: connectionInput,
  objectType: {
    ...objectTypeInput,
    required: true,
    placeholder: "Select an object type",
    comments:
      "The type of object (items, files, changes, requests, suppliers, or supplieritems).",
    model: [
      { label: "Items", value: "items" },
      { label: "Files", value: "files" },
      { label: "Changes", value: "changes" },
      { label: "Requests", value: "requests" },
      { label: "Suppliers", value: "suppliers" },
      { label: "Supplier Items", value: "supplieritems" },
    ],
    clean: util.types.toString,
  },
  categoryGuid: {
    ...categoryGuidInput,
    required: true,
    comments: "The GUID of the category to get attributes for.",
    clean: util.types.toString,
  },
  includePossibleValues: includePossibleValuesInput,
  creatableOnly: creatableOnlyInput,
  editableOnly: editableOnlyInput,
  searchableOnly: searchableOnlyInput,
  user: {
    ...userInput,
    comments: "Filter attributes accessible to the specified user.",
    clean: toOptionalString,
  },
  action: {
    ...actionInput,
    comments: "Filter attributes by the specified action.",
    clean: toOptionalString,
  },
};
