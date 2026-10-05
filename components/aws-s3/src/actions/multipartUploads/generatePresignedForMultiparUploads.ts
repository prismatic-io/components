import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { generatePresignedForMultiparUploadsExamplePayload } from "../../examplePayloads";
import { generatePresignedForMultiparUploadsInputs } from "../../inputs";
import { generatePresignedForMultiparUploadsOutputSchema } from "../../outputSchemas";
export const generatePresignedForMultiparUploads = action({
  display: {
    label: "Generate Presigned URL for Multipart Uploads",
    description:
      "Generate presigned URLs for uploading the parts of a multipart upload to S3.",
  },
  inputs: generatePresignedForMultiparUploadsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: generatePresignedForMultiparUploadsOutputSchema,
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
    const urlArray = [];
    for (let i = 1; i <= params.urlsToGenerate; i++) {
      const command = new UploadPartCommand({
        Bucket: params.bucket,
        Key: params.objectKey,
        PartNumber: i,
        UploadId: params.uploadId,
      });
      urlArray.push(
        getSignedUrl(s3, command, {
          expiresIn: params.expirationSeconds,
        }),
      );
    }
    const urls = await Promise.all(urlArray);
    return {
      data: urls.map((value, index) => ({
        url: value,
        partNumber: index + 1,
      })),
    };
  },
  examplePerform: async () => generatePresignedForMultiparUploadsExamplePayload,
  examplePayload: generatePresignedForMultiparUploadsExamplePayload,
});
