import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  pipelineIdInput,
  sortBy,
  sortDirection,
} from "./common";
import { cleanNumber, cleanString } from "../util";

const pipelineName = input({
  label: "Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "A human-readable label that identifies the pipeline.",
  example: "Sales Pipeline",
  placeholder: "Enter pipeline name",
});

const pipelineNameOptional = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "A human-readable label that identifies the pipeline.",
  example: "Sales Pipeline",
  placeholder: "Enter pipeline name",
});

const isDealProbabilityEnabled = input({
  label: "Deal Probability",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "Whether deal probability is disabled or enabled for this pipeline",
});

const totalsConvertCurrency = input({
  label: "Totals Convert Currency",
  type: "string",
  clean: cleanString,
  comments: "The 3-letter currency code of any of the supported currencies.",
  example: "USD",
  placeholder: "Enter currency code (e.g. USD)",
});

const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The start of the period.",
  example: "2024-01-01",
  placeholder: "Enter start date (YYYY-MM-DD)",
});

const endDate = input({
  label: "End Date",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The end of the period.",
  example: "2024-12-31",
  placeholder: "Enter end date (YYYY-MM-DD)",
});

const statsUserId = input({
  label: "User ID",
  type: "string",
  clean: cleanNumber,
  comments: "The ID of the user whose pipeline metrics statistics to fetch.",
  example: "123",
  placeholder: "Enter User ID",
});

const movementStatsUserId = input({
  label: "User ID",
  type: "string",
  clean: cleanNumber,
  comments: "The ID of the user whose pipeline movement statistics to fetch.",
  example: "123",
  placeholder: "Enter User ID",
});

const pipelineDealsFilterId = input({
  label: "Filter ID",
  type: "string",
  clean: cleanNumber,
  comments:
    "If supplied, only deals matching the given filter will be returned.",
  example: "123",
  placeholder: "Enter Filter ID",
});

const pipelineDealsStageId = input({
  label: "Stage ID",
  type: "string",
  clean: cleanNumber,
  comments: "If supplied, only deals within the given stage will be returned.",
  example: "123",
  placeholder: "Enter Stage ID",
});

export const addPipelineInputs = {
  connection: connectionInput,
  name: pipelineName,
  isDealProbabilityEnabled,
};

export const updatePipelineInputs = {
  connection: connectionInput,
  id: pipelineIdInput,
  name: pipelineNameOptional,
  isDealProbabilityEnabled,
};

export const getPipelineInputs = {
  connection: connectionInput,
  id: pipelineIdInput,
  totalsConvertCurrency,
};

export const getPipelineConversionStatisticsInputs = {
  connection: connectionInput,
  id: pipelineIdInput,
  startDate,
  endDate,
  userId: statsUserId,
};

export const getPipelineDealsInputs = {
  id: pipelineIdInput,
  filterId: pipelineDealsFilterId,
  stageId: pipelineDealsStageId,
  pagination: cursorPagination,
  sortBy,
  sortDirection: {
    ...sortDirection,
    default: "desc",
  },
  connection: connectionInput,
};

export const getPipelineMovementStatisticsInputs = {
  connection: connectionInput,
  id: pipelineIdInput,
  startDate,
  endDate,
  userId: movementStatsUserId,
};

export const getPipelinesInputs = {
  sortBy,
  sortDirection,
  pagination: cursorPagination,
  connection: connectionInput,
};

export const deletePipelineInputs = {
  connection: connectionInput,
  id: pipelineIdInput,
};
