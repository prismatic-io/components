import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listTopicsExamplePayload } from "../../examplePayloads";
import { listTopicsInputs } from "../../inputs";
import { listTopicsOutputSchema } from "../../outputSchemas";
import type { PaginatedResponse, Topic } from "../../types";
import { paginateResults } from "../../util";
export const listTopics = action({
  display: {
    label: "List Topics",
    description: "List all topics in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { zendeskConnection, pagination, fetchAll }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = "/community/topics";
    const params = {
      "page[size]": pagination.pageLimit,
      "page[after]": pagination.cursor,
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
            pagination.pageLimit,
          ),
        },
      };
    }
    const { data } = await client.get<
      | PaginatedResponse<{
          topics: Topic[];
        }>
      | {
          topics: Topic[];
        }
    >("/community/topics", {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> =>
    fetchAll
      ? { data: { topics: listTopicsExamplePayload.data.topics } }
      : { data: listTopicsExamplePayload.data },
  inputs: listTopicsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTopicsOutputSchema,
  }),
  examplePayload: listTopicsExamplePayload,
});
