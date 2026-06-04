import { input } from "@prismatic-io/spectral";

export { awsRegion } from "aws-utils";

export const name = input({
  label: "Name",
  placeholder: "Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the name (NOT the ARN).",
});

export const args = input({
  label: "args",
  placeholder: "Name",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Optional key value parameters to pass into a job.",
});

export const jobRunIds = input({
  label: "Job Run Ids",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "Provide a list of job run Ids",
});

export const runId = input({
  label: "Run Id",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "Provide a string value for the run Id.",
});

export const capacity = input({
  label: "Allocated Capacity",
  type: "string",
  example: "10",
  required: false,
  comments:
    "The number of AWS Glue data processing units (DPUs) that can be allocated when this job runs. If this is omitted, Glue will use the default number of DPUs configured for your job.",
});

export const security = input({
  label: "Security Configuration",
  type: "string",
  required: false,
  comments:
    "The name of the SecurityConfiguration structure to be used with this job. This can be left blank if you do not have a security configuration.",
});

export const maxItems = input({
  label: "Max Items",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the maximum amount of items that will be returned. Provide a value from 1 to 50.",
  example: `20`,
});

export const marker = input({
  label: "Marker",
  type: "string",
  required: false,
  comments:
    "Specify the pagination token that's returned by a previous request to retrieve the next page of results",
  example: `lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E`,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
