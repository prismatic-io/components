import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { deleteObjectExamplePayload } from "../../examplePayloads";
import { deleteObjectInputs } from "../../inputs";
import { deleteObjectOutputSchema } from "../../outputSchemas";
export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Delete an Object within an S3 Bucket",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKey,
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
    const deleteParameters = {
      Bucket: bucket,
      Key: objectKey,
    };
    const command = new DeleteObjectCommand(deleteParameters);
    const response = await s3.send(command);
    return { data: response };
  },
  inputs: deleteObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteObjectOutputSchema,
  }),
  examplePerform: async () => deleteObjectExamplePayload,
  examplePayload: deleteObjectExamplePayload,
});
