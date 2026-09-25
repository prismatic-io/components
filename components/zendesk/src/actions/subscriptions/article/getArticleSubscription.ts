import { action, outputSchema } from "@prismatic-io/spectral";
import { getArticleSubscriptionInputs } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import { getArticleSubscriptionOutputSchema } from "../../../outputSchemas";
import type { SubscriptionResponse } from "../../../types";
import { getArticleSubscriptionExamplePayload } from "../../../examplePayloads";
export const getArticleSubscription = action({
  display: {
    label: "Get Article Subscription",
    description: "Get an article subscription from the Help Center.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { zendeskConnection, articleId, subscriptionId, locale },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = locale
      ? `/help_center/${locale}/articles/${articleId}/subscriptions/${subscriptionId}`
      : `/help_center/articles/${articleId}/subscriptions/${subscriptionId}`;
    const { data } = await client.get<SubscriptionResponse>(url);
    return {
      data,
    };
  },
  inputs: getArticleSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getArticleSubscriptionOutputSchema,
  }),
  examplePayload: getArticleSubscriptionExamplePayload,
});
