import {
  type EventBridgeConfiguration,
  GetBucketNotificationConfigurationCommand,
  type GetBucketNotificationConfigurationCommandInput,
  type LambdaFunctionConfiguration,
  type NotificationConfiguration,
  PutBucketNotificationConfigurationCommand,
  type PutBucketNotificationConfigurationCommandInput,
  type PutBucketNotificationConfigurationCommandOutput,
  type QueueConfiguration,
  type S3Client,
  type TopicConfiguration,
} from "@aws-sdk/client-s3";
import {
  LAMBDA_FUNCTION_CONFIGURATIONS_EXAMPLE,
  QUEUE_CONFIGURATIONS_EXAMPLE,
  TOPIC_CONFIGURATIONS_EXAMPLE,
} from "../constants";
const parseConfigurationValue = (value: unknown): unknown => {
  if (value === undefined || value === null || value === "") return undefined;
  return typeof value === "string" ? JSON.parse(value) : value;
};
const parseConfigurationArray = <T>(
  value: unknown,
  label: string,
  example: unknown,
): T[] => {
  const parsed = parseConfigurationValue(value);
  if (parsed === undefined) return undefined;
  if (!Array.isArray(parsed))
    throw new Error(
      `${label} must be an array with the following structure: ${JSON.stringify(example)}`,
    );
  return parsed;
};
export const getTopicConfigurations = (
  topicConfigurations: unknown,
): TopicConfiguration[] =>
  parseConfigurationArray(
    topicConfigurations,
    "Topic configurations",
    TOPIC_CONFIGURATIONS_EXAMPLE,
  );
export const getQueueConfigurations = (
  queueConfigurations: unknown,
): QueueConfiguration[] =>
  parseConfigurationArray(
    queueConfigurations,
    "Queue configurations",
    QUEUE_CONFIGURATIONS_EXAMPLE,
  );
export const getLambdaFunctionConfigurations = (
  lambdaFunctionConfigurations: unknown,
): LambdaFunctionConfiguration[] =>
  parseConfigurationArray(
    lambdaFunctionConfigurations,
    "Lambda function configurations",
    LAMBDA_FUNCTION_CONFIGURATIONS_EXAMPLE,
  );
export const getEventBridgeConfiguration = (
  eventBridgeConfiguration: unknown,
): EventBridgeConfiguration =>
  parseConfigurationValue(eventBridgeConfiguration) as EventBridgeConfiguration;
export const getBucketNotificationConfiguration = async (
  s3Client: S3Client,
  bucket: string,
  bucketOwnerAccountid?: string,
  removeMetadata = true,
): Promise<NotificationConfiguration> => {
  const getBucketNotificationConfigurationCommandInput: GetBucketNotificationConfigurationCommandInput =
    {
      Bucket: bucket,
      ExpectedBucketOwner: bucketOwnerAccountid,
    };
  const getBucketNotificationConfigurationCommand =
    new GetBucketNotificationConfigurationCommand(
      getBucketNotificationConfigurationCommandInput,
    );
  const getBucketNotificationConfigurationCommandOutput = await s3Client.send(
    getBucketNotificationConfigurationCommand,
  );
  if (removeMetadata)
    getBucketNotificationConfigurationCommandOutput.$metadata = undefined;
  return getBucketNotificationConfigurationCommandOutput;
};
export const putBucketNotificationConfiguration = async (
  s3Client: S3Client,
  bucket: string,
  notificationConfiguration: NotificationConfiguration,
): Promise<PutBucketNotificationConfigurationCommandOutput> => {
  const putBucketNotificationConfigurationCommandInput: PutBucketNotificationConfigurationCommandInput =
    {
      Bucket: bucket,
      NotificationConfiguration: notificationConfiguration,
      SkipDestinationValidation: true,
    };
  const putBucketNotificationConfigurationCommand =
    new PutBucketNotificationConfigurationCommand(
      putBucketNotificationConfigurationCommandInput,
    );
  const putBucketNotificationConfigurationCommandOutput = await s3Client.send(
    putBucketNotificationConfigurationCommand,
  );
  return putBucketNotificationConfigurationCommandOutput;
};
export const processTopicConfiguration = async (
  s3Client: S3Client,
  bucket: string,
  bucketOwnerAccountid: string,
  eventNotificationName: string,
  topicConfiguration: TopicConfiguration,
): Promise<PutBucketNotificationConfigurationCommandOutput> => {
  const notificationConfiguration = await getBucketNotificationConfiguration(
    s3Client,
    bucket,
    bucketOwnerAccountid,
  );
  if (!("TopicConfigurations" in notificationConfiguration))
    notificationConfiguration.TopicConfigurations = [];
  let existingTopicConfigurationIndex = -1;
  notificationConfiguration.TopicConfigurations.find(
    (topicConfiguration, index) => {
      const topicConfigurationIdEqualsEventNotificationName =
        topicConfiguration.Id === eventNotificationName;
      if (topicConfigurationIdEqualsEventNotificationName)
        existingTopicConfigurationIndex = index;
      return topicConfigurationIdEqualsEventNotificationName;
    },
  );
  if (existingTopicConfigurationIndex === -1) {
    notificationConfiguration.TopicConfigurations.push(topicConfiguration);
  } else {
    notificationConfiguration.TopicConfigurations[
      existingTopicConfigurationIndex
    ] = topicConfiguration;
  }
  return await putBucketNotificationConfiguration(
    s3Client,
    bucket,
    notificationConfiguration,
  );
};
