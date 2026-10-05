import {
  DeleteObjectsCommand,
  type ObjectIdentifier,
} from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { deleteObjectsExamplePayload } from "../../examplePayloads";
import { deleteObjectsInputs } from "../../inputs";
import { deleteObjectsOutputSchema } from "../../outputSchemas";
export const deleteObjects = action({
  display: {
    label: "Delete Objects",
    description: "Delete multiple objects from a bucket",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKeys,
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
    const objects: ObjectIdentifier[] = objectKeys;
    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: objects },
    });
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: deleteObjectsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteObjectsOutputSchema,
  }),
  examplePerform: async () => deleteObjectsExamplePayload,
  examplePayload: deleteObjectsExamplePayload,
});
