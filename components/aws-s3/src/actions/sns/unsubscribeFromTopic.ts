import { UnsubscribeCommand } from "@aws-sdk/client-sns";
import { action } from "@prismatic-io/spectral";
import { createSNSClient } from "../../client";
import { unsubscribeFromTopicExamplePayload } from "../../examplePayloads";
import { unsubscribeFromTopicInputs } from "../../inputs";
export const unsubscribeFromTopic = action({
  display: {
    label: "Unsubscribe from SNS Topic",
    description:
      "Unsubscribe from an Amazon SNS Topic for S3 Event Notifications",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    {
      awsConnection,
      awsRegion,
      subscriptionArn,
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
    const unsubscribeParams = {
      SubscriptionArn: subscriptionArn,
    };
    const command = new UnsubscribeCommand(unsubscribeParams);
    const response = await sns.send(command);
    return {
      data: response,
    };
  },
  inputs: unsubscribeFromTopicInputs,
  examplePerform: async () => unsubscribeFromTopicExamplePayload,
  examplePayload: unsubscribeFromTopicExamplePayload,
});
