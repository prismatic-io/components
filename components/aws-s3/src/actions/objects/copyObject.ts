import {
  CopyObjectCommand,
  type CopyObjectCommandInput,
} from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { copyObjectExamplePayload } from "../../examplePayloads";
import { copyObjectInputs } from "../../inputs";
import { copyObjectOutputSchema } from "../../outputSchemas";
export const copyObject = action({
  display: {
    label: "Copy Object",
    description: "Copy an object in S3 from one location to another",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      acl,
      awsRegion,
      accessKey,
      sourceBucket,
      destinationBucket,
      sourceKey,
      destinationKey,
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
    const copyParameters: CopyObjectCommandInput = {
      ACL: acl || null,
      Bucket: destinationBucket,
      CopySource: `${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    const command = new CopyObjectCommand(copyParameters);
    const response = await s3.send(command);
    return {
      data: response,
    };
  },
  inputs: copyObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: copyObjectOutputSchema,
  }),
  examplePerform: async () => copyObjectExamplePayload,
  examplePayload: copyObjectExamplePayload,
});
