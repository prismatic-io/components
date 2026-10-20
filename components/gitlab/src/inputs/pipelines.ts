import { input } from "@prismatic-io/spectral";
import { PIPELINE_STATUS_OPTIONS } from "../constants";
import { cleanString, toRequiredId } from "../utils";
import {
  connectionInput,
  fetchAll,
  pagination,
  project,
  refName,
  updatedAfter,
} from "./common";
const pipelineId = input({
  label: "Pipeline ID",
  placeholder: "Enter pipeline ID",
  type: "string",
  required: true,
  comments: "The numeric ID of the pipeline.",
  example: "61205",
  clean: toRequiredId,
});
const pipelineStatus = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "Return only pipelines with this status.",
  model: PIPELINE_STATUS_OPTIONS,
  clean: cleanString,
});
export const listPipelinesInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  refName,
  pipelineStatus,
  updatedAfter,
};
export const getPipelineInputs = {
  connection: connectionInput,
  project,
  pipelineId,
};
