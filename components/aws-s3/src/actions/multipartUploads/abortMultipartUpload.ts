import { AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { abortMultipartUploadExamplePayload } from "../../examplePayloads";
import { abortMultipartUploadInputs } from "../../inputs";
import { abortMultipartUploadOutputSchema } from "../../outputSchemas";
export const abortMultipartUpload = action({
  display: {
    label: "Abort Multipart Upload",
    description: "Abort a multipart upload",
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
    const command = new AbortMultipartUploadCommand({
      Bucket: bucket,
      Key: objectKey,
      UploadId: uploadId,
    });
    const result = await s3.send(command);
    return { data: result };
  },
  inputs: abortMultipartUploadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: abortMultipartUploadOutputSchema,
  }),
  examplePerform: async () => abortMultipartUploadExamplePayload,
  examplePayload: abortMultipartUploadExamplePayload,
});
