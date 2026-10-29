import { input, util } from "@prismatic-io/spectral";
import { toOptionalString, toStringRecord } from "../util";
import { awsRegion, connectionInput, marker, maxItems, name } from "./common";

const jobName = { ...name, dataSource: "selectJob" };

const args = input({
  label: "Arguments",
  placeholder: "Enter an argument name",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Optional key value parameters to pass into a job.",
  clean: toStringRecord,
});

const capacity = input({
  label: "Allocated Capacity",
  type: "string",
  example: "10",
  required: false,
  comments:
    "The number of AWS Glue data processing units (DPUs) that can be allocated when this job runs. If this is omitted, Glue will use the default number of DPUs configured for the job.",
  clean: util.types.toInt,
});

const security = input({
  label: "Security Configuration",
  type: "string",
  required: false,
  comments:
    "The name of the SecurityConfiguration structure to be used with this job. This can be left blank if there is no security configuration.",
  clean: toOptionalString,
});

const jobRunIds = input({
  label: "Job Run IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "The job run identifiers to stop for the specified job.",
});

const runId = input({
  label: "Run ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the job run.",
  clean: util.types.toString,
});

export const listJobsInputs = {
  awsRegion,
  marker,
  maxItems,
  awsConnection: connectionInput,
};

export const getJobRunInputs = {
  awsRegion,
  name: jobName,
  runId,
  awsConnection: connectionInput,
};

export const startJobRunInputs = {
  awsRegion,
  name: jobName,
  capacity,
  security,
  args,
  awsConnection: connectionInput,
};

export const stopJobRunInputs = {
  awsRegion,
  name: jobName,
  jobRunIds,
  awsConnection: connectionInput,
};
