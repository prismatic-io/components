import { structuredObjectInput } from "@prismatic-io/spectral";
import { cleanNumber, cleanString } from "../util";
import {
  categoryId,
  connectionInput,
  fetchAll,
  locale,
  pageLimit,
  parentSectionId,
  position,
  sectionDescription,
  sectionId,
  sectionName,
  sortBy,
  sortOrder,
} from "./common";
export const createSectionInputs = {
  zendeskConnection: connectionInput,
  locale,
  categoryId,
  sectionName,
  sectionDescription,
  position: {
    ...position,
    comments: "The position of the section.",
  },
};
export const deleteSectionInputs = {
  zendeskConnection: connectionInput,
  locale,
  sectionId,
};
export const getSectionInputs = {
  zendeskConnection: connectionInput,
  locale,
  sectionId,
};
export const listSectionsInputs = {
  zendeskConnection: connectionInput,
  locale,
  fetchAll,
  pageLimit,
  filters: structuredObjectInput({
    label: "Filters",
    comments: "Optional query controls to sort and refine the results.",
    inputs: {
      categoryId: {
        ...categoryId,
        comments:
          "Input a categoryId to filter out sections by the ID provided.",
        required: false,
        clean: cleanNumber,
      },
      sortBy: {
        ...sortBy,
        model: [
          { label: "Position (Default)", value: "position" },
          {
            label: "Created At",
            value: "created_at",
          },
          {
            label: "Updated At",
            value: "updated_at",
          },
        ],
      },
      sortOrder,
    },
  }),
};
export const updateSectionInputs = {
  zendeskConnection: connectionInput,
  locale,
  sectionId,
  sectionName: {
    ...sectionName,
    required: false,
    comments: "Name of the Section to update.",
    clean: cleanString,
  },
  sectionDescription: {
    ...sectionDescription,
    comments: "Description of the Section to update.",
  },
  position: {
    ...position,
    comments: "Position of the Section to update.",
  },
  categoryId: {
    ...categoryId,
    required: false,
    comments: "Category ID of the Section to update.",
    clean: cleanNumber,
  },
  parentSectionId: {
    ...parentSectionId,
    comments: "Parent Section ID of the Section to update.",
  },
};
