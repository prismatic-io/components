import { GetObjectRetentionCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getObjectRetentionExamplePayload } from "../../examplePayloads";
import { getObjectRetentionInputs } from "../../inputs";
import { getObjectRetentionOutputSchema } from "../../outputSchemas";
export const getObjectRetention = action({
  display: {
    label: "Get Object Retention",
    description: "Retrieves an object's retention settings",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKey,
      versionId,
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
    const command = new GetObjectRetentionCommand({
      Bucket: bucket,
      Key: objectKey,
      VersionId: versionId,
    });
    const data = await s3.send(command);
    return {
      data,
    };
  },
  inputs: getObjectRetentionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getObjectRetentionOutputSchema,
  }),
  examplePayload: getObjectRetentionExamplePayload,
});
