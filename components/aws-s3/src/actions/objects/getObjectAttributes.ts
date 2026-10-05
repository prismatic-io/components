import { GetObjectAttributesCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getObjectAttributesExamplePayload } from "../../examplePayloads";
import { getObjectAttributesInputs } from "../../inputs";
import { getObjectAttributesOutputSchema } from "../../outputSchemas";
export const getObjectAttributes = action({
  display: {
    label: "Get Object Attributes",
    description:
      "Retrieves all the metadata from an object without returning the object itself",
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
      objectAttributes,
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
    const command = new GetObjectAttributesCommand({
      Bucket: bucket,
      Key: objectKey,
      ObjectAttributes: objectAttributes,
      VersionId: versionId,
    });
    const data = await s3.send(command);
    return {
      data,
    };
  },
  inputs: getObjectAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getObjectAttributesOutputSchema,
  }),
  examplePayload: getObjectAttributesExamplePayload,
});
