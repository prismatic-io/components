import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { listObjectsExamplePayload } from "../../examplePayloads";
import { listObjectsInputs } from "../../inputs";
import { listObjectsOutputSchema } from "../../outputSchemas";
export const listObjects = action({
  display: {
    label: "List Objects",
    description: "List Objects in a Bucket",
  },
  performSafety: "safe",
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
    const listObjectsV2Params = {
      Bucket: params.bucket,
      Prefix: params.prefix,
      MaxKeys: params.pagination.maxKeys,
      ContinuationToken: params.pagination.continuationToken,
    };
    const command = new ListObjectsV2Command(listObjectsV2Params);
    const response = await s3.send(command);
    return {
      data: params.includeMetadata
        ? response
        : (response.Contents || []).map(({ Key }) => Key),
    };
  },
  inputs: listObjectsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listObjectsOutputSchema,
  }),
  examplePayload: listObjectsExamplePayload,
});
