import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { headObjectExamplePayload } from "../../examplePayloads";
import { headObjectInputs } from "../../inputs";
import { headObjectOutputSchema } from "../../outputSchemas";
export const headObject = action({
  display: {
    label: "Head Object",
    description:
      "Retrieve metadata from an object without returning the object itself",
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
    const command = new HeadObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      VersionId: versionId,
    });
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: headObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: headObjectOutputSchema,
  }),
  examplePayload: headObjectExamplePayload,
});
