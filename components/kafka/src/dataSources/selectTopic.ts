import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { INTERNAL_TOPIC_PREFIX } from "../constants";
import { selectTopicExamplePayload } from "../examplePayloads";
import { selectTopicInputs } from "../inputs";
import { withAdmin } from "../utils";
export const selectTopic = dataSource({
  display: {
    label: "Select Topic",
    description: "Select a Kafka topic from the list.",
  },
  inputs: selectTopicInputs,
  perform: async (_context, params) => {
    const { connection, brokers, clientId } = params;
    const kafka = createClient(
      {
        clientId,
        brokers,
        connection,
      },
      false,
    );
    const topics = await withAdmin(kafka, (admin) => admin.listTopics());
    const result = topics
      .filter((topic) => !topic.startsWith(INTERNAL_TOPIC_PREFIX))
      .map<Element>((topic) => ({
        label: topic,
        key: topic,
      }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectTopicExamplePayload,
});
