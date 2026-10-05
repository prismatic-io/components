import type { ReadStream } from "node:fs";
import { PutObjectCommand, type PutObjectRequest } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { putObjectExamplePayload } from "../../examplePayloads";
import { putObjectInputs } from "../../inputs";
import { putObjectOutputSchema } from "../../outputSchemas";
import { encodeTags } from "../../utils";
export const putObject = action({
  display: {
    label: "Put Object",
    description: "Write an object to S3",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      acl,
      awsRegion,
      accessKey,
      bucket,
      fileContents,
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
    const { data, contentType } = fileContents;
    const putParameters: PutObjectRequest = {
      ACL: acl || null,
      Bucket: bucket,
      Key: objectKey,
      Body: data as unknown as ReadStream,
      ContentType: contentType,
      Tagging: encodeTags(tagging),
    };
    const command = new PutObjectCommand(putParameters);
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: putObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: putObjectOutputSchema,
  }),
  examplePerform: async () => putObjectExamplePayload,
  examplePayload: putObjectExamplePayload,
});
