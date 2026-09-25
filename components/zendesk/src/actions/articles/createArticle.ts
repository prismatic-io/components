import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createArticleExamplePayload } from "../../examplePayloads";
import { createArticleInputs } from "../../inputs";
import { createArticleOutputSchema } from "../../outputSchemas";
export const createArticle = action({
  display: {
    label: "Create Article",
    description: "Create a new article in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      isDraft,
      locale,
      sectionId,
      userSegmentId,
      permissionGroupId,
      zendeskConnection,
      notifySubscribers,
      articleBody,
      articleTitle,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.post(
      `/help_center/${locale}/sections/${sectionId}/articles`,
      {
        article: {
          body: articleBody,
          title: articleTitle,
          permission_group_id: permissionGroupId,
          user_segment_id: userSegmentId,
          draft: isDraft,
        },
        notify_subscribers: notifySubscribers,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { articleTitle, locale, permissionGroupId, userSegmentId },
  ) => ({
    data: {
      ...createArticleExamplePayload.data,
      article: {
        ...createArticleExamplePayload.data.article,
        ...(articleTitle ? { title: articleTitle } : {}),
        ...(locale ? { locale } : {}),
        ...(permissionGroupId
          ? { permission_group_id: permissionGroupId }
          : {}),
        ...(userSegmentId ? { user_segment_id: userSegmentId } : {}),
      },
    },
  }),
  inputs: createArticleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createArticleOutputSchema,
  }),
  examplePayload: createArticleExamplePayload,
});
