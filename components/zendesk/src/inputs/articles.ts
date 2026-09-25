import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  cleanNumber,
  cleanString,
  convertBooleanInputIntoUpdateInput,
} from "../util";
import { articleSortByOptions } from "../constants";
import {
  articleId,
  articleLabels,
  attachmentIds,
  authorId,
  body,
  commentsDisabled,
  connectionInput,
  contentTagIds,
  fetchAll,
  isDraft,
  labelNames,
  locale,
  notifySubscribers,
  pagination,
  permissionGroupId,
  position,
  promoted,
  sectionId,
  sortBy,
  sortOrder,
  startTime,
  title,
  userSegmentId,
} from "./common";
export const associateAttachmentsInBulkToArticleInputs = {
  zendeskConnection: connectionInput,
  locale,
  articleId,
  attachmentIds,
};
export const createArticleInputs = {
  zendeskConnection: connectionInput,
  locale,
  sectionId,
  articleTitle: {
    ...title,
    required: true,
  },
  userSegmentId,
  permissionGroupId,
  articleBody: {
    ...body,
  },
  isDraft,
  notifySubscribers,
};
export const listArticlesInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    comments: "The locale of the articles to retrieve. Defaults to 'en-us'.",
  },
  fetchAll,
  pagination,
  filters: structuredObjectInput({
    label: "Filters",
    comments: "Optional query controls to sort and refine the results.",
    inputs: {
      sortBy: {
        ...sortBy,
        comments: "The field to sort the articles by.",
        model: articleSortByOptions,
      },
      sortOrder,
      startTime: {
        ...startTime,
        comments: "The start time to filter articles by.",
      },
    },
  }),
  articleLabels,
};
export const showArticleInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    comments: "The locale of the articles to retrieve. Defaults to 'en-us'.",
  },
  articleId,
};
export const updateArticleInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    clean: cleanString,
  },
  articleId,
  assignmentIds: structuredObjectInput({
    label: "Assignment IDs",
    comments:
      "Write-action IDs that associate a record with related entities (sections, authors, permission groups, segments).",
    inputs: {
      sectionId: {
        ...sectionId,
        required: false,
        clean: cleanNumber,
      },
      authorId,
      permissionGroupId: {
        ...permissionGroupId,
        required: false,
        clean: cleanNumber,
      },
      userSegmentId: {
        ...userSegmentId,
        required: false,
        clean: cleanNumber,
      },
    },
  }),
  articleTitle: {
    ...title,
  },
  articleBody: {
    ...body,
  },
  displayOptions: structuredObjectInput({
    label: "Display Options",
    comments:
      "Whether the record is promoted, its ordering position, and whether comments are disabled.",
    inputs: {
      promoted: convertBooleanInputIntoUpdateInput(promoted),
      position,
      commentsDisabled: convertBooleanInputIntoUpdateInput(commentsDisabled),
    },
  }),
  contentTagIds,
  labelNames,
};
