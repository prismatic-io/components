import { action } from "@prismatic-io/spectral";
import { createSQSClient } from "../client";
import { url, receiptHandle, connectionInputs } from "../inputs";
import { deleteMessageExample } from "../examplePayloads";

const deleteMessage = action({
  display: {
    label: "Delete Message",
    description: "Delete a message from an Amazon SQS Queue",
  },
  perform: async (context, params) => {
    const client = await createSQSClient(params);
    const response = await client.deleteMessage({
      QueueUrl: params.url,
      ReceiptHandle: params.receiptHandle,
    });

    return {
      data: response,
    };
  },
  inputs: { url, receiptHandle, ...connectionInputs },
  examplePayload: deleteMessageExample,
});

export default deleteMessage;
