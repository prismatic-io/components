import { PassThrough } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import { action, outputSchema } from "@prismatic-io/spectral";
import { v4 as uuidv4 } from "uuid";
import { createS3Client } from "../../client";
import { createUploadStreamExamplePayload } from "../../examplePayloads";
import { createUploadStreamInputs } from "../../inputs";
import { createUploadStreamOutputSchema } from "../../outputSchemas";
import { encodeTags } from "../../utils";
export const createUploadStream = action({
  display: {
    label: "Create Upload Stream",
    description: "Create an upload stream to S3",
  },
  inputs: createUploadStreamInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createUploadStreamOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async ({ executionState }, params) => {
    const s3 = await createS3Client({
      awsConnection: params.accessKey,
      awsRegion: params.awsRegion,
      dynamicAccessKeyId: params.dynamicAccessKeyId,
      dynamicSecretAccessKey: params.dynamicSecretAccessKey,
      dynamicSessionToken: params.dynamicSessionToken,
    });
    const uploadId = uuidv4();
    const fileStream = new PassThrough({ highWaterMark: 1024 * 1024 });
    const upload = new Upload({
      client: s3,
      params: {
        ACL: params.acl || null,
        Bucket: params.bucket,
        Key: params.objectKey,
        Body: fileStream,
        Tagging: encodeTags(params.tagging),
      },
    });
    executionState[uploadId] = {
      uploadFinisher: upload.done(),
      fileStream,
    };
    return { data: uploadId };
  },
  examplePerform: async () => createUploadStreamExamplePayload,
  examplePayload: createUploadStreamExamplePayload,
});
