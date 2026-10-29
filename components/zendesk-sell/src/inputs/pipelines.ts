import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of IDs to be returned in request.",
  placeholder: "Enter comma-separated IDs",
  example: "1,2,3",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sortBy = input({
  label: "Sort By",
  comments:
    "Comma-separated list of fields to sort by. The sort criteria is applied in the order specified. The default ordering is ascending. To change the sort ordering to descending, append :desc to the field.",
  placeholder: "Enter field to sort by",
  type: "string",
  example: "name:desc",
  required: false,
  clean: util.types.toString,
});

const name = input({
  label: "Name",
  placeholder: "Enter name",
  comments:
    "Name of the pipeline to search for. This parameter is used in a strict sense.",
  type: "string",
  example: "My Pipeline",
  required: false,
  clean: util.types.toString,
});

const disabled = input({
  label: "Disabled",
  comments:
    "Parameter that determines whether to return disabled or enabled pipelines.",
  type: "string",
  example: "false",
  required: false,
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  type: "string",
  required: false,
  example: "2",
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "Number of records to return per page. Default limit is 25 and the maximum number that can be returned is 100.",
  placeholder: "Enter results per page",
  type: "string",
  required: false,
  example: "20",
  clean: util.types.toString,
});

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, perPage },
});

export const listPipelinesInputs = {
  connection,
  fetchAll,
  name,
  disabled,
  ids,
  sortBy,
  pagination,
};
