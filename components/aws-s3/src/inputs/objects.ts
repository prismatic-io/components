import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { OBJECT_ATTRIBUTES } from "../constants";
import {
  cleanString,
  getObjectAttributes,
  getObjectIdentifiers,
  toOptionalInt,
} from "../utils";
import {
  accessKeyInput,
  acl,
  bucket,
  expirationSeconds,
  fileContents,
  objectKey,
  tagging,
  versionId,
} from "./common";
const objectKeys = input({
  label: "Object Keys",
  placeholder: "Enter object keys",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "A list of object keys to delete. These are the file paths of the objects to delete. Do not include a leading /.",
  example: "path/to/file1.txt",
  clean: getObjectIdentifiers,
});
const sourceKey = input({
  label: "Source Key",
  placeholder: "Enter source object key",
  type: "string",
  required: true,
  comments:
    "The source object's key (file path) to copy from. Do not include a leading /.",
  example: "backups/2024/database-backup.sql",
  clean: util.types.toString,
});
const destinationKey = input({
  label: "Destination Key",
  placeholder: "Enter destination object key",
  type: "string",
  required: true,
  comments:
    "The destination object's key (file path) to copy to. Do not include a leading /.",
  example: "archive/2024/database-backup.sql",
  clean: util.types.toString,
});
const sourceBucket = input({
  label: "Source Bucket Name",
  placeholder: "Enter source bucket name",
  type: "string",
  required: true,
  comments:
    "The source bucket containing the object to copy. For same-bucket copies, use the same name for both source and destination buckets.",
  example: "my-company-data-prod",
  clean: util.types.toString,
});
const destinationBucket = input({
  label: "Destination Bucket Name",
  placeholder: "Enter destination bucket name",
  type: "string",
  required: true,
  comments:
    "The destination bucket where the object will be copied. For same-bucket copies, use the same name for both source and destination buckets.",
  example: "my-company-archive",
  clean: util.types.toString,
});
const prefix = input({
  label: "Prefix",
  placeholder: "Enter prefix",
  type: "string",
  required: false,
  default: "",
  comments:
    "List only objects prefixed with this string. For example, to list only files in a directory called 'unprocessed', enter 'unprocessed/'. If this is left blank, all files in the selected bucket will be listed.",
  example: "path/to/files/",
  clean: util.types.toString,
});
const maxKeys = input({
  label: "Max Keys",
  type: "string",
  required: false,
  comments:
    "Maximum number of objects to return (1-1000). Defaults to 1000 if not specified.",
  example: "1000",
  placeholder: "Enter max keys (1-1000)",
  clean: toOptionalInt,
});
const continuationToken = input({
  label: "Continuation Token",
  type: "string",
  required: false,
  comments:
    "Pagination token returned by a previous request to retrieve the next page of results.",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  placeholder: "Enter continuation token",
  clean: cleanString,
});
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { maxKeys, continuationToken },
});
const actionType = input({
  label: "Action Type",
  type: "string",
  comments:
    "Specifies whether the presigned URL will allow download or upload operations.",
  clean: util.types.toString,
  required: true,
  default: "download",
  placeholder: "Select action type",
  model: [
    { label: "Download", value: "download" },
    { label: "Upload", value: "upload" },
  ],
});
const objectAttributes = input({
  label: "Object Attributes",
  type: "string",
  collection: "valuelist",
  required: true,
  model: OBJECT_ATTRIBUTES.map((attribute) => ({
    label: attribute,
    value: attribute,
  })),
  comments:
    "The object attributes to return in the response. Unspecified attributes are not returned.",
  placeholder: "Select object attributes",
  clean: getObjectAttributes,
});
const includeMetadata = input({
  label: "Include Metadata",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, returns full object metadata and pagination information instead of just object keys.",
  clean: util.types.toBool,
});
export const copyObjectInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  sourceBucket,
  destinationBucket,
  sourceKey,
  destinationKey,
  acl,
  awsRegion,
};
export const deleteObjectInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  awsRegion,
};
export const deleteObjectsInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKeys,
  awsRegion,
};
export const generatePresignedUrlInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  actionType,
  expirationSeconds,
  awsRegion,
};
export const getObjectInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  versionId: {
    ...versionId,
    comments:
      "The version ID of the object to retrieve. When omitted, the current version is returned.",
  },
  awsRegion,
};
export const getObjectAttributesInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  objectAttributes,
  versionId: {
    ...versionId,
    comments: "The version ID for the object whose metadata to retrieve.",
  },
  awsRegion,
};
export const headObjectInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  versionId: {
    ...versionId,
    comments: "The version ID of the object whose metadata to retrieve.",
  },
  awsRegion,
};
export const listObjectsInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  includeMetadata,
  pagination,
  prefix,
  awsRegion,
};
export const putObjectInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  fileContents,
  objectKey,
  tagging,
  acl,
  awsRegion,
};
