import {
  CreateTopicCommand,
  type CreateTopicCommandInput,
} from "@aws-sdk/client-sns";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createSNSClient } from "../../client";
import { createTopicExamplePayload } from "../../examplePayloads";
import { createTopicInputs } from "../../inputs";
import { createTopicOutputSchema } from "../../outputSchemas";
export const createTopic = action({
  display: {
    label: "Create SNS Topic for S3 Event Notification",
    description:
      "Create an Amazon SNS Topic to be used with S3 Event Notifications",
  },
  performSafety: "notAllowed",
  perform: async (
    _context,
    {
      awsConnection,
      awsRegion,
      name,
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
    const createTopicParams: CreateTopicCommandInput = {
      Name: name,
      Attributes: { FifoTopic: "false" },
    };
    const command = new CreateTopicCommand(createTopicParams);
    const response = await sns.send(command);
    return {
      data: response,
    };
  },
  inputs: createTopicInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTopicOutputSchema,
  }),
  examplePerform: async () => createTopicExamplePayload,
  examplePayload: createTopicExamplePayload,
});
