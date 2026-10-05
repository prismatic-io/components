import { ListPartsCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { listPartsExamplePayload } from "../../examplePayloads";
import { listPartsInputs } from "../../inputs";
import { listPartsOutputSchema } from "../../outputSchemas";
export const listParts = action({
  display: {
    label: "List Parts",
    description: "List parts of a multipart upload",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKey,
      uploadId,
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
    const command = new ListPartsCommand({
      Bucket: bucket,
      Key: objectKey,
      UploadId: uploadId,
    });
    const result = await s3.send(command);
    return { data: result };
  },
  inputs: listPartsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPartsOutputSchema,
  }),
  examplePayload: listPartsExamplePayload,
});
