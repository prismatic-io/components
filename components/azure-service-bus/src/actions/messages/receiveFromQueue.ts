import { action, input, util } from "@prismatic-io/spectral";
import safeStableStringify from "safe-stable-stringify";
import { azureServiceBusClientLibrary } from "../../client";
import { receiveMessagesFromQueueExamplePayload } from "../../examplePayloads";
import {
  amountOfMessages,
  connection,
  maxTimeToWait,
  namespaceName,
  queueName,
  resourceGroupName,
  subscriptionId,
} from "../../inputs";

export const receiveMessagesFromQueue = action({
  display: {
    label: "Receive Messages from Queue",
    description:
      "Receive messages from a queue. Receive messages from a queue will remove the message from the queue.",
  },
  examplePayload: receiveMessagesFromQueueExamplePayload,
  perform: async (
    context,
    {
      connection,
      queueName,
      amountOfMessages,
      namespaceName,
      maxTimeToWait,
      returnFullMessages,
      peek,
    },
  ) => {
    const client = azureServiceBusClientLibrary(connection, namespaceName);
    const queueReceiver = client.createReceiver(queueName);
    const allMessages = [];
    try {
      const messages = peek
        ? await queueReceiver.peekMessages(amountOfMessages)
        : await queueReceiver.receiveMessages(amountOfMessages, {
            maxWaitTimeInMs: maxTimeToWait * 1000,
          });

      for (const message of messages) {
        allMessages.push(
          returnFullMessages
            ? JSON.parse(safeStableStringify(message))
            : message.body,
        );
        if (!peek) {
          await queueReceiver.completeMessage(message);
        }
      }

      await queueReceiver.close();
    } finally {
      await client.close();
    }
    return {
      data: allMessages,
    };
  },
  inputs: {
    connection,
    subscriptionId: { ...subscriptionId, required: false },
    resourceGroupName: { ...resourceGroupName, required: false },
    namespaceName,
    queueName,
    amountOfMessages,
    maxTimeToWait,
    returnFullMessages: input({
      label: "Return Full Messages",
      type: "boolean",
      required: false,
      default: "false",
      comments:
        "If true, the full message objects will be returned including message ID, sequence number, delivery metadata, etc. If false, only the messages bodies will be returned.",
      clean: util.types.toBool,
    }),
    peek: input({
      label: "Peek",
      type: "boolean",
      required: false,
      default: "false",
      comments:
        "If true, the messages will be peeked from the queue, which doesn't alter the visibility of the message. If false, the messages will be received from the queue. https://learn.microsoft.com/en-us/rest/api/storageservices/peek-messages",
      clean: util.types.toBool,
    }),
  },
});

export default { receiveMessagesFromQueue };
