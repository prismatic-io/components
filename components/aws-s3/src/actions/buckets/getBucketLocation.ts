import { GetBucketLocationCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getBucketLocationExamplePayload } from "../../examplePayloads";
import { getBucketLocationInputs } from "../../inputs";
import { getBucketLocationOutputSchema } from "../../outputSchemas";
export const getBucketLocation = action({
  display: {
    label: "Get Bucket Location",
    description: "Get the location (AWS region) of a bucket by name",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      accessKey,
      bucket,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const s3 = await createS3Client({
      awsConnection: accessKey,
      awsRegion: "",
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
      logger: context.logger,
      debug: context.debug.enabled,
    });
    const command = new GetBucketLocationCommand({ Bucket: bucket });
    const response = await s3.send(command);
    return { data: response.LocationConstraint || "us-east-1" };
  },
  inputs: getBucketLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBucketLocationOutputSchema,
  }),
  examplePayload: getBucketLocationExamplePayload,
});
