import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { accessKeyInput, bucket } from "./common";
export const deleteBucketInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  awsRegion,
};
export const getBucketLocationInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
};
export const headBucketInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  awsRegion,
};
export const listBucketsInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  awsRegion,
};
