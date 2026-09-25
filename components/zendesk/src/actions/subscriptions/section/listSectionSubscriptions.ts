import { listSectionSubscriptionsInputs } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import { listSectionSubscriptionsOutputSchema } from "../../../outputSchemas";
import type { PaginatedResponse, Subscription } from "../../../types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { listSectionSubscriptionsExamplePayload } from "../../../examplePayloads";
export const listSectionSubscriptions = action({
  display: {
    label: "List Section Subscriptions",
    description: "List all section subscriptions in the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, sectionId, pagination }) => {
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
    >(`/help_center/sections/${sectionId}/subscriptions`, { params });
    return {
      data,
    };
  },
  inputs: listSectionSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSectionSubscriptionsOutputSchema,
  }),
  examplePayload: listSectionSubscriptionsExamplePayload,
});
