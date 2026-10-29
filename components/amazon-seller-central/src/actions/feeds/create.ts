import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFeedExamplePayload } from "../../examplePayloads/feeds";
import {
  connectionInput,
  feedOptions,
  feedType,
  inputFeedDocumentId,
  MarketplaceIdsBody,
} from "../../inputs";

export const createFeed = action({
  display: {
    label: "Create Feed",
    description:
      "Creates a feed. Upload the contents of the feed document before calling this operation.",
  },
  examplePayload: createFeedExamplePayload,
  inputs: {
    connectionInput,
    feedType,
    marketplaceIds: MarketplaceIdsBody,
    inputFeedDocumentId,
    feedOptions,
  },
  perform: async (
    context,
    {
      connectionInput,
      feedType,
      marketplaceIds,
      inputFeedDocumentId,
      feedOptions,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/feeds/2021-06-30/feeds", {
      feedType: feedType || undefined,
      marketplaceIds: marketplaceIds || undefined,
      inputFeedDocumentId: inputFeedDocumentId || undefined,
      feedOptions: feedOptions || undefined,
    });
    return {
      data,
    };
  },
});
