import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { toOptionalString, valueListInputClean } from "../util";
import gcsRegions from "../gcs_regions.json";
import {
  connectionInput,
  dataAndDomain,
  project_id,
  from_date,
  to_date,
  where,
  useProjectToken,
} from "./common";
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const name = input({
  label: "Name",
  type: "string",
  clean: util.types.toString,
  comments: "The unique name that identifies the pipeline.",
  placeholder: "Enter pipeline name",
  required: true,
  dataSource: "pipelines",
  example: "events-daily-export",
});
export const summary = input({
  label: "Summary",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, returns only task count by status without detailed information.",
  required: false,
  example: "false",
  default: "false",
});
export const status = input({
  label: "Status",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of status values to filter tasks. Valid options: pending, running, retried, failed, canceled, timed_out.",
  default: ["pending"],
  clean: valueListInputClean,
  example: "pending, running, retried",
});
const trial = input({
  label: "Trial",
  type: "string",
  clean: toOptionalString,
  comments:
    "When true, creates a trial pipeline for testing purposes before production deployment.",
  placeholder: "Select trial mode",
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  default: "",
});
export const frequency = input({
  label: "Frequency",
  type: "string",
  clean: toOptionalString,
  comments:
    "The export frequency. 'hourly' exports data every hour, 'daily' exports at midnight in the project's timezone. Only applies to indefinite export windows.",
  placeholder: "Select frequency",
  model: [
    {
      label: "daily",
      value: "daily",
    },
    {
      label: "hourly",
      value: "hourly",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  default: "daily",
});
const eventArray = input({
  label: "Events",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of event names to whitelist for export. Only these events will be exported from Mixpanel.",
  default: ["Page View"],
  clean: valueListInputClean,
  example: "Signed Up, Purchase, Page View",
});
const gcs_bucket = input({
  label: "GCS Bucket",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Google Cloud Storage bucket name where Mixpanel data will be exported.",
  placeholder: "Enter GCS bucket name",
  required: true,
  example: "my-mixpanel-exports",
});
const gcs_prefix = input({
  label: "GCS Prefix",
  type: "string",
  clean: toOptionalString,
  comments:
    "The path prefix within the GCS bucket for organizing exported files.",
  placeholder: "Enter GCS prefix path",
  required: false,
  example: "mixpanel/events",
});
const gcs_region = input({
  label: "GCS Region",
  placeholder: "Select GCS region",
  type: "string",
  required: true,
  comments: "The Google Cloud Storage region where the bucket is located.",
  example: "northamerica-northeast1",
  default: "northamerica-northeast1",
  model: gcsRegions.map((region) => {
    return {
      label: region,
      value: region,
    };
  }),
  clean: util.types.toString,
});
export const createGenericPipelineInputs = {
  connection: connectionInput,
  dataAndDomain,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    default: "/nessie/pipeline/create",
    comments:
      "The endpoint to send the request to. Defaults to /nessie/pipeline/create.",
  },
};
export const createGCSPipelineInputs = {
  connection: connectionInput,
  dataAndDomain,
  gcs_bucket,
  gcs_prefix,
  gcs_region,
  project_id: {
    ...project_id,
    comments:
      "The project ID (must be specified when using service account based authentication)",
  },
  from_date: {
    ...from_date,
    comments:
      "The starting date of the export window. It is formatted as YYYY-MM-DD and cannot be more than six months in the past. If trial is set to true this will default to the previous day; otherwise, it is a required parameter.",
  },
  to_date: {
    ...to_date,
    comments:
      "The ending date of the export window. It is formatted as YYYY-MM-DD. The export will continue indefinitely if to_date is empty.",
    required: false,
    clean: toOptionalString,
  },
  trial,
  frequency,
  events: eventArray,
  where: {
    ...where,
    comments:
      "A selector expression used to filter by events data, such as event properties. Learn more about how to construct event selector expressions here.",
  },
};
export const editGenericPipelineInputs = {
  connection: connectionInput,
  dataAndDomain,
  name,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    default: "/nessie/pipeline/edit",
    comments:
      "The endpoint to send the request to. Defaults to /nessie/pipeline/edit.",
  },
};
export const editGCSPipelineInputs = {
  connection: connectionInput,
  dataAndDomain,
  name,
  project_id: {
    ...project_id,
    comments:
      "The project ID (must be specified when using service account based authentication)",
  },
  events: eventArray,
  where: {
    ...where,
    comments:
      "A selector expression used to filter by events data, such as event properties. Please note that after this update, the sync of older dates to the data warehouse (if enabled) will only contain events matching the new where clause.",
  },
};
export const listPipelinesInputs = {
  connection: connectionInput,
  dataAndDomain,
  project_id: { ...project_id, required: true, clean: util.types.toString },
};
export const getPipelineInputs = {
  connection: connectionInput,
  dataAndDomain,
  project_id: { ...project_id, required: true, clean: util.types.toString },
  name,
  summary,
  status,
};
export const deletePipelineInputs = {
  connection: connectionInput,
  useProjectToken: { ...useProjectToken, default: "true" },
  dataAndDomain,
  name,
  project_id,
};
