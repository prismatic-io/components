import { action, input } from "@prismatic-io/spectral";
import type { Message } from "amqplib";
import { createClient } from "../client";
import { acknowledgeMessageExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const acknowledgeMessage = action({
  display: {
    label: "Acknowledge Message",
    description: "Acknowledge a previously fetched message",
  },
  perform: async (context, { message, amqpConnection }) => {
    const client = await createClient(amqpConnection, context.debug.enabled, context.logger);
    const channel = await client.createConfirmChannel();
    const result = channel.ack(message as Message);
    await channel.waitForConfirms();
    await channel.close();
    await client.close();
    return { data: result };
  },
  inputs: {
    amqpConnection: connectionInput,
    message: input({
      type: "string",
      label: "Message",
      required: true,
      comments: "An AMQP message. This must reference the results of a previous 'Get Message' step",
    }),
  },
  examplePayload: acknowledgeMessageExamplePayload,
});
