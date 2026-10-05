import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getBucketNotificationConfigurationExamplePayload } from "../../examplePayloads";
import { getBucketNotificationConfigurationInputs } from "../../inputs";
import { getBucketNotificationConfigurationOutputSchema } from "../../outputSchemas";
import { getBucketNotificationConfiguration as getBucketNotificationConfigurationFn } from "../../utils";
export const getBucketNotificationConfiguration = action({
  display: {
    label: "Get Bucket Notification Configuration",
    description: "Returns the notification configuration of a bucket",
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
    const data = await getBucketNotificationConfigurationFn(
      s3,
      bucket,
      undefined,
      false,
    );
    return {
      data,
    };
  },
  inputs: getBucketNotificationConfigurationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBucketNotificationConfigurationOutputSchema,
  }),
  examplePayload: getBucketNotificationConfigurationExamplePayload,
});
