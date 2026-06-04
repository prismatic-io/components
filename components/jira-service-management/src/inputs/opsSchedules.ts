import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import { additionalQueryParams, connection, fetchAll } from "./common";

const scheduleId = input({
  label: "Schedule",
  type: "string",
  required: true,
  comments: "The ID of the schedule.",
  placeholder: "Enter schedule ID",
  example: "55a1ec02-92b6-4c95-9f0a-44213c8c5fb6",
  dataSource: "selectOpsSchedule",
  clean: util.types.toString,
});

const scheduleQuery = input({
  label: "Query",
  type: "string",
  required: false,
  comments: "Filters schedules by name (substring match).",
  placeholder: "Enter query",
  example: "production",
  clean: toOptionalString,
});

const scheduleFlat = input({
  label: "Flatten On-Call",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, returns only the user IDs of the on-call participants. When false, returns the full rotation tree.",
  clean: util.types.toBool,
});

const scheduleDate = input({
  label: "Reference Date",
  type: "string",
  required: false,
  comments:
    "ISO-8601 timestamp at which to evaluate the on-call list. Defaults to the current time.",
  placeholder: "Enter ISO-8601 timestamp",
  example: "2026-05-04T18:30:00Z",
  clean: toOptionalString,
});

const scheduleOffset = input({
  label: "Offset",
  type: "string",
  required: false,
  default: "0",
  comments: "Index of the first result to return.",
  placeholder: "Enter offset",
  example: "0",
  clean: toOptionalNumber,
});

const scheduleSize = input({
  label: "Size",
  type: "string",
  required: false,
  default: "25",
  comments: "Maximum number of results per page (Atlassian max: 50).",
  placeholder: "Enter size",
  example: "25",
  clean: toOptionalNumber,
});

export const listOpsSchedulesInputs = {
  connection,
  fetchAll,
  scheduleQuery,
  scheduleOffset,
  scheduleSize,
  additionalQueryParams,
};

export const getOpsScheduleInputs = {
  connection,
  scheduleId,
};

export const getOpsOnCallInputs = {
  connection,
  scheduleId,
  scheduleFlat,
  scheduleDate,
};
