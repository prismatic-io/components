import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { publishMessagesExamplePayload } from "../examplePayloads";
import { brokers, clientId, connection, messages, topic } from "../inputs";
import { publishMessagesOutputSchema } from "../outputSchemas";
export const publishMessages = action({
  display: {
    label: "Publish Messages",
    description: "Publish one or more messages to an Apache Kafka topic.",
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
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePerform: async (_context, { topic }) => ({
    data: publishMessagesExamplePayload.data.map((record) => ({
      ...record,
      topicName: topic,
    })),
  }),
  inputs: { connection, clientId, brokers, topic, messages },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: publishMessagesOutputSchema,
  }),
  examplePayload: publishMessagesExamplePayload,
});
export default publishMessages;
