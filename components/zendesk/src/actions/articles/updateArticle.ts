import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import {
  articleId,
  authorId,
  body,
  commentsDisabled,
  connectionInput,
  contentTagIds,
  labelNames,
  locale,
  permissionGroupId,
  position,
  promoted,
  sectionId,
  title,
  userSegmentId,
} from "../../inputs";
import { updateArticlePayload } from "../../examplePayloads";
import { convertBooleanInputIntoUpdateInput } from "../../util";

export const updateArticle = action({
  display: {
    label: "Update Article",
    description: "Update an existing article's metadata in the Help Center.",
  },
  perform: async (
    context,
    {
      zendeskConnection,
      locale,
      promoted,
      articleBody,
      permissionGroupId,
      commentsDisabled,
      contentTagIds,
      sectionId,
      authorId,
      articleTitle,
      userSegmentId,
      labelNames,
      position,
      articleId,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.put(
      `/help_center/${locale}/articles/${articleId}`,
      {
        article: {
          user_segment_id: userSegmentId || undefined,
          section_id: sectionId || undefined,
          author_id: authorId || undefined,
          body: articleBody || undefined,
          permission_group_id: permissionGroupId || undefined,
          promoted: promoted,
          position: position || undefined,
          comments_disabled: commentsDisabled,
          label_names: labelNames.length ? labelNames : undefined,
          content_tag_ids: contentTagIds.length ? contentTagIds : undefined,
          title: articleTitle || undefined,
        },
      },
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleId,
    sectionId: {
      ...sectionId,
      required: false,
    },
    authorId,
    articleTitle: {
      ...title,
    },
    articleBody: {
      ...body,
    },
    permissionGroupId: {
      ...permissionGroupId,
      required: false,
    },
    userSegmentId: {
      ...userSegmentId,
      required: false,
    },
    locale: {
      ...locale,
      required: false,
    },
    promoted: convertBooleanInputIntoUpdateInput(promoted),
    position,
    commentsDisabled: convertBooleanInputIntoUpdateInput(commentsDisabled),
    contentTagIds,
    labelNames,
  },
  examplePayload: {
    data: updateArticlePayload,
  },
});
