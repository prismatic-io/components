import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { updateArticleExamplePayload } from "../../examplePayloads";
import { updateArticleInputs } from "../../inputs";
import { updateArticleOutputSchema } from "../../outputSchemas";
export const updateArticle = action({
  display: {
    label: "Update Article",
    description: "Update an existing article's metadata in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      zendeskConnection,
      locale,
      assignmentIds,
      displayOptions,
      articleBody,
      contentTagIds,
      articleTitle,
      labelNames,
      articleId,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.put(
      `/help_center/${locale}/articles/${articleId}`,
      {
        article: {
          user_segment_id: assignmentIds.userSegmentId,
          section_id: assignmentIds.sectionId,
          author_id: assignmentIds.authorId,
          body: articleBody,
          permission_group_id: assignmentIds.permissionGroupId,
          promoted: displayOptions.promoted,
          position: displayOptions.position,
          comments_disabled: displayOptions.commentsDisabled,
          label_names: labelNames,
          content_tag_ids: contentTagIds,
          title: articleTitle,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    {
      articleId,
      articleTitle,
      assignmentIds,
      contentTagIds,
      displayOptions,
      locale,
    },
  ) => ({
    data: {
      ...updateArticleExamplePayload.data,
      article: {
        ...updateArticleExamplePayload.data.article,
        ...(articleId ? { id: articleId } : {}),
        ...(articleTitle ? { title: articleTitle } : {}),
        ...(locale ? { locale } : {}),
        ...(assignmentIds.authorId
          ? { author_id: assignmentIds.authorId }
          : {}),
        ...(assignmentIds.permissionGroupId
          ? { permission_group_id: assignmentIds.permissionGroupId }
          : {}),
        ...(assignmentIds.userSegmentId
          ? { user_segment_id: assignmentIds.userSegmentId }
          : {}),
        ...(displayOptions.position
          ? { position: displayOptions.position }
          : {}),
        ...(displayOptions.promoted === undefined
          ? {}
          : { promoted: displayOptions.promoted }),
        ...(displayOptions.commentsDisabled === undefined
          ? {}
          : { comments_disabled: displayOptions.commentsDisabled }),
        ...(contentTagIds ? { content_tag_ids: contentTagIds } : {}),
      },
    },
  }),
  inputs: updateArticleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateArticleOutputSchema,
  }),
  examplePayload: updateArticleExamplePayload,
});
