import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { listBucketsExamplePayload } from "../../examplePayloads";
import { listBucketsInputs } from "../../inputs";
import { listBucketsOutputSchema } from "../../outputSchemas";
import { listAllBuckets } from "../../utils";
export const listBuckets = action({
  display: {
    label: "List Buckets",
    description: "List all buckets in an AWS account",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
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
    return {
      data: await listAllBuckets(s3),
    };
  },
  inputs: listBucketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBucketsOutputSchema,
  }),
  examplePayload: listBucketsExamplePayload,
});
