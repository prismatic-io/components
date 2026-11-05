import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { checkConnectionExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const checkConnection = action({
  display: {
    label: "Check AMQP Connection",
    description:
      "Verify that an AMQP server is available, and return the server's connection information. This is helpful for debugging purposes.",
  },
  perform: async (context, { amqpConnection }) => {
    const client = await createClient(amqpConnection, context.debug.enabled, context.logger);
    await client.close();
    return {
      data: {
        ...client.connection.serverProperties,
        connection: { ...amqpConnection.fields },
      },
    };
  },
  inputs: { amqpConnection: connectionInput },
  examplePayload: checkConnectionExamplePayload,
});
