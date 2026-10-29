import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

export const getStagesStreamInputs = {
  connection,
  position: input({
    label: "Position",
    comments:
      "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
    placeholder: "Enter stream position",
    example: "top",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),
  limit: input({
    label: "Limit",
    comments: "The maximum number of events to return in a single response.",
    placeholder: "Enter limit",
    example: "100",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};

const pipelineId = input({
  label: "Pipeline ID",
  comments: "The unique identifier of the pipeline that contains this stage.",
  placeholder: "Enter Pipeline ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectPipeline",
});

const sortBy = input({
  label: "Sort By",
  comments:
    "Comma-separated list of fields to sort by. The sort criteria is applied in the order specified. The default ordering is ascending. To change the sort ordering to descending, append :desc to the field. Possible values: pipeline_id, id, name, category, position, likelihood.",
  placeholder: "Enter field to sort by",
  example: "position:desc",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of stage IDs to be returned in a request.",
  placeholder: "Enter comma-separated IDs",
  example: "12345678,87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const name = input({
  label: "Name",
  placeholder: "Enter name",
  example: "Qualified",
  comments:
    "Name of the stage to search for. This parameter is used in a strict sense.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const active = input({
  label: "Active",
  comments:
    "Parameter that determines whether to return active or inactive stages.",
  type: "string",
  required: false,
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "The page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "The number of records to return per page. The default limit is 25 and the maximum number that can be returned is 100.",
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

export const listStagesInputs = {
  connection,
  fetchAll,
  name,
  active,
  pipelineId,
  ids,
  sortBy,
  pagination,
};
