import { action } from "@prismatic-io/spectral";
import { topicName, message, connectionInput } from "./inputs";
import { createClient } from "./client";
import { publishExamplePayload } from "./examplePayloads";

export const publish = action({
  display: {
    label: "Publish Message",
    description: "Publish a message to a MQTT topic.",
  },
  examplePayload: publishExamplePayload,
  perform: async (context, { mqttConnection, topicName, message }) => {
    const client = await createClient(
      mqttConnection,
      context.debug.enabled,
      context.logger,
    );
    await client.publishAsync(topicName, message);
    await client.endAsync();

    return {
      data: "Message published successfully.",
    };
  },
  inputs: { topicName, message, mqttConnection: connectionInput },
});
