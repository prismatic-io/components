import { HeadBucketCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { headBucketExamplePayload } from "../../examplePayloads";
import { headBucketInputs } from "../../inputs";
import { headBucketOutputSchema } from "../../outputSchemas";
export const headBucket = action({
  display: {
    label: "Head Bucket",
    description:
      "Determine if a bucket exists and whether the connection has permission to access it.",
  },
  performSafety: "safe",
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
    const command = new HeadBucketCommand({ Bucket: bucket });
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: headBucketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: headBucketOutputSchema,
  }),
  examplePayload: headBucketExamplePayload,
});
