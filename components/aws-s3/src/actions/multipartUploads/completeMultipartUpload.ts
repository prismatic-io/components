import { CompleteMultipartUploadCommand, type Part } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { completeMultipartUploadExamplePayload } from "../../examplePayloads";
import { completeMultipartUploadInputs } from "../../inputs";
import { completeMultipartUploadOutputSchema } from "../../outputSchemas";
export const completeMultipartUpload = action({
  display: {
    label: "Complete Multipart Upload",
    description: "Complete a multipart upload",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKey,
      uploadId,
      parts,
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
    const command = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: objectKey,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts as Part[] },
    });
    const result = await s3.send(command);
    return { data: result };
  },
  inputs: completeMultipartUploadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: completeMultipartUploadOutputSchema,
  }),
  examplePerform: async () => completeMultipartUploadExamplePayload,
  examplePayload: completeMultipartUploadExamplePayload,
});
