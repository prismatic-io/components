import { input, util } from "@prismatic-io/spectral";
import {
  bucketIdInput,
  connectionInput,
  etagInput,
  groupIdInput,
  planIdInput,
} from "./common";
const bucketNameInput = input({
  label: "Name",
  type: "string",
  required: true,
  example: "In Review",
  placeholder: "Enter a bucket name",
  comments:
    "The name of the bucket, shown as a column heading on the plan's board.",
  clean: util.types.toString,
});
export const createBucketInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  name: bucketNameInput,
};
export const deleteBucketInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  bucketId: bucketIdInput,
  etag: etagInput,
};
export const getBucketInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  bucketId: bucketIdInput,
};
export const listBucketsInPlanInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
};
export const updateBucketInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  bucketId: bucketIdInput,
  name: bucketNameInput,
  etag: etagInput,
};
