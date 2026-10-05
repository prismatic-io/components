import { DeleteBucketCommand } from "@aws-sdk/client-s3";
import { action } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { deleteBucketExamplePayload } from "../../examplePayloads";
import { deleteBucketInputs } from "../../inputs";
export const deleteBucket = action({
  display: {
    label: "Delete Bucket",
    description:
      "Deletes the S3 bucket. All objects in the bucket must be deleted before the bucket itself can be deleted",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const s3 = await createS3Client({
      awsConnection: accessKey,
      awsRegion,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
      logger: context.logger,
      debug: context.debug.enabled,
    });
    const command = new DeleteBucketCommand({
      Bucket: bucket,
    });
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: deleteBucketInputs,
  examplePerform: async () => deleteBucketExamplePayload,
  examplePayload: deleteBucketExamplePayload,
});
