import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelFeedExamplePayload } from "../../examplePayloads/feeds";
import { connectionInput, feedId } from "../../inputs";

export const cancelFeed = action({
  display: {
    label: "Cancel Feed",
    description: "Cancels the feed that you specify.",
  },
  examplePayload: cancelFeedExamplePayload,
  inputs: {
    connectionInput,
    feedId,
  },
  perform: async (context, { connectionInput, feedId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(`/feeds/2021-06-30/feeds/${feedId}`);
    return {
      data,
    };
  },
});
