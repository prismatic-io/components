import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { createArticleSubscriptionExamplePayload } from "../../../examplePayloads";
import { createArticleSubscriptionInputs } from "../../../inputs";
import { createArticleSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
export const createArticleSubscription = action({
  display: {
    label: "Create Article Subscription",
    description: "Create a subscription to an article in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, articleId, locale, userId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      user_id: userId,
      source_locale: locale,
    };
    const url = locale
      ? `/help_center/${locale}/articles/${articleId}/subscriptions`
      : `/help_center/articles/${articleId}/subscriptions`;
    const { data } = await client.post<SubscriptionResponse>(url, payload);
    return {
      data,
    };
  },
  examplePerform: async (_context, { articleId, locale, userId }) => ({
    data: {
      ...createArticleSubscriptionExamplePayload.data,
      subscription: {
        ...createArticleSubscriptionExamplePayload.data.subscription,
        ...(articleId ? { content_id: articleId } : {}),
        ...(userId ? { user_id: userId } : {}),
        ...(locale ? { locale } : {}),
      },
    },
  }),
  inputs: createArticleSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createArticleSubscriptionOutputSchema,
  }),
  examplePayload: createArticleSubscriptionExamplePayload,
});
