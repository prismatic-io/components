import { action } from "@prismatic-io/spectral";
import { articleId, connectionInput, locale, userId } from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import { subscriptionPayload } from "../../../examplePayloads";

export const createArticleSubscription = action({
  display: {
    label: "Create Article Subscription",
    description: "Create a subscription to an article in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, articleId, locale, userId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      user_id: userId || undefined,
      source_locale: locale || undefined,
    };

    const url = locale
      ? `/help_center/${locale}/articles/${articleId}/subscriptions`
      : `/help_center/articles/${articleId}/subscriptions`;

    const { data } = await client.post<SubscriptionResponse>(url, payload);

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleId,
    userId: {
      ...userId,
      comments:
        "The ID of the user to subscribe to the section. If none provided, the API assumes the current user.",
      required: false,
    },
    locale: {
      ...locale,
      required: false,
      model: undefined,
      default: undefined,
      comments:
        "The locale of the article. If not provided, the default locale is used.",
    },
  },
  examplePayload: { data: subscriptionPayload },
});
