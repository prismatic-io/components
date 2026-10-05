import { input } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import {
  EVENT_BRIDGE_CONFIGURATION_EXAMPLE,
  LAMBDA_FUNCTION_CONFIGURATIONS_EXAMPLE,
  QUEUE_CONFIGURATIONS_EXAMPLE,
  TOPIC_CONFIGURATIONS_EXAMPLE,
} from "../constants";
import {
  getEventBridgeConfiguration,
  getLambdaFunctionConfigurations,
  getQueueConfigurations,
  getTopicConfigurations,
} from "../utils";
import { accessKeyInput, bucket } from "./common";
const topicConfigurations = input({
  label: "Topic Configurations",
  type: "code",
  language: "json",
  placeholder: "Enter topic configurations JSON",
  required: false,
  default: JSON.stringify(TOPIC_CONFIGURATIONS_EXAMPLE, null, 2),
  example: JSON.stringify(TOPIC_CONFIGURATIONS_EXAMPLE, null, 2),
  comments:
    "List of SNS topic configurations for bucket event notifications. For more information, see [S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html).",
  clean: getTopicConfigurations,
});
const queueConfigurations = input({
  label: "Queue Configurations",
  type: "code",
  language: "json",
  placeholder: "Enter queue configurations JSON",
  required: false,
  default: JSON.stringify(QUEUE_CONFIGURATIONS_EXAMPLE, null, 2),
  example: JSON.stringify(QUEUE_CONFIGURATIONS_EXAMPLE, null, 2),
  comments:
    "List of SQS queue configurations for bucket event notifications. For more information, see [S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html).",
  clean: getQueueConfigurations,
});
const lambdaFunctionConfigurations = input({
  label: "Lambda Function Configurations",
  type: "code",
  language: "json",
  placeholder: "Enter Lambda function configurations JSON",
  required: false,
  default: JSON.stringify(LAMBDA_FUNCTION_CONFIGURATIONS_EXAMPLE, null, 2),
  example: JSON.stringify(LAMBDA_FUNCTION_CONFIGURATIONS_EXAMPLE, null, 2),
  comments:
    "List of Lambda function configurations for bucket event notifications. For more information, see [S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html).",
  clean: getLambdaFunctionConfigurations,
});
const eventBridgeConfiguration = input({
  label: "EventBridge Configuration",
  type: "code",
  language: "json",
  placeholder: "Enter EventBridge configuration JSON",
  required: false,
  default: JSON.stringify(EVENT_BRIDGE_CONFIGURATION_EXAMPLE, null, 2),
  example: JSON.stringify(EVENT_BRIDGE_CONFIGURATION_EXAMPLE, null, 2),
  comments:
    "EventBridge configuration for bucket event notifications. For more information, see [Using EventBridge with S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html).",
  clean: getEventBridgeConfiguration,
});
export const getBucketNotificationConfigurationInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  awsRegion,
};
export const putBucketNotificationConfigurationInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  topicConfigurations,
  queueConfigurations,
  lambdaFunctionConfigurations,
  eventBridgeConfiguration,
  awsRegion,
};
