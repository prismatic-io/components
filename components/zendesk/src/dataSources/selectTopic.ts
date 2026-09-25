import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { selectTopicExamplePayload } from "../examplePayloads";
import { selectTopicInputs } from "../inputs";
import type { Topic } from "../types";
import { byElementLabel, paginateResults } from "../util";
export const selectTopic = dataSource({
  display: {
    label: "Select Topic",
    description: "Select a topic from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Topic[];
    const paginatedResults = await paginateResults<Topic>(
      client,
      "/community/topics",
      results,
      "topics",
    );
    return {
      result: paginatedResults
        .map<Element>((topic) => ({
          label: topic.name,
          key: util.types.toString(topic.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectTopicInputs,
  dataSourceType: "picklist",
  examplePayload: selectTopicExamplePayload,
});
