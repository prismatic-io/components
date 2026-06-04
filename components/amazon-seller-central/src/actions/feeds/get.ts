import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFeedExamplePayload } from "../../examplePayloads/feeds";
import { connectionInput, feedId } from "../../inputs";

export const getFeed = action({
  display: {
    label: "Get Feed",
    description:
      "Returns feed details (including the resultDocumentId, if available) for the feed that you specify.",
  },
  examplePayload: getFeedExamplePayload,
  inputs: {
    connectionInput,
    feedId,
  },
  perform: async (context, { connectionInput, feedId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/feeds/2021-06-30/feeds/${feedId}`);
    return {
      data,
    };
  },
});
