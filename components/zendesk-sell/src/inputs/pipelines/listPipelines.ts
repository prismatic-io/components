import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listPipelinesInputs = {
  connection,
  fetchAll,
  ids: input({
    label: "IDs",
    comments: "Comma-separated list of IDs to be returned in request.",
    placeholder: "Enter comma-separated IDs",
    example: "1,2,3",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  sortBy: input({
    label: "Sort By",
    comments:
      "Comma-separated list of fields to sort by. The sort criteria is applied in the order specified. The default ordering is ascending. If you want to change the sort ordering to descending, append :desc to the field.",
    type: "string",
    example: "name:desc",
    required: false,
    clean: util.types.toString,
  }),

  name: input({
    label: "Name",
    placeholder: "Enter name",
    comments:
      "Name of the pipeline to search for. This parameter is used in a strict sense.",
    type: "string",
    example: "My Pipeline",
    required: false,
    clean: util.types.toString,
  }),

  disabled: input({
    label: "Disabled",
    comments:
      "Parameter that determines whether to return disabled or enabled pipelines.",
    type: "string",
    example: "false",
    required: false,
    clean: util.types.toString,
  }),
  page: input({
    label: "Page",
    comments:
      "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
    type: "string",
    required: false,
    example: "2",
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "Number of records to return per page. Default limit is 25 and the maximum number that can be returned is 100.",
    type: "string",
    required: false,
    example: "20",
    clean: util.types.toString,
  }),
};
