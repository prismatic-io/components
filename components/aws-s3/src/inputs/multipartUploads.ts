import { input, util } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { toBufferFromData, toPartList, toPositiveInt } from "../utils";
import {
  accessKeyInput,
  acl,
  bucket,
  expirationSeconds,
  objectKey,
  tagging,
} from "./common";
const urlsToGenerate = input({
  label: "URLs to Generate",
  type: "string",
  required: true,
  default: "5",
  placeholder: "Enter number of URLs",
  example: "10",
  comments: "The number of presigned URLs to generate for multipart uploads.",
  clean: (value: unknown) => toPositiveInt(value, 5),
});
const uploadId = input({
  label: "Upload ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the multipart upload, returned by 'Create Multipart Upload' action.",
  clean: util.types.toString,
  example:
    "xadcOB_7YPBOJuoFiQ9cz4P3Pe6FIZwO4f7wN93uHsNBEw97pl5eNwzExg0LAT2dUN91cOmrEQHDsP3WA60CEg",
  placeholder: "Enter multipart upload ID",
});
const fileChunk = input({
  label: "File Chunk",
  type: "data",
  required: true,
  comments:
    "The binary data chunk to upload as part of a multipart upload. Reference output from a previous step.",
  placeholder: "Select file chunk data",
  clean: toBufferFromData,
});
const partNumber = input({
  label: "Part Number",
  type: "string",
  required: true,
  comments:
    "The part number for this chunk in the multipart upload sequence (1-10,000).",
  placeholder: "Enter part number (1-10,000)",
  example: "1",
  clean: util.types.toInt,
});
const parts = input({
  label: "Parts",
  type: "data",
  comments:
    "The list of uploaded parts to complete the multipart upload. Reference the 'Parts' field from the 'List Parts' action output.",
  placeholder: "Select parts data from List Parts action",
  required: true,
  clean: toPartList,
});
export const abortMultipartUploadInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  uploadId,
  awsRegion,
};
export const completeMultipartUploadInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  uploadId,
  parts,
  awsRegion,
};
export const createMultipartUploadInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  tagging,
  acl,
  awsRegion,
};
export const generatePresignedForMultiparUploadsInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  urlsToGenerate,
  uploadId,
  expirationSeconds,
  awsRegion,
};
export const listMultipartUploadsInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  awsRegion,
};
export const listPartsInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  uploadId,
  awsRegion,
};
export const uploadPartInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  objectKey,
  uploadId,
  partNumber,
  fileChunk,
  awsRegion,
};
