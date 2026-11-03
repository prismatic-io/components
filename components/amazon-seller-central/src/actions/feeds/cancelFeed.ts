import { action, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelFeedExamplePayload } from "../../examplePayloads/feeds";
import { cancelFeedInputs } from "../../inputs";

export const cancelFeed = action({
  display: {
    label: "Cancel Feed",
    description: "Cancels the specified feed.",
  },
  examplePayload: cancelFeedExamplePayload,
  inputs: cancelFeedInputs,
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (context, { connectionInput, feedId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(`/feeds/2021-06-30/feeds/${feedId}`);
    return {
      data,
    };
  },
  examplePerform: async () => cancelFeedExamplePayload,
});
