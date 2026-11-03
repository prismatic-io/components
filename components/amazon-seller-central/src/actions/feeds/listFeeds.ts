import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFeedsExamplePayload } from "../../examplePayloads/feeds";
import { listFeedsInputs } from "../../inputs";
import { listFeedsOutputSchema } from "../../outputSchemas";

export const listFeeds = action({
  display: {
    label: "List Feeds",
    description:
      "Returns feed details for the feeds that match the specified filters.",
  },
  examplePayload: listFeedsExamplePayload,
  inputs: listFeedsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFeedsOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      feedTypes,
      marketplaceIds,
      processingStatuses,
      createdSince,
      createdUntil,
      pagination,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/feeds/2021-06-30/feeds", {
      params: {
        feedTypes: feedTypes || undefined,
        marketplaceIds: marketplaceIds || undefined,
        pageSize: pagination.pageSize || undefined,
        processingStatuses: processingStatuses || undefined,
        createdSince: createdSince || undefined,
        createdUntil: createdUntil || undefined,
        nextToken: pagination.nextToken || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listFeedsExamplePayload,
});
