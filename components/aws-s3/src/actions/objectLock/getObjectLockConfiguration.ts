import { GetObjectLockConfigurationCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getObjectLockConfigurationExamplePayload } from "../../examplePayloads";
import { getObjectLockConfigurationInputs } from "../../inputs";
import { getObjectLockConfigurationOutputSchema } from "../../outputSchemas";
export const getObjectLockConfiguration = action({
  display: {
    label: "Get Object Lock Configuration",
    description: "Gets the Object Lock configuration for a bucket",
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
    const command = new GetObjectLockConfigurationCommand({
      Bucket: bucket,
    });
    const data = await s3.send(command);
    return {
      data,
    };
  },
  inputs: getObjectLockConfigurationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getObjectLockConfigurationOutputSchema,
  }),
  examplePayload: getObjectLockConfigurationExamplePayload,
});
