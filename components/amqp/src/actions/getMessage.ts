import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getMessageExamplePayload } from "../examplePayloads";
import { queueName, connectionInput } from "../inputs";

export const getMessage = action({
  display: {
    label: "Get Message",
    description: "Receives a message from an AMQP-based queue",
  },
  perform: async (context, { queueName, amqpConnection, acknowledgeMessage }) => {
    const client = await createClient(amqpConnection, context.debug.enabled, context.logger);
    const channel = await client.createConfirmChannel();
    const result = await channel.get(queueName, { noAck: acknowledgeMessage });
    await channel.waitForConfirms();
    await client.close();
    if (result) {
      return {
        data: { ...result, message: result.content.toString() },
      };
    }
    return { data: null };
  },
  inputs: {
    queueName,
    amqpConnection: connectionInput,
    acknowledgeMessage: input({
      label: "Acknowledge Message",
      default: "true",
      type: "boolean",
      comments: 'Automatically mark the message received as "Acknowledged"',
      clean: util.types.toBool,
    }),
  },
  examplePayload: getMessageExamplePayload,
});
