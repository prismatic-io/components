import type { Event, TopicConfiguration } from "@aws-sdk/client-s3";
import { action } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { bucketEventTriggerConfigurationExamplePayload } from "../../examplePayloads";
import { bucketEventTriggerConfigurationInputs } from "../../inputs";
import { processTopicConfiguration } from "../../utils";
export const bucketEventTriggerConfiguration = action({
  display: {
    label: "Add Bucket SNS Event Notification",
    description: "Add events to send notifications to SNS Topic",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    {
      awsRegion,
      awsConnection,
      snsTopicArn,
      eventsList,
      bucket,
      eventNotificationName,
      bucketOwnerAccountid,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const s3Client = await createS3Client({
      awsConnection,
      awsRegion,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    });
    const topicConfiguration: TopicConfiguration = {
      Id: eventNotificationName,
      TopicArn: snsTopicArn,
      Events: eventsList as Event[],
    };
    return {
      data: await processTopicConfiguration(
        s3Client,
        bucket,
        bucketOwnerAccountid,
        eventNotificationName,
        topicConfiguration,
      ),
    };
  },
  inputs: bucketEventTriggerConfigurationInputs,
  examplePerform: async () => bucketEventTriggerConfigurationExamplePayload,
  examplePayload: bucketEventTriggerConfigurationExamplePayload,
});
