import { cleanString } from "../util";
import {
  categoryDescription,
  categoryId,
  categoryName,
  connectionInput,
  fetchAll,
  locale,
  pageLimit,
  position,
  sortBy,
  sortOrder,
} from "./common";
export const createCategoryInputs = {
  zendeskConnection: connectionInput,
  categoryName: {
    ...categoryName,
    required: false,
    clean: cleanString,
  },
  categoryDescription: {
    ...categoryDescription,
    required: false,
    clean: cleanString,
  },
  locale,
  position: {
    ...position,
    comments: "The position of the category to be created.",
  },
};
export const deleteCategoryInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the category picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  categoryId,
};
export const getCategoryInputs = {
  zendeskConnection: connectionInput,
  locale,
  categoryId,
};
export const listCategoriesInputs = {
  zendeskConnection: connectionInput,
  locale,
  fetchAll,
  pageLimit,
  sortBy: {
    ...sortBy,
    model: [
      {
        label: "Position",
        value: "position",
      },
      {
        label: "Created At",
        value: "created_at",
      },
      {
        label: "Updated At",
        value: "updated_at",
      },
    ].map((item) => {
      return {
        label: item.label,
        value: item.value,
      };
    }),
  },
  sortOrder,
};
export const updateCategoryInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments: "The locale of the category to be updated.",
    clean: cleanString,
  },
  categoryId,
  categoryName: {
    ...categoryName,
    required: false,
    comments: "The name of the category to be updated.",
    clean: cleanString,
  },
  categoryDescription: {
    ...categoryDescription,
    required: false,
    comments: "The description of the category to be updated.",
    clean: cleanString,
  },
  position: {
    ...position,
    comments: "The position of the category to be updated.",
  },
};
