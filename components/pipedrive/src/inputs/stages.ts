import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  sortBy,
  sortDirection,
  stageIdInput,
} from "./common";
import { cleanNumber, cleanString } from "../util";

const stageName = input({
  label: "Name",
  type: "string",
  required: true,
  comments:
    "A human-readable label that identifies the stage within a pipeline.",
  example: "Qualified Lead",
  placeholder: "Enter stage name",
  clean: util.types.toString,
});

const stageNameOptional = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "A human-readable label that identifies the stage within a pipeline.",
  example: "Qualified Lead",
  placeholder: "Enter stage name",
});

const pipelineIdRequired = input({
  label: "Pipeline ID",
  type: "string",
  required: true,
  comments: "The ID of the pipeline to add stage to.",
  example: "123",
  placeholder: "Enter Pipeline ID",
  clean: util.types.toNumber,
});

const pipelineIdOptional = input({
  label: "Pipeline ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the pipeline to add stage to.",
  example: "123",
  placeholder: "Enter Pipeline ID",
});

const dealProbability = input({
  label: "Deal Probability",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The success probability percentage of the deal.",
  example: "75",
  placeholder: "Enter probability percentage",
});

const rottenFlag = input({
  label: "Rotten Flag",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "Whether deals in this stage can become rotten",
});

const rottenFlagUpdate = input({
  label: "Rotten Flag",
  type: "boolean",
  required: false,
  clean: (value: unknown) => util.types.toBool(value) || undefined,
  comments: "Whether deals in this stage can become rotten",
});

const rottenDays = input({
  label: "Rotten Days",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments:
    "The number of days the deals not updated in this stage would become rotten.",
  example: "30",
  placeholder: "Enter number of days",
});

const stagesPipelineId = input({
  label: "Pipeline ID",
  type: "string",
  clean: cleanNumber,
  comments: "The ID of the pipeline to fetch stages for.",
  example: "123",
  placeholder: "Enter Pipeline ID",
});

const stageDealsFilterId = input({
  label: "Filter ID",
  type: "string",
  clean: cleanNumber,
  comments:
    "If supplied, only deals matching the given filter will be returned.",
  example: "123",
  placeholder: "Enter Filter ID",
});

export const addStageInputs = {
  connection: connectionInput,
  name: stageName,
  pipelineId: pipelineIdRequired,
  dealProbability,
  rottenFlag,
  rottenDays,
};

export const updateStageInputs = {
  connection: connectionInput,
  id: stageIdInput,
  name: stageNameOptional,
  pipelineId: pipelineIdOptional,
  dealProbability,
  rottenFlag: rottenFlagUpdate,
  rottenDays,
};

export const getStagesInputs = {
  connection: connectionInput,
  pipelineId: stagesPipelineId,
  sortBy,
  sortDirection,
  pagination: cursorPagination,
};

export const getStageDealsInputs = {
  connection: connectionInput,
  id: stageIdInput,
  filterId: stageDealsFilterId,
  pagination: cursorPagination,
  sortBy,
  sortDirection,
};

export const deleteStageInputs = {
  connection: connectionInput,
  id: stageIdInput,
};

export const getStageInputs = {
  connection: connectionInput,
  id: stageIdInput,
};
