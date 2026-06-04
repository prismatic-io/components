import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { publishMessageExamplePayload } from "../examplePayloads";
import { queueName, connectionInput, routeMessage, routingKey, exchange } from "../inputs";

export const publishMessage = action({
  display: {
    label: "Publish Message",
    description: "Add a message to an AMQP-based queue",
  },
  perform: async (
    context,
    { queueName, message, amqpConnection, routeMessage, routingKey, exchange },
  ) => {
    const client = await createClient(amqpConnection, context.debug.enabled, context.logger);
    const channel = await client.createConfirmChannel();

    let result: boolean;
    if (!routeMessage) {
      result = channel.sendToQueue(queueName, message);
    } else {
      result = channel.publish(exchange, routingKey, message);
    }

    await channel.waitForConfirms();
    await channel.close();
    await client.close();
    return { data: result };
  },
  inputs: {
    amqpConnection: connectionInput,
    queueName: {
      ...queueName,
      comments:
        "Provide the name of the queue you would like to interact with." +
        " (Note: this input is required when Route Messages is false.)",
      required: false,
    },
    exchange,
    routingKey,
    routeMessage,
    message: input({
      label: "Message",
      example: "Message to Queue",
      placeholder: "Message",
      type: "string",
      required: true,
      comments: "Provide a message to push on to the queue.",
      clean: (value) => Buffer.from(util.types.toString(value), "utf-8"),
    }),
  },
  examplePayload: publishMessageExamplePayload,
});
