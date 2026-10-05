import { input, util } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { INPUT_EVENT_TYPES_MODEL } from "../constants";
import { toTrimmedStringArray } from "../utils";
import { accessKeyInput, bucket } from "./common";
const name = input({
  label: "Name",
  type: "string",
  required: true,
  example: "ProductionNotifications",
  placeholder: "Enter topic name",
  comments: "The name of the SNS topic to create.",
  clean: util.types.toString,
});
const snsTopicArn = input({
  label: "SNS Topic ARN",
  type: "string",
  required: true,
  example: "arn:aws:sns:us-east-1:123456789012:S3EventNotifications",
  placeholder: "Enter SNS topic ARN",
  comments:
    "The Amazon Resource Name (ARN) of the SNS topic. For more information, see [Getting started with Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-getting-started.html).",
  clean: util.types.toString,
});
const bucketOwnerAccountid = input({
  label: "Bucket Owner Account ID",
  type: "string",
  required: true,
  example: "123456789012",
  placeholder: "Enter 12-digit AWS account ID",
  comments:
    "The 12-digit AWS Account ID of the bucket owner. Find this in the AWS Console account settings or use the 'Get Current Account' action.",
  clean: util.types.toString,
});
const endpoint = input({
  label: "Webhook Endpoint",
  type: "string",
  required: true,
  example:
    "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjhiNGY0ZTRkLWIyODMtNDE4Yy04YmZhLTg1NGI11234567890==",
  placeholder: "Enter webhook URL",
  comments: "The HTTPS endpoint URL that will receive S3 event notifications.",
  clean: util.types.toString,
});
const subscriptionArn = input({
  label: "Subscription ARN",
  type: "string",
  required: true,
  example:
    "arn:aws:sns:us-east-2:123456789012:MyTopic:a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  placeholder: "Enter subscription ARN",
  comments: "The Amazon Resource Name (ARN) of the SNS topic subscription.",
  clean: util.types.toString,
});
const eventsList = input({
  label: "Event Types",
  comments:
    "S3 event types that will trigger notifications. For more information, see [S3 Event Notification Types](https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html).",
  type: "string",
  collection: "valuelist",
  model: INPUT_EVENT_TYPES_MODEL,
  example: "s3:ObjectCreated:*",
  placeholder: "Select event types",
  required: true,
  clean: toTrimmedStringArray,
});
const eventNotificationName = input({
  label: "Event Notification Name",
  type: "string",
  required: true,
  example: "S3ObjectCreatedAlert",
  placeholder: "Enter event notification name",
  comments: "A unique name for the event notification configuration.",
  clean: util.types.toString,
});
export const bucketEventTriggerConfigurationInputs = {
  awsConnection: accessKeyInput,
  ...dynamicAccessAllInputs,
  snsTopicArn,
  eventsList,
  bucket,
  eventNotificationName,
  bucketOwnerAccountid,
  awsRegion,
};
export const createTopicInputs = {
  awsConnection: accessKeyInput,
  ...dynamicAccessAllInputs,
  name,
  awsRegion,
};
export const subscribeToTopicInputs = {
  awsConnection: accessKeyInput,
  ...dynamicAccessAllInputs,
  snsTopicArn,
  endpoint,
  awsRegion,
};
export const unsubscribeFromTopicInputs = {
  awsConnection: accessKeyInput,
  ...dynamicAccessAllInputs,
  subscriptionArn,
  awsRegion,
};
export const updateTopicPolicyInputs = {
  awsConnection: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  snsTopicArn,
  bucketOwnerAccountid,
  awsRegion,
};
