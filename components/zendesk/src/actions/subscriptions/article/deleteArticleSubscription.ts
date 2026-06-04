import { action } from "@prismatic-io/spectral";
import {
  articleId,
  connectionInput,
  locale,
  subscriptionId,
} from "../../../inputs";
import { rawHttpClient } from "../../../auth";

export const deleteArticleSubscription = action({
  display: {
    label: "Delete Article Subscription",
    description: "Delete a subscription to an article in the Help Center.",
  },
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
  inputs: {
    zendeskConnection: connectionInput,
    subscriptionId: {
      ...subscriptionId,
      dataSource: "selectArticleSubscription",
    },
    articleId,
    locale: {
      ...locale,
      required: false,
      model: undefined,
      default: undefined,
      comments:
        "The locale of the article. If not provided, the default locale is used.",
    },
  },
  examplePayload: { data: null },
});
