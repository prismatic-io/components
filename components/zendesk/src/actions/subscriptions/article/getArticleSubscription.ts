import { action } from "@prismatic-io/spectral";
import {
  articleId,
  connectionInput,
  subscriptionId,
  locale,
} from "../../../inputs";
import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import { subscriptionPayload } from "../../../examplePayloads";

export const getArticleSubscription = action({
  display: {
    label: "Get Article Subscription",
    description: "Get an article subscription from the Help Center.",
  },
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
  examplePayload: { data: subscriptionPayload },
});
