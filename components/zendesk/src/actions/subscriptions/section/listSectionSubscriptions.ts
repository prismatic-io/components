import { paginatedSubscriptionPayload } from "../../../examplePayloads";
import { connectionInput, cursor, pageLimit, sectionId } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { PaginatedResponse, Subscription } from "../../../types";
import { action } from "@prismatic-io/spectral";

export const listSectionSubscriptions = action({
  display: {
    label: "List Section Subscriptions",
    description: "List all section subscriptions in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, sectionId, cursor, pageLimit },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const params = {
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
    };

    const { data } = await client.get<
      | PaginatedResponse<{ subscriptions: Subscription[] }>
      | { subscriptions: Subscription[] }
    >(`/help_center/sections/${sectionId}/subscriptions`, { params });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    cursor,
    pageLimit,
    sectionId,
  },
  examplePayload: {
    data: paginatedSubscriptionPayload,
  },
});
