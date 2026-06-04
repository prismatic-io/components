import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  locale,
  pageLimit,
  cursor,
  sortBy,
  sortOrder,
  articleLabels,
  startTime,
  fetchAll,
} from "../../inputs";
import { articleSortByOptions } from "../../constants";
import { rawHttpClient } from "../../auth";
import type { Article, PaginatedResponse } from "../../types";
import { listArticlesPayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listArticles = action({
  display: {
    label: "List Articles",
    description: "List all articles in the Help Center.",
  },
  perform: async (
    context,
    {
      zendeskConnection,
      locale,
      pageLimit,
      cursor,
      sortBy,
      sortOrder,
      articleLabels,
      startTime,
      fetchAll,
    },
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
      PaginatedResponse<{ articles: Article[] }> | { articles: Article[] }
    >(url, {
      params: {
        "page[size]": pageLimit || undefined,
        "page[after]": cursor || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
        articleLabels: articleLabels || undefined,
        startTime: startTime || undefined,
      },
    });

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
    cursor,
    pageLimit,
    sortBy: {
      ...sortBy,
      comments: "The field to sort the articles by.",
      model: articleSortByOptions,
    },
    sortOrder,
    articleLabels,
    startTime: {
      ...startTime,
      comments: "The start time to filter articles by.",
    },
    fetchAll,
  },
  examplePayload: {
    data: listArticlesPayload,
  },
});
