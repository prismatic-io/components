import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import {
  body,
  connectionInput,
  isDraft,
  locale,
  notifySubscribers,
  permissionGroupId,
  sectionId,
  title,
  userSegmentId,
} from "../../inputs";
import { createArticlePayload } from "../../examplePayloads";

export const createArticle = action({
  display: {
    label: "Create Article",
    description: "Create a new article in the Help Center.",
  },
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
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    sectionId,
    articleTitle: {
      ...title,
      required: true,
    },
    userSegmentId,
    permissionGroupId,
    articleBody: {
      ...body,
    },
    isDraft,
    notifySubscribers,
  },
  examplePayload: {
    data: createArticlePayload,
  },
});
