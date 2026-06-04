import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTopicInputs } from "../inputs";

export const selectTopic = dataSource({
  display: {
    label: "Select Topic",
    description: "Select a Kafka topic from the list.",
  },
  inputs: selectTopicInputs,
  perform: async (_context, params) => {
    const { connection, broker, clientId } = params;

    const kafka = createClient(
      {
        clientId,
        brokers: [broker],
        connection,
      },
      false,
    );

    const admin = kafka.admin();

    try {
      await admin.connect();
      const topics = await admin.listTopics();
      await admin.disconnect();

      const result = topics
        .filter((topic) => !topic.startsWith("__")) 
        .map<Element>((topic) => ({
          label: topic,
          key: topic,
        }));

      return { result };
    } catch (error) {
      await admin.disconnect().catch(() => {}); 
      throw error;
    }
  },
  dataSourceType: "picklist",
});
