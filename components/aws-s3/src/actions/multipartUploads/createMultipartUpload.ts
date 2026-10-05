import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { createMultipartUploadExamplePayload } from "../../examplePayloads";
import { createMultipartUploadInputs } from "../../inputs";
import { createMultipartUploadOutputSchema } from "../../outputSchemas";
import { encodeTags } from "../../utils";
export const createMultipartUpload = action({
  display: {
    label: "Create Multipart Upload",
    description: "Create a multipart upload",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      acl,
      awsRegion,
      accessKey,
      bucket,
      objectKey,
      tagging,
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
    const command = new CreateMultipartUploadCommand({
      ACL: acl || null,
      Bucket: bucket,
      Key: objectKey,
      Tagging: encodeTags(tagging),
    });
    const result = await s3.send(command);
    return { data: result };
  },
  inputs: createMultipartUploadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createMultipartUploadOutputSchema,
  }),
  examplePerform: async () => createMultipartUploadExamplePayload,
  examplePayload: createMultipartUploadExamplePayload,
});
