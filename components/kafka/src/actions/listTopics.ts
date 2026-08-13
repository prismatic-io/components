import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listTopicsExamplePayload } from "../examplePayloads";
import { brokers, clientId, connection } from "../inputs";
import { listTopicsOutputSchema } from "../outputSchemas";
export const listTopics = action({
  display: {
    label: "List Topics",
    description: "List all topics in the Kafka cluster.",
  },
  perform: async (context, { connection, clientId, brokers }) => {
    const kafka = createClient(
      {
        clientId,
        brokers,
        connection,
      },
      context.debug.enabled,
    );
    const admin = kafka.admin();
    try {
      await admin.connect();
      const topics = await admin.listTopics();
      const topicMetadata = await admin.fetchTopicMetadata({ topics });
      await admin.disconnect();
      const result = topicMetadata.topics.map((topic) => ({
        name: topic.name,
        partitions: topic.partitions.length,
        isInternal: topic.name.startsWith("__"),
      }));
      return {
        data: {
          topics: result.filter((t) => !t.isInternal),
          internalTopics: result.filter((t) => t.isInternal),
          totalCount: result.length,
        },
      };
    } catch (error) {
      await admin.disconnect().catch(() => {});
      throw error;
    }
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePerform: async () => listTopicsExamplePayload,
  inputs: { connection, clientId, brokers },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTopicsOutputSchema,
  }),
  examplePayload: listTopicsExamplePayload,
});
export default listTopics;
