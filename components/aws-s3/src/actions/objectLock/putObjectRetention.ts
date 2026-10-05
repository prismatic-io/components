import { PutObjectRetentionCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { putObjectRetentionExamplePayload } from "../../examplePayloads";
import { putObjectRetentionInputs } from "../../inputs";
import { putObjectRetentionOutputSchema } from "../../outputSchemas";
export const putObjectRetention = action({
  display: {
    label: "Put Object Retention",
    description: "Places an Object Retention configuration on an object",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKey,
      retentionMode,
      retainUntilDate,
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
    const retentionModePresent = retentionMode.length > 0;
    const retainUntilDatePresent = retainUntilDate.length > 0;
    if (
      (retentionModePresent && !retainUntilDatePresent) ||
      (!retentionModePresent && retainUntilDatePresent)
    ) {
      throw new Error(
        "Both Retention Mode and Retain Until Date must be set when either is set.",
      );
    }
    const command = new PutObjectRetentionCommand({
      Bucket: bucket,
      Key: objectKey,
      Retention: retentionModePresent
        ? {
            Mode: retentionMode,
            RetainUntilDate: new Date(retainUntilDate),
          }
        : {},
      VersionId: versionId,
    });
    const data = await s3.send(command);
    return {
      data,
    };
  },
  inputs: putObjectRetentionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: putObjectRetentionOutputSchema,
  }),
  examplePerform: async () => putObjectRetentionExamplePayload,
  examplePayload: putObjectRetentionExamplePayload,
});
