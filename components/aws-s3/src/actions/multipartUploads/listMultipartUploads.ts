import { ListMultipartUploadsCommand } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { listMultipartUploadsExamplePayload } from "../../examplePayloads";
import { listMultipartUploadsInputs } from "../../inputs";
import { listMultipartUploadsOutputSchema } from "../../outputSchemas";
export const listMultipartUploads = action({
  display: {
    label: "List Multipart Uploads",
    description: "Lists in-progress multipart uploads in a bucket",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
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
    const command = new ListMultipartUploadsCommand({ Bucket: bucket });
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: listMultipartUploadsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMultipartUploadsOutputSchema,
  }),
  examplePayload: listMultipartUploadsExamplePayload,
});
