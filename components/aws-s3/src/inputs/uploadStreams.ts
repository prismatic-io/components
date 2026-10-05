import { input, util } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import {
  accessKeyInput,
  acl,
  bucket,
  fileContents,
  objectKey,
  tagging,
} from "./common";
const uploadIdInput = input({
  label: "Upload Stream ID",
  type: "string",
  required: true,
  placeholder: "Enter upload stream ID",
  comments:
    "The ID of the upload stream to write to. Generate this with the 'Create Stream' action.",
  clean: util.types.toString,
});
export const closeUploadStreamInputs = {
  uploadId: uploadIdInput,
};
export const createUploadStreamInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  objectKey,
  bucket,
  tagging,
  acl,
  awsRegion,
};
export const writeUploadStreamInputs = {
  uploadId: uploadIdInput,
  fileContents,
};
