import { paginationAttributes } from "./general";
const createCategoryRaw = {
  category: {
    description: "This category contains a collection of Super Hero tricks",
    id: 37486578,
    locale: "en-us",
    name: "Super Hero Tricks",
  },
};
const getCategoryRaw = createCategoryRaw;
const updateCategoryRaw = createCategoryRaw;
const listCategoriesRaw = {
  ...paginationAttributes,
  categories: [
    {
      description: "This category contains a collection of Super Hero tricks",
      id: 37486578,
      locale: "en-us",
      name: "Super Hero Tricks",
    },
    {
      description: "All the cool tricks!",
      id: 354675463,
      locale: "en-us",
      name: "Tips & Tricks",
    },
  ],
};
export const createCategoryExamplePayload = { data: createCategoryRaw };
export const deleteCategoryExamplePayload = { data: "" };
export const getCategoryExamplePayload = { data: getCategoryRaw };
export const listCategoriesExamplePayload = { data: listCategoriesRaw };
export const updateCategoryExamplePayload = { data: updateCategoryRaw };
