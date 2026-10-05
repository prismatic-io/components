import { input } from "@prismatic-io/spectral";
import { awsRegion, dynamicAccessAllInputs } from "aws-utils";
import { cleanString, lookBackDateClean } from "../utils";
import { accessKeyInput, bucket } from "./common";
const filesLookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each file modified on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const bucketsLookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each bucket created on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollChangesFilesTriggerInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  bucket,
  lookBackDate: filesLookBackDate,
  awsRegion,
};
export const pollNewBucketsTriggerInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
  lookBackDate: bucketsLookBackDate,
  awsRegion,
};
const expectedTopicArn = input({
  label: "Topic ARN",
  placeholder: "Enter the expected Amazon SNS Topic ARN",
  type: "string",
  required: false,
  comments:
    "The Amazon SNS Topic ARN this webhook should accept messages from. When set, a validly signed message from any other topic is rejected, including a subscription confirmation, so a foreign subscription is never confirmed. Leave empty to accept a validly signed message from any topic.",
  example: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  clean: cleanString,
});
export const snsS3NotificationWebhookInputs = { expectedTopicArn };
