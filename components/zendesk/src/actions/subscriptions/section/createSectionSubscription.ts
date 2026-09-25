import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { createSectionSubscriptionExamplePayload } from "../../../examplePayloads";
import { createSectionSubscriptionInputs } from "../../../inputs";
import { createSectionSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
export const createSectionSubscription = action({
  display: {
    label: "Create Section Subscription",
    description: "Create a section subscription in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, sectionId, locale, includeComments, userId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = locale
      ? `/help_center/${locale}/sections/${sectionId}/subscriptions`
      : `/help_center/sections/${sectionId}/subscriptions`;
    const payload = {
      user_id: userId,
      source_locale: locale,
      include_comments: includeComments,
    };
    const { data } = await client.post<SubscriptionResponse>(url, payload);
    return {
      data,
    };
  },
  examplePerform: async (_context, { locale, sectionId, userId }) => ({
    data: {
      ...createSectionSubscriptionExamplePayload.data,
      subscription: {
        ...createSectionSubscriptionExamplePayload.data.subscription,
        ...(sectionId ? { content_id: sectionId } : {}),
        ...(userId ? { user_id: userId } : {}),
        ...(locale ? { locale } : {}),
      },
    },
  }),
  inputs: createSectionSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSectionSubscriptionOutputSchema,
  }),
  examplePayload: createSectionSubscriptionExamplePayload,
});
