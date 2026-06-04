import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listNotesInputs = {
  connection,
  fetchAll,
  sortBy: input({
    label: "Sort By",
    comments:
      "A field to sort by. Default ordering is ascending. If you want to change the sort ordering to descending, append :desc to the field e.g. sort_by=resource_type:desc. Possible values, resource_type, created_at, updated_at",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  includes: input({
    label: "Includes",
    comments:
      "Comma-separated list of one or more resources related to the note. Not supported at the moment.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ids: input({
    label: "IDs",
    comments: "Comma-separated list of note IDs to be returned in a request.",
    placeholder: "Enter comma-separated IDs",
    example: "12345678,87654321",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  creatorId: input({
    label: "Creator ID",
    comments:
      "Unique identifier of the user. Returns all notes created by the user.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  q: input({
    label: "Q",
    comments:
      "A query string to search for. Performs a full text search on the content field.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  resourceType: input({
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
  }),

  resourceId: input({
    label: "Resource ID",
    comments: "Unique identifier of the resource to search for.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  page: input({
    label: "Page",
    comments:
      "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "Number of records to return per page. The default limit is 25 and the maximum number that can be returned at one time is 100.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
