import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";

const categoryId = input({
  label: "Category ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the Content Builder category (folder).",
  example: "54975",
  placeholder: "Enter category ID",
  dataSource: "selectCategory",
  clean: util.types.toNumber,
});

const categoryName = input({
  label: "Category Name",
  type: "string",
  required: true,
  comments: "The display name for the Content Builder folder/category.",
  example: "Email Templates",
  placeholder: "Enter category name",
  clean: util.types.toString,
});

const parentCategoryId = input({
  label: "Parent Category ID",
  type: "string",
  required: true,
  comments:
    "The ID of the parent category. Omit to create a top-level category.",
  example: "12345",
  placeholder: "Enter parent category ID",
  dataSource: "selectCategory",
  clean: util.types.toNumber,
});

export const listCategoriesInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};

export const getCategoryInputs = {
  connection,
  categoryId,
};

export const updateCategoryInputs = {
  connection,
  categoryId,
  categoryName: {
    ...categoryName,
    required: false,
    clean: toOptionalString,
  },
  parentCategoryId: {
    ...parentCategoryId,
    required: false,
    clean: toOptionalNumber,
  },
};

export const deleteCategoryInputs = {
  connection,
  categoryId,
};

export const createCategoryInputs = {
  connection,
  categoryName,
  parentCategoryId,
};
