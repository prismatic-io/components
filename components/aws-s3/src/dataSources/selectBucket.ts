import { dataSource } from "@prismatic-io/spectral";
import { createS3Client } from "../client";
import { selectBucketExamplePayload } from "../examplePayloads";
import { selectBucketInputs } from "../inputs";
import { listAllBuckets } from "../utils";
export const selectBucket = dataSource({
  display: {
    label: "Select Bucket",
    description: "A picklist of buckets in the AWS account.",
  },
  dataSourceType: "picklist",
  perform: async (_, params) => {
    const s3 = await createS3Client({
      awsConnection: params.accessKey,
      awsRegion: "",
      dynamicAccessKeyId: params.dynamicAccessKeyId,
      dynamicSecretAccessKey: params.dynamicSecretAccessKey,
      dynamicSessionToken: params.dynamicSessionToken,
    });
    const buckets = await listAllBuckets(s3);
    return {
      result: buckets.map((bucket) => ({
        label: bucket.Name,
        key: bucket.Name,
      })),
    };
  },
  inputs: selectBucketInputs,
  examplePayload: selectBucketExamplePayload,
});
