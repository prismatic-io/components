import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listArticlesExamplePayload } from "../../examplePayloads";
import { listArticlesInputs } from "../../inputs";
import { listArticlesOutputSchema } from "../../outputSchemas";
import type { Article, PaginatedResponse } from "../../types";
import { paginateResults } from "../../util";
export const listArticles = action({
  display: {
    label: "List Articles",
    description: "List all articles in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, locale, pagination, filters, articleLabels, fetchAll },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = `/help_center/${locale}/articles`;
    if (fetchAll) {
      const articles: Article[] = [];
      return {
        data: {
          articles: await paginateResults<Article>(
            client,
            url,
            articles,
            "articles",
            100,
          ),
        },
      };
    }
    const { data } = await client.get<
      | PaginatedResponse<{
          articles: Article[];
        }>
      | {
          articles: Article[];
        }
    >(url, {
      params: {
        "page[size]": pagination.pageLimit,
        "page[after]": pagination.cursor,
        sort_by: filters.sortBy,
        sort_order: filters.sortOrder,
        label_names: articleLabels,
        start_time: filters.startTime,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (_context, { fetchAll }) =>
    fetchAll
      ? { data: { articles: listArticlesExamplePayload.data.articles } }
      : { data: listArticlesExamplePayload.data },
  inputs: listArticlesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listArticlesOutputSchema,
  }),
  examplePayload: listArticlesExamplePayload,
});
