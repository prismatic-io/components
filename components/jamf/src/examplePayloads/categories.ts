import type { Element } from "@prismatic-io/spectral";
import type { Category, JamfCreateResponse, PagedResponse } from "../types";

export const getCategoryExamplePayload: { data: Category } = {
  data: { id: "7", name: "Productivity Apps", priority: 9 },
};

export const listCategoriesExamplePayload: { data: PagedResponse<Category> } = {
  data: {
    results: [getCategoryExamplePayload.data],
    totalCount: 1,
  },
};

export const createCategoryExamplePayload: { data: JamfCreateResponse } = {
  data: {
    id: "8",
    href: "https://your-instance.jamfcloud.com/api/v1/categories/8",
  },
};

export const updateCategoryExamplePayload: { data: Category } = {
  data: { id: "7", name: "Productivity Apps", priority: 9 },
};

export const deleteCategoryExamplePayload: { data: string } = {
  data: "Successfully deleted category 7",
};

export const selectCategoryExamplePayload: { result: Element[] } = {
  result: [{ key: "7", label: "Productivity Apps" }],
};
