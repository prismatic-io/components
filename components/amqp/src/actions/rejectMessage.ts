import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { rejectMessageExamplePayload } from "../examplePayloads";
import { queueName, connectionInput } from "../inputs";

export const rejectMessage = action({
  display: {
    label: "Reject Message",
    description: "Rejects one message from an AMQP-based queue",
  },
  perform: async (context, { queueName, amqpConnection }) => {
    const client = await createClient(amqpConnection, context.debug.enabled, context.logger);
    const channel = await client.createConfirmChannel();
    const result = await channel.consume(queueName, (msg) => {
      if (msg !== null) {
        channel.reject(msg);
      }
    });
    await channel.waitForConfirms();
    await channel.close();
    await client.close();
    return { data: result };
  },
  inputs: { queueName, amqpConnection: connectionInput },
  examplePayload: rejectMessageExamplePayload,
});
