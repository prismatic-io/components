import { GetObjectCommand } from "@aws-sdk/client-s3";
import { action } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getObjectExamplePayload } from "../../examplePayloads";
import { getObjectInputs } from "../../inputs";
export const getObject = action({
  display: {
    label: "Get Object",
    description: "Get the contents of an object",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      objectKey,
      versionId,
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
    const getObjectParameters = {
      Bucket: bucket,
      Key: objectKey,
      VersionId: versionId,
    };
    const command = new GetObjectCommand(getObjectParameters);
    const response = await s3.send(command);
    const objectBodyAsArray = await response.Body.transformToByteArray();
    const objectAsABuffer = Buffer.from(objectBodyAsArray);
    return {
      data: objectAsABuffer,
      contentType: response.ContentType,
    };
  },
  inputs: getObjectInputs,
  examplePerform: async () => getObjectExamplePayload,
  examplePayload: getObjectExamplePayload,
});
