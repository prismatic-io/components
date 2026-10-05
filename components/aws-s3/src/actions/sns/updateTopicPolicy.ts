import {
  SetTopicAttributesCommand,
  type SetTopicAttributesCommandInput,
} from "@aws-sdk/client-sns";
import { action } from "@prismatic-io/spectral";
import { createSNSClient } from "../../client";
import { updateTopicPolicyExamplePayload } from "../../examplePayloads";
import { updateTopicPolicyInputs } from "../../inputs";
export const updateTopicPolicy = action({
  display: {
    label: "Update SNS Topic Policy for S3 Event Notification",
    description:
      "Update an Amazon SNS Topic Policy to grant S3 permission to publish",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    {
      awsConnection,
      awsRegion,
      snsTopicArn,
      bucketOwnerAccountid,
      bucket,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const sns = await createSNSClient({
      awsConnection,
      awsRegion,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    });
    const policy = {
      Version: "2012-10-17",
      Id: "allow-s3-to-publish",
      Statement: [
        {
          Sid: "allow-s3-to-publish",
          Effect: "Allow",
          Principal: {
            Service: "s3.amazonaws.com",
          },
          Action: ["SNS:Publish"],
          Resource: snsTopicArn,
          Condition: {
            ArnLike: {
              "aws:SourceArn": `arn:aws:s3:*:*:${bucket}`,
            },
            StringEquals: {
              "aws:SourceAccount": bucketOwnerAccountid,
            },
          },
        },
      ],
    };
    const input: SetTopicAttributesCommandInput = {
      TopicArn: snsTopicArn,
      AttributeName: "Policy",
      AttributeValue: JSON.stringify(policy),
    };
    const command = new SetTopicAttributesCommand(input);
    const response = await sns.send(command);
    return {
      data: response,
    };
  },
  inputs: updateTopicPolicyInputs,
  examplePerform: async () => updateTopicPolicyExamplePayload,
  examplePayload: updateTopicPolicyExamplePayload,
});
