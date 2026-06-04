import { action } from "@prismatic-io/spectral";
import { connectionInput, articleId, fetchAll, pageLimit } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type {
  ArticleAttachment,
  ArticleAttachments,
  PaginatedResponse,
} from "../../types";
import { listArticleAttachmentsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listArticleAttachments = action({
  display: {
    label: "List Article Attachments",
    description: "List all attachments for an article in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, articleId, fetchAll, pageLimit },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = `/help_center/articles/${articleId}/attachments`;
    if (fetchAll) {
      const results: ArticleAttachment[] = [];
      return {
        data: {
          article_attachments: await paginateResults<ArticleAttachment>(
            client,
            url,
            results,
            "article_attachments",
            pageLimit || undefined,
          ),
        },
      };
    }

    const { data } = await client.get<
      PaginatedResponse<ArticleAttachments> | ArticleAttachments
    >(url);

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleId,
    pageLimit,
    fetchAll,
  },
  examplePayload: { data: listArticleAttachmentsExamplePayload },
});
