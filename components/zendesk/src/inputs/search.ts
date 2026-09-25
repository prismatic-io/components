import { structuredObjectInput } from "@prismatic-io/spectral";
import { cleanNumber } from "../util";
import {
  brandIds,
  categoryIds,
  connectionInput,
  contentTypes,
  dateRangeFilters,
  externalSourceIds,
  filterLabelNames,
  filterSectionId,
  locales,
  pagination,
  searchQuery,
  sectionIds,
  shouldFilterMultibrand,
  sortBy,
  sortOrder,
  topicId,
  topicIds,
} from "./common";
export const searchArticlesInputs = {
  zendeskConnection: connectionInput,
  searchQuery,
  filterLocale: {
    ...locales,
    required: false,
    comments: "The locale to filter the results by.",
  },
  brandIds,
  categoryIds,
  filters: structuredObjectInput({
    label: "Filters",
    comments: "Optional query controls to sort and refine the results.",
    inputs: {
      filterSectionId,
      shouldFilterMultibrand,
      sortBy: {
        ...sortBy,
        model: [
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
  dateRangeFilters,
  filterLabelNames,
};
export const searchPostsInputs = {
  zendeskConnection: connectionInput,
  searchQuery,
  filters: structuredObjectInput({
    label: "Filters",
    comments: "Optional query controls to sort and refine the results.",
    inputs: {
      topicId: {
        ...topicId,
        required: false,
        comments: "The ID of the topic to filter posts by.",
        clean: cleanNumber,
      },
      sortBy: {
        ...sortBy,
        model: [
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
  dateRangeFilters,
};
export const unifiedSearchInputs = {
  zendeskConnection: connectionInput,
  searchQuery,
  locales,
  pagination,
  brandIds,
  categoryIds,
  contentTypes,
  externalSourceIds,
  sectionIds,
  topicIds,
};
