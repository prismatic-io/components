import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { INTERNAL_TOPIC_PREFIX } from "../../constants";
import { listTopicsExamplePayload } from "../../examplePayloads";
import { listTopicsInputs } from "../../inputs";
import { listTopicsOutputSchema } from "../../outputSchemas";
import { withAdmin } from "../../utils";
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
    const topicMetadata = await withAdmin(kafka, async (admin) => {
      const topics = await admin.listTopics();
      return admin.fetchTopicMetadata({ topics });
    });
    const result = topicMetadata.topics.map((topic) => ({
      name: topic.name,
      partitions: topic.partitions.length,
      isInternal: topic.name.startsWith(INTERNAL_TOPIC_PREFIX),
    }));
    return {
      data: {
        topics: result.filter((t) => !t.isInternal),
        internalTopics: result.filter((t) => t.isInternal),
        totalCount: result.length,
      },
    };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePerform: async () => listTopicsExamplePayload,
  inputs: listTopicsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTopicsOutputSchema,
  }),
  examplePayload: listTopicsExamplePayload,
});
