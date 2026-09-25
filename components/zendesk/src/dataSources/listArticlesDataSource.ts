import { dataSource, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { listArticlesDataSourceExamplePayload } from "../examplePayloads";
import { listArticlesDataSourceInputs } from "../inputs";
import type { Article } from "../types";
import { paginateResults } from "../util";
export const listArticlesDataSource = dataSource({
  display: {
    label: "Select Articles",
    description: "Select an article from the Zendesk Help Center.",
  },
  perform: async (_context, { locale, zendeskConnection }) => {
    const nextUrl = `/help_center/${locale}/articles`;
    const results = [] as Article[];
    const client = rawHttpClient(zendeskConnection);
    const paginatedResults = await paginateResults<Article>(
      client,
      nextUrl,
      results,
      "articles",
    );
    return {
      result: paginatedResults.map((article) => ({
        label: article.title,
        key: util.types.toString(article.id),
      })),
    };
  },
  inputs: listArticlesDataSourceInputs,
  dataSourceType: "picklist",
  examplePayload: listArticlesDataSourceExamplePayload,
});
