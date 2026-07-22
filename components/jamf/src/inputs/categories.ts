import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  connection,
  fetchAll,
  filter,
  page,
  pageSize,
  resourceId,
  sort,
} from "./common";
const categoryName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name used to identify the category in Jamf Pro.",
  clean: util.types.toString,
  placeholder: "Enter category name",
  example: "Productivity Apps",
});
const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  default: "9",
  comments:
    "The sort order weight for the category. Lower numbers appear first.",
  clean: util.types.toNumber,
  placeholder: "Enter priority",
  example: "9",
});
const categoryResourceId = {
  ...resourceId,
  label: "Category",
  comments: "The unique identifier of the category.",
  dataSource: "selectCategory",
};
export const createCategoryInputs = { connection, categoryName, priority };
export const deleteCategoryInputs = {
  connection,
  resourceId: categoryResourceId,
};
export const getCategoryInputs = { connection, resourceId: categoryResourceId };
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listCategoriesInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
};
const updateCategoryName = {
  ...categoryName,
  required: false,
  clean: toOptionalString,
};
const updateCategoryPriority = {
  ...priority,
  default: undefined,
  clean: toOptionalNumber,
};
export const updateCategoryInputs = {
  connection,
  resourceId: categoryResourceId,
  categoryName: updateCategoryName,
  priority: updateCategoryPriority,
};
