import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { connectionInput, sectionId, subscriptionId } from "../../../inputs";

export const deleteSectionSubscription = action({
  display: {
    label: "Delete Section Subscription",
    description: "Delete a section subscription in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, sectionId, subscriptionId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    await client.delete(
      `/help_center/sections/${sectionId}/subscriptions/${subscriptionId}`,
    );

    return {
      data: null,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    sectionId,
    subscriptionId: {
      ...subscriptionId,
      dataSource: "selectSectionSubscription",
    },
  },
  examplePayload: {
    data: null,
  },
});
