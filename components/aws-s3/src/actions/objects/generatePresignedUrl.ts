import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { generatePresignedUrlExamplePayload } from "../../examplePayloads";
import { generatePresignedUrlInputs } from "../../inputs";
import { generatePresignedUrlOutputSchema } from "../../outputSchemas";
export const generatePresignedUrl = action({
  display: {
    label: "Generate Presigned URL",
    description:
      "Generate a presigned URL that can be used to upload or download an object in S3",
  },
  inputs: generatePresignedUrlInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: generatePresignedUrlOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const s3 = await createS3Client({
      awsConnection: params.accessKey,
      awsRegion: params.awsRegion,
      dynamicAccessKeyId: params.dynamicAccessKeyId,
      dynamicSecretAccessKey: params.dynamicSecretAccessKey,
      dynamicSessionToken: params.dynamicSessionToken,
      logger: context.logger,
      debug: context.debug.enabled,
    });
    const command =
      params.actionType === "download"
        ? new GetObjectCommand({
            Bucket: params.bucket,
            Key: params.objectKey,
          })
        : new PutObjectCommand({
            Bucket: params.bucket,
            Key: params.objectKey,
          });
    return {
      data: await getSignedUrl(s3, command, {
        expiresIn: params.expirationSeconds,
      }),
    };
  },
  examplePerform: async () => generatePresignedUrlExamplePayload,
  examplePayload: generatePresignedUrlExamplePayload,
});
