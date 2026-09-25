import { action, outputSchema } from "@prismatic-io/spectral";
import { showArticleInputs } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { showArticleOutputSchema } from "../../outputSchemas";
import type { Article } from "../../types";
import { showArticleExamplePayload } from "../../examplePayloads";
export const showArticle = action({
  display: {
    label: "Get Article",
    description: "Get an article from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, locale, articleId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{
      article: Article;
    }>(`/help_center/${locale}/articles/${articleId}`);
    return {
      data,
    };
  },
  inputs: showArticleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: showArticleOutputSchema,
  }),
  examplePayload: showArticleExamplePayload,
});
