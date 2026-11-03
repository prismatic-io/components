import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { FEED_DEFAULT_PAGE_SIZE } from "../constants";
import { selectFeedDataSourceExamplePayload } from "../examplePayloads/datasources";
import { selectFeedInputs } from "../inputs";
import type { Feed } from "../types";
import { paginateResults } from "../util";

export const selectFeed = dataSource({
  display: {
    label: "Select Feed",
    description: "Select a feed from the Amazon Seller Central account.",
  },
  inputs: selectFeedInputs,
  perform: async (
    _context,
    {
      connection,
      feedTypes,
      marketplaceIds,
      processingStatuses,
      createdSince,
      createdUntil,
    },
  ) => {
    const client = createClient(connection);
    const feeds = await paginateResults<Feed>(
      client,
      "/feeds/2021-06-30/feeds",
      {
        feedTypes: feedTypes,
        pageSize: FEED_DEFAULT_PAGE_SIZE,
        processingStatuses: processingStatuses,
        createdSince,
        createdUntil,
        marketplaceIds,
      },
      "feeds",
      true,
    );

    const result: Element[] = feeds.map((feed) => ({
      label: `${feed.feedId} - ${feed.feedType} (${feed.processingStatus})`,
      key: feed.feedId,
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectFeedDataSourceExamplePayload,
});
