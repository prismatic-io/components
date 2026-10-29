import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFeedsExamplePayload } from "../../examplePayloads/feeds";
import {
  connectionInput,
  createdSince,
  createdUntil,
  feedTypes,
  MarketplaceIds,
  NextToken,
  pageSize,
  processingStatuses,
} from "../../inputs";

export const listFeeds = action({
  display: {
    label: "List Feeds",
    description:
      "Returns feed details for the feeds that match the filters that you specify.",
  },
  examplePayload: listFeedsExamplePayload,
  inputs: {
    connectionInput,

    feedTypes,
    marketplaceIds: { ...MarketplaceIds, required: false },
    pageSize,
    processingStatuses,
    createdSince,
    createdUntil,
    nextToken: NextToken,
  },
  perform: async (
    context,
    {
      connectionInput,
      feedTypes,
      marketplaceIds,
      pageSize,
      processingStatuses,
      createdSince,
      createdUntil,
      nextToken,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/feeds/2021-06-30/feeds", {
      params: {
        feedTypes: feedTypes || undefined,
        marketplaceIds: marketplaceIds || undefined,
        pageSize: pageSize || undefined,
        processingStatuses: processingStatuses || undefined,
        createdSince: createdSince || undefined,
        createdUntil: createdUntil || undefined,
        nextToken: nextToken || undefined,
      },
    });
    return {
      data,
    };
  },
});
