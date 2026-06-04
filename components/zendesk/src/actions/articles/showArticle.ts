import { action } from "@prismatic-io/spectral";
import { connectionInput, locale, articleId } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Article } from "../../types";
import { getArticlePayload } from "../../examplePayloads";

export const showArticle = action({
  display: {
    label: "Get Article",
    description: "Get an article from the Help Center.",
  },
  perform: async (context, { zendeskConnection, locale, articleId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{ article: Article }>(
      `/help_center/${locale}/articles/${articleId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale: {
      ...locale,
      comments: "The locale of the articles to retrieve. Defaults to 'en-us'.",
    },
    articleId,
  },
  examplePayload: {
    data: getArticlePayload,
  },
});
