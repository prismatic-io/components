import type { NotificationConfiguration } from "@aws-sdk/client-s3";
import { action } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { putBucketNotificationConfigurationExamplePayload } from "../../examplePayloads";
import { putBucketNotificationConfigurationInputs } from "../../inputs";
import { putBucketNotificationConfiguration as putBucketNotificationConfigurationFn } from "../../utils";
export const putBucketNotificationConfiguration = action({
  display: {
    label: "Put Bucket Notification Configuration",
    description:
      "Replace an existing bucket notification configuration with a new one",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      awsRegion,
      accessKey,
      bucket,
      topicConfigurations,
      queueConfigurations,
      lambdaFunctionConfigurations,
      eventBridgeConfiguration,
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
    const notificationConfiguration: NotificationConfiguration = {
      TopicConfigurations: topicConfigurations,
      QueueConfigurations: queueConfigurations,
      LambdaFunctionConfigurations: lambdaFunctionConfigurations,
      EventBridgeConfiguration: eventBridgeConfiguration,
    };
    const data = await putBucketNotificationConfigurationFn(
      s3,
      bucket,
      notificationConfiguration,
    );
    return {
      data,
    };
  },
  inputs: putBucketNotificationConfigurationInputs,
  examplePerform: async () => putBucketNotificationConfigurationExamplePayload,
  examplePayload: putBucketNotificationConfigurationExamplePayload,
});
