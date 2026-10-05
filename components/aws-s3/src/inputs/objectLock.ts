import { input, util } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { toObjectLockRetentionMode } from "../utils";
import { accessKeyInput, bucket, objectKey, versionId } from "./common";
const defaultRetentionDays = input({
  label: "Default Retention Days",
  type: "string",
  required: false,
  placeholder: "Enter retention days",
  example: "90",
  comments:
    "Number of days for the default retention period. Mutually exclusive with Default Retention Years.",
  clean: util.types.toInt,
});
const defaultRetentionYears = input({
  label: "Default Retention Years",
  type: "string",
  required: false,
  placeholder: "Enter retention years",
  example: "7",
  comments:
    "Number of years for the default retention period. Mutually exclusive with Default Retention Days.",
  clean: util.types.toInt,
});
const defaultRetentionMode = input({
  label: "Default Retention Mode",
  type: "string",
  required: false,
  comments:
    "Object Lock retention mode for new objects. Must be used with either Default Retention Days or Years. For more information, see [S3 Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html).",
  placeholder: "Select retention mode",
  model: [
    { label: "Unset", value: "" },
    { label: "Governance", value: "GOVERNANCE" },
    { label: "Compliance", value: "COMPLIANCE" },
  ],
  clean: toObjectLockRetentionMode,
});
const retainUntilDate = input({
  label: "Retain Until Date",
  type: "string",
  placeholder: "Enter date (YYYY-MM-DDTHH:MM:SSZ)",
  example: "2025-12-31T23:59:59.000Z",
  required: false,
  comments:
    "The date and time when Object Retention expires. Required when using Retention Mode. Must be in ISO 8601 format.",
  clean: util.types.toString,
});
export const getObjectLockConfigurationInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  awsRegion,
};
export const getObjectRetentionInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  versionId: {
    ...versionId,
    comments:
      "The version ID for the object whose retention settings to retrieve.",
  },
  awsRegion,
};
export const putObjectLockConfigurationInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  defaultRetentionMode,
  defaultRetentionDays,
  defaultRetentionYears,
  awsRegion,
};
export const putObjectRetentionInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  retentionMode: {
    ...defaultRetentionMode,
    label: "Retention Mode",
    comments:
      "Retention mode for the specified object. Required when Retain Until Date is set.",
  },
  retainUntilDate,
  versionId,
  awsRegion,
};
