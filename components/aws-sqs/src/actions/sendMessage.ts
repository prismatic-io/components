import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import {
  message,
  attributes,
  url,
  delaySeconds,
  messageGroupId,
  messageDeduplicationId,
  connectionInputs,
} from "../inputs";
import { sendMessageExample } from "../examplePayloads";

const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Send a message to an Amazon SQS Queue",
  },
  perform: async (context, params) => {
    const attr = (params.attributes || []).reduce((result, { key, value }) => {
      result[key] = {
        DataType: "String",
        StringValue: value,
      };
      return result;
    }, {});
    const client = await createSQSClient(params);
    const result = await client.sendMessage({
      DelaySeconds: params.delaySeconds,
      MessageAttributes: attr,
      MessageBody: params.message,
      QueueUrl: params.url,
      MessageGroupId: params.messageGroupId || undefined,
      MessageDeduplicationId: params.messageDeduplicationId || undefined,
    });

    return {
      data: result,
    };
  },
  inputs: {
    url,
    message,
    messageGroupId,
    messageDeduplicationId,
    attributes,
    delaySeconds,
    ...connectionInputs,
  },
  examplePayload: sendMessageExample,
});

export default sendMessage;
