import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { brokers, clientId, connection } from "../inputs";
import { listTopicsExamplePayload } from "../examplePayloads";

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
  inputs: { connection, clientId, brokers },
  examplePayload: listTopicsExamplePayload,
});

export default listTopics;
