import type { PaginatedResponse } from "../types";

export const listCategoriesExamplePayload: { data: PaginatedResponse } = {
  data: {
    count: 1,
    page: 1,
    pageSize: 50,
    links: {},
    items: [
      {
        id: 54975,
        description: "The root folder for assets",
        enterpriseId: 10001,
        memberId: 10001,
        name: "Content Builder",
        parentId: 0,
        categoryType: "asset",
      },
    ],
  },
};

export const getCategoryExamplePayload = {
  data: {
    id: 54975,
    description: "The root folder for assets",
    enterpriseId: 10001,
    memberId: 10001,
    name: "Content Builder",
    parentId: 0,
    categoryType: "asset",
  },
};

export const updateCategoryExamplePayload = getCategoryExamplePayload;

export const deleteCategoryExamplePayload = {
  data: null,
};

export const createCategoryExamplePayload = {
  data: {
    id: 337349,
    description: "",
    enterpriseId: 100012041,
    memberId: 100012041,
    name: "Example Category",
    parentId: 54975,
    categoryType: "asset",
  },
};
