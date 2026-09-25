import {
  articleId,
  connectionInput,
  locale,
  postId,
  sectionId,
  topicId,
} from "./common";
export const listArticlesDataSourceInputs = {
  zendeskConnection: connectionInput,
  locale,
};
export const listCategoriesDataSourceInputs = {
  zendeskConnection: connectionInput,
  locale,
};
export const listPermissionGroupsDataSourceInputs = {
  zendeskConnection: connectionInput,
};
export const listSectionsDataSourceInputs = {
  zendeskConnection: connectionInput,
  locale,
};
export const listTagsDataSourceInputs = {
  zendeskConnection: connectionInput,
};
export const listUserSegmentsDataSourceInputs = {
  zendeskConnection: connectionInput,
};
export const selectArticleSubscriptionInputs = {
  zendeskConnection: connectionInput,
  articleId: { ...articleId, dataSource: undefined },
};
export const selectPostInputs = {
  zendeskConnection: connectionInput,
};
export const selectPostSubscriptionInputs = {
  zendeskConnection: connectionInput,
  postId: { ...postId, dataSource: undefined },
};
export const selectSectionSubscriptionInputs = {
  zendeskConnection: connectionInput,
  sectionId: { ...sectionId, dataSource: undefined },
};
export const selectTicketInputs = {
  zendeskConnection: connectionInput,
};
export const selectTopicInputs = {
  zendeskConnection: connectionInput,
};
export const selectTopicSubscriptionInputs = {
  zendeskConnection: connectionInput,
  topicId: { ...topicId, dataSource: undefined },
};
export const selectUserInputs = {
  zendeskConnection: connectionInput,
};
