import { action } from "@prismatic-io/spectral";
import { connectionInput, topicId } from "../../inputs";
import { rawHttpClient } from "../../auth";

export const deleteTopic = action({
  display: {
    label: "Delete Topic",
    description: "Delete a topic from the Help Center.",
  },
  perform: async (context, { zendeskConnection, topicId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);

    const { data } = await client.delete(`/community/topics/${topicId}`);

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId,
  },
  examplePayload: {
    data: null,
  },
});
