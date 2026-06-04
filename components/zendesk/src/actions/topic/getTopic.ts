import { action } from "@prismatic-io/spectral";
import { connectionInput, topicId } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Topic } from "../../types";
import { getTopicPayload } from "../../examplePayloads";

export const getTopic = action({
  display: {
    label: "Get Topic",
    description: "Get a topic from the Help Center.",
  },
  perform: async (context, { zendeskConnection, topicId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{ topic: Topic }>(
      `/community/topics/${topicId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId,
  },
  examplePayload: { data: getTopicPayload },
});
