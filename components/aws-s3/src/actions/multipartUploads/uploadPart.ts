import { UploadPartCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { uploadPartExamplePayload } from "../../examplePayloads";
import { uploadPartInputs } from "../../inputs";
import { uploadPartOutputSchema } from "../../outputSchemas";
export const uploadPart = action({
  display: {
    label: "Upload Part",
    description: "Upload a chunk of a multipart file upload",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      fileChunk,
      objectKey,
      uploadId,
      partNumber,
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
    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: objectKey,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: fileChunk,
    });
    const result = await s3.send(command);
    return {
      data: {
        ...result,
        part: { ETag: result.ETag, PartNumber: partNumber },
      },
    };
  },
  inputs: uploadPartInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadPartOutputSchema,
  }),
  examplePerform: async () => uploadPartExamplePayload,
  examplePayload: uploadPartExamplePayload,
});
