import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import { deleteArticleSubscriptionExamplePayload } from "../../../examplePayloads";
import { deleteArticleSubscriptionInputs } from "../../../inputs";
import { deleteArticleSubscriptionOutputSchema } from "../../../outputSchemas";
export const deleteArticleSubscription = action({
  display: {
    label: "Delete Article Subscription",
    description: "Delete a subscription to an article in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, articleId, locale, subscriptionId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = locale
      ? `/help_center/${locale}/articles/${articleId}/subscriptions/${subscriptionId}`
      : `/help_center/articles/${articleId}/subscriptions/${subscriptionId}`;
    const { data } = await client.delete(url);
    return {
      data,
    };
  },
  examplePerform: async () => deleteArticleSubscriptionExamplePayload,
  inputs: deleteArticleSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteArticleSubscriptionOutputSchema,
  }),
  examplePayload: deleteArticleSubscriptionExamplePayload,
});
