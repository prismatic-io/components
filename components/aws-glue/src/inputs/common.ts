import { input, util } from "@prismatic-io/spectral";
import { toOptionalInt, toOptionalString } from "../util";

export { awsRegion } from "aws-utils";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The AWS Glue connection to use.",
});

export const name = input({
  label: "Name",
  placeholder: "Enter the job, crawler, or trigger name",
  type: "string",
  required: true,
  comments:
    "The name of the resource (job, crawler, or trigger) to act on. Provide the name, not the ARN.",
  clean: util.types.toString,
});

export const maxItems = input({
  label: "Max Items",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return. Provide a value from 1 to 50.",
  example: `20`,
  clean: toOptionalInt,
});

export const marker = input({
  label: "Marker",
  type: "string",
  required: false,
  comments:
    "The pagination token returned by a previous request, used to retrieve the next page of results.",
  example: `lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E`,
  clean: toOptionalString,
});
