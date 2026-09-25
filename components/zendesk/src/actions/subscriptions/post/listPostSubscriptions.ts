import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { listPostSubscriptionsOutputSchema } from "../../../outputSchemas";
import type { PaginatedResponse, Subscription } from "../../../types";
import { listPostSubscriptionsInputs } from "../../../inputs";
import { listPostSubscriptionsExamplePayload } from "../../../examplePayloads";
export const listPostSubscriptions = action({
  display: {
    label: "List Post Subscriptions",
    description: "List all post subscriptions in the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { postId, zendeskConnection, pagination }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      "page[size]": pagination.pageLimit,
      "page[after]": pagination.cursor,
    };
    const { data } = await client.get<
      | PaginatedResponse<{
          subscriptions: Subscription[];
        }>
      | {
          subscriptions: Subscription[];
        }
    >(`/community/posts/${postId}/subscriptions`, { params });
    return {
      data,
    };
  },
  inputs: listPostSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPostSubscriptionsOutputSchema,
  }),
  examplePayload: listPostSubscriptionsExamplePayload,
});
