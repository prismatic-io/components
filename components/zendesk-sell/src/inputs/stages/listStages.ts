import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listStagesInputs = {
  connection,
  fetchAll,
  pipelineId: input({
    label: "Pipeline ID",
    comments: "The unique identifier of the pipeline that contains this stage.",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectPipeline",
  }),

  sortBy: input({
    label: "Sort By",
    comments:
      "Comma-separated list of fields to sort by. The sort criteria is applied in the order specified. The default ordering is ascending. If you want to change the sort ordering to descending, append :desc to the field. Possible values: pipeline_id, id, name, category, position, likelihood",
    example: "position:desc",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ids: input({
    label: "IDs",
    comments: "Comma-separated list of stage IDs to be returned in a request.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  name: input({
    label: "Name",
    placeholder: "Enter name",
    comments:
      "Name of the stage you're searching for. This parameter is used in a strict sense.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  active: input({
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
  }),
  page: input({
    label: "Page",
    comments:
      "The page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "The number of records to return per page. The default limit is 25 and the maximum number that can be returned is 100.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
