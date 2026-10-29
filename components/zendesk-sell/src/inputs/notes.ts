import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

const tags = input({
  label: "Tags",
  comments: "Tags to apply to the note.",
  example: "premium",
  type: "string",
  collection: "valuelist",
  required: false,
});

const isImportant = input({
  label: "Is Important",
  comments: "When true, marks the note as important.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const noteType = input({
  label: "Type",
  comments:
    "The type of note. Possible values: regular or other types supported by the API.",
  placeholder: "Enter note type",
  example: "regular",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const contentRequired = input({
  label: "Content",
  comments: "The body text of the note.",
  placeholder: "Enter note content",
  example: "Highly important.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const contentOptional = input({
  label: "Content",
  comments: "The body text of the note.",
  placeholder: "Enter note content",
  example: "Highly important.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const resourceTypeRequired = input({
  label: "Resource Type",
  comments:
    "The type of resource the note is attached to. Possible values: lead, contact, deal.",
  placeholder: "Enter resource type",
  example: "lead",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const resourceTypeOptional = input({
  label: "Resource Type",
  comments:
    "The type of resource the note is attached to. Possible values: lead, contact, deal.",
  placeholder: "Enter resource type",
  example: "lead",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const resourceIdRequired = input({
  label: "Resource ID",
  comments: "The unique identifier of the resource the note is attached to.",
  placeholder: "Enter resource ID",
  example: "12345678",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const noteId = input({
  label: "Note ID",
  comments: "The unique identifier of the note.",
  placeholder: "Enter Note ID",
  example: "12345678",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectNote",
});

const position = input({
  label: "Position",
  comments:
    "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
  placeholder: "Enter stream position",
  example: "top",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const limit = input({
  label: "Limit",
  comments: "The maximum number of events to return in a single response.",
  placeholder: "Enter limit",
  example: "100",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sortBy = input({
  label: "Sort By",
  comments:
    "A field to sort by. Default ordering is ascending. To change the sort ordering to descending, append :desc to the field, e.g. sort_by=resource_type:desc. Possible values: resource_type, created_at, updated_at.",
  placeholder: "Enter field to sort by",
  example: "created_at:desc",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const includes = input({
  label: "Includes",
  comments:
    "Comma-separated list of one or more resources related to the note. Not supported at the moment.",
  placeholder: "Enter related resources",
  example: "associated_contacts",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of note IDs to be returned in a request.",
  placeholder: "Enter comma-separated IDs",
  example: "12345678,87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const creatorId = input({
  label: "Creator ID",
  comments:
    "Unique identifier of the user. Returns all notes created by the user.",
  placeholder: "Enter Creator ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const q = input({
  label: "Query",
  comments:
    "A query string to search for. Performs a full text search on the content field.",
  placeholder: "Enter search query",
  example: "follow up",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const resourceType = input({
  label: "Resource Type",
  comments:
    "Name of the type of resource to search for. Possible values: lead, contact, deal",
  type: "string",
  default: "",
  model: [
    { label: "lead", value: "lead" },
    { label: "contact", value: "contact" },
    { label: "deal", value: "deal" },
  ],
  required: false,
  clean: util.types.toString,
});

const resourceId = input({
  label: "Resource ID",
  comments: "The unique identifier of the resource the note is attached to.",
  placeholder: "Enter resource ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "Number of records to return per page. The default limit is 25 and the maximum number that can be returned at one time is 100.",
  placeholder: "Enter results per page",
  example: "25",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, perPage },
});

const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields for the request. Includes: Sort By, Includes, and Query.",
  inputs: { sortBy, includes, q },
});

export const createNoteInputs = {
  connection,
  content: contentRequired,
  resourceType: resourceTypeRequired,
  resourceId: resourceIdRequired,
  tags,
  isImportant,
  type: noteType,
};

export const deleteNoteInputs = {
  connection,
  id: noteId,
};

export const getNoteInputs = {
  connection,
  id: noteId,
};

export const getNotesStreamInputs = {
  connection,
  position,
  limit,
};

export const listNotesInputs = {
  connection,
  fetchAll,
  resourceType,
  resourceId,
  ids,
  creatorId,
  pagination,
  additionalFields,
};

export const updateNoteInputs = {
  connection,
  content: contentOptional,
  resourceType: resourceTypeOptional,
  resourceId,
  tags,
  isImportant,
  type: noteType,
};
