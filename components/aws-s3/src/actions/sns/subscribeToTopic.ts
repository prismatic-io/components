import {
  SubscribeCommand,
  type SubscribeCommandInput,
} from "@aws-sdk/client-sns";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createSNSClient } from "../../client";
import { subscribeToTopicExamplePayload } from "../../examplePayloads";
import { subscribeToTopicInputs } from "../../inputs";
import { subscribeToTopicOutputSchema } from "../../outputSchemas";
export const subscribeToTopic = action({
  display: {
    label: "Subscribe to SNS Topic",
    description: "Subscribe to an Amazon SNS Topic for S3 Event Notifications",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    {
      awsRegion,
      awsConnection,
      snsTopicArn,
      endpoint,
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
    const subscribeParams: SubscribeCommandInput = {
      Protocol: "https",
      TopicArn: snsTopicArn,
      Endpoint: endpoint,
    };
    const subscribeCommand = new SubscribeCommand(subscribeParams);
    const responseSubscribeCommand = await sns.send(subscribeCommand);
    return {
      data: responseSubscribeCommand,
    };
  },
  inputs: subscribeToTopicInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: subscribeToTopicOutputSchema,
  }),
  examplePerform: async () => subscribeToTopicExamplePayload,
  examplePayload: subscribeToTopicExamplePayload,
});
