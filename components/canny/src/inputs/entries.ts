import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { additionalFields, connection, fetchAll, limit, skip } from "./common";

const entryTitle = input({
  label: "Title",
  type: "string",
  required: true,
  comments: "The changelog entry title.",
  clean: util.types.toString,
  placeholder: "Enter entry title",
  example: "New Dashboard Features",
});

const entryDetails = input({
  label: "Details",
  type: "text",
  required: true,
  comments: "The entry content (markdown supported).",
  clean: util.types.toString,
  placeholder: "Enter entry details",
  example: "We've added several new features to the dashboard...",
});

const entryType = input({
  label: "Type",
  type: "string",
  required: false,
  comments: "Entry type: new, improved, or fixed.",
  clean: toOptionalString,
  model: [
    { label: "New", value: "new" },
    { label: "Improved", value: "improved" },
    { label: "Fixed", value: "fixed" },
  ],
  placeholder: "Enter entry type",
  example: "new",
});

const notify = input({
  label: "Notify",
  type: "boolean",
  required: false,
  comments: "When true, sends an email notification for the changelog entry.",
  clean: util.types.toBool,
});

const published = input({
  label: "Published",
  type: "boolean",
  required: false,
  comments: "When true, publishes the changelog entry immediately.",
  clean: util.types.toBool,
});

const entrySort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments: "Sort order for changelog entries.",
  clean: toOptionalString,
  model: [
    { label: "Created", value: "created" },
    { label: "Last Saved", value: "lastSaved" },
    { label: "Non-Published First", value: "nonPublishedFirst" },
    { label: "Published At", value: "publishedAt" },
  ],
  placeholder: "Enter sort order",
  example: "nonPublishedFirst",
});

export const listEntriesInputs = {
  connection,
  entryType,
  entrySort,
  fetchAll,
  limit,
  skip,
};

export const createEntryInputs = {
  connection,
  entryTitle,
  entryDetails,
  entryType,
  notify,
  published,
  additionalFields,
};
