import { action } from "@prismatic-io/spectral";
import { connectionInput, topicDescription, topicName } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Topic } from "../../types";
import { createTopicPayload } from "../../examplePayloads";

export const createTopic = action({
  display: {
    label: "Create Topic",
    description: "Create a new topic in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, topicName, topicDescription },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      topic: {
        name: topicName,
        description: topicDescription,
      },
    };

    const { data } = await client.post<{ topic: Topic }>(
      "/community/topics",
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicName,
    topicDescription,
  },
  examplePayload: { data: createTopicPayload },
});
