import { action } from "@prismatic-io/spectral";
import { connectionInput, cursor, fetchAll, pageLimit } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { PaginatedResponse, Topic } from "../../types";
import { listTopicsPayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listTopics = action({
  display: {
    label: "List Topics",
    description: "List all topics in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, cursor, pageLimit, fetchAll },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = "/community/topics";
    const params = {
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
    };

    if (fetchAll) {
      const topics: Topic[] = [];
      return {
        data: {
          topics: await paginateResults<Topic>(
            client,
            url,
            topics,
            "topics",
            pageLimit || undefined,
          ),
        },
      };
    }

    const { data } = await client.get<
      PaginatedResponse<{ topics: Topic[] }> | { topics: Topic[] }
    >("/community/topics", {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    cursor,
    pageLimit,
    fetchAll,
  },
  examplePayload: { data: listTopicsPayload },
});
