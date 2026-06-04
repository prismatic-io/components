import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { brokers, clientId, connection, messages, topic } from "../inputs";
import { publishMessagesExamplePayload } from "../examplePayloads";

export const publishMessages = action({
  display: {
    label: "Publish Messages",
    description: "Publish a message to an Apache Kafka topic.",
  },
  perform: async (
    context,
    { connection, clientId, brokers, topic, messages },
  ) => {
    const kafka = createClient(
      {
        clientId,
        brokers,
        connection,
      },
      context.debug.enabled,
    );
    const producer = kafka.producer();
    await producer.connect();
    const result = await producer.send({
      topic,
      messages: messages.map((x) => ({
        value: x.value,
      })),
    });
    await producer.disconnect();

    return { data: result };
  },
  inputs: { connection, clientId, brokers, topic, messages },
  examplePayload: publishMessagesExamplePayload,
});

export default publishMessages;
