import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  connectionInput,
  project_id,
  regionAndDomain,
  useProjectToken,
  workspace_id,
  from_date,
  to_date,
  where,
  limit,
} from "./common";
export const funnel_id = input({
  label: "Funnel ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier of the funnel to retrieve data for.",
  placeholder: "Enter funnel ID",
  dataSource: "funnels",
  required: true,
  example: "7509",
});
export const length = input({
  label: "Length",
  type: "string",
  clean: util.types.toString,
  comments:
    "The number of units (defined by length_unit) each user has to complete the funnel. Maximum 90 days. Defaults to the value saved in the UI for this funnel.",
  placeholder: "Enter length value",
  required: true,
  example: "7",
});
export const length_unit = input({
  label: "Length Unit",
  type: "string",
  clean: toOptionalString,
  comments:
    "The time unit for the length parameter. Defaults to the value saved in the UI for this funnel.",
  placeholder: "Select length unit",
  model: [
    {
      label: "day",
      value: "day",
    },
    {
      label: "hour",
      value: "hour",
    },
    {
      label: "minute",
      value: "minute",
    },
    {
      label: "seconds",
      value: "seconds",
    },
  ],
  required: false,
  example: "day",
});
export const interval = input({
  label: "Interval",
  type: "string",
  clean: toOptionalString,
  comments:
    "The number of days for each time bucket. Defaults to 1 day per bucket.",
  placeholder: "Enter interval in days",
  required: false,
  example: "1",
});
export const unit = input({
  label: "Unit",
  type: "string",
  clean: toOptionalString,
  comments:
    "An alternate way of specifying the interval. Choose day, week, or month.",
  placeholder: "Select time unit",
  model: [
    {
      label: "day",
      value: "day",
    },
    {
      label: "week",
      value: "week",
    },
    {
      label: "month",
      value: "month",
    },
  ],
  required: false,
  example: "week",
});
export const on = input({
  label: "On",
  type: "string",
  clean: toOptionalString,
  comments:
    "The property expression to segment the event on. See [segmentation expressions](https://docs.mixpanel.com/reference/segmentation-expressions) for syntax details.",
  placeholder: "Enter segmentation expression",
  required: false,
  example: "properties['account_id']",
});
export const segmentation = structuredObjectInput({
  label: "Segmentation",
  required: false,
  comments:
    "Property expression to segment on, an optional filter expression, and a result limit. Limit only applies when a segmentation expression is set.",
  inputs: { on, where, limit },
});
export const listSavedFunnelsInputs = {
  connection: connectionInput,
  useProjectToken,
  regionAndDomain,
  project_id: { ...project_id, required: true, clean: util.types.toString },
  workspace_id,
};
export const queryFunnelSavedReportsInputs = {
  connection: connectionInput,
  useProjectToken,
  regionAndDomain,
  funnel_id,
  from_date,
  to_date,
  project_id,
  workspace_id,
  length,
  length_unit,
  interval,
  unit,
  segmentation,
};
