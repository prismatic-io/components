import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listArticleAttachmentsExamplePayload } from "../../examplePayloads";
import { listArticleAttachmentsInputs } from "../../inputs";
import { listArticleAttachmentsOutputSchema } from "../../outputSchemas";
import type {
  ArticleAttachment,
  ArticleAttachments,
  PaginatedResponse,
} from "../../types";
import { paginateResults } from "../../util";
export const listArticleAttachments = action({
  display: {
    label: "List Article Attachments",
    description: "List all attachments for an article in the Help Center.",
  },
  performSafety: "notAllowed",
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
            pageLimit,
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
  examplePerform: async (_context, { fetchAll }) =>
    fetchAll
      ? {
          data: {
            article_attachments:
              listArticleAttachmentsExamplePayload.data.article_attachments,
          },
        }
      : { data: listArticleAttachmentsExamplePayload.data },
  inputs: listArticleAttachmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listArticleAttachmentsOutputSchema,
  }),
  examplePayload: listArticleAttachmentsExamplePayload,
});
