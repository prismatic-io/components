import { subscriptionPayload } from "../../../examplePayloads";
import { connectionInput, sectionId, subscriptionId } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import { action } from "@prismatic-io/spectral";

export const getSectionSubscription = action({
  display: {
    label: "Get Section Subscription",
    description: "Get a section subscription from the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, sectionId, subscriptionId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<SubscriptionResponse>(
      `/help_center/sections/${sectionId}/subscriptions/${subscriptionId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    subscriptionId: {
      ...subscriptionId,
      dataSource: "selectSectionSubscription",
    },
    sectionId,
  },
  examplePayload: { data: subscriptionPayload },
});
