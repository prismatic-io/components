import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  boardId,
  boardIdRequired,
  connection,
  fetchAll,
  limit,
  skip,
} from "./common";

const categoryIdRequired = input({
  label: "Category ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the category.",
  clean: util.types.toString,
  placeholder: "Enter category ID",
  example: "553c3ef8b8cdcd1501baabcd",
  dataSource: "selectCategory",
});

const categoryName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the category.",
  clean: util.types.toString,
  placeholder: "Enter category name",
  example: "UI Improvements",
});

const subscribeAdmins = input({
  label: "Subscribe Admins",
  type: "boolean",
  required: true,
  comments: "When true, subscribes admins to the category.",
  clean: util.types.toBool,
});

const parentCategoryId = input({
  label: "Parent Category ID",
  type: "string",
  required: false,
  comments: "Parent category ID for subcategories.",
  clean: toOptionalString,
  placeholder: "Enter parent category ID",
  example: "553c3ef8b8cdcd1501baabcd",
  dataSource: "selectCategory",
});

export const listCategoriesInputs = {
  connection,
  boardId,
  fetchAll,
  limit,
  skip,
};

export const retrieveCategoryInputs = { connection, categoryIdRequired };

export const createCategoryInputs = {
  connection,
  boardIdRequired,
  categoryName,
  subscribeAdmins,
  parentCategoryId,
};

export const deleteCategoryInputs = { connection, categoryIdRequired };

export const selectCategoryInputs = {
  connection,
  boardId: { ...boardId, dataSource: undefined },
};
