import { cleanString } from "../util";
import {
  articleId,
  connectionInput,
  includeComments,
  locale,
  pagination,
  postId,
  sectionId,
  subscriptionId,
  topicId,
  userId,
} from "./common";
export const createArticleSubscriptionInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    model: undefined,
    default: undefined,
    comments:
      "The locale of the article. If not provided, the default locale is used.",
    clean: cleanString,
  },
  articleId,
  userId: {
    ...userId,
    comments:
      "The ID of the user to subscribe to the article. If none provided, the API assumes the current user.",
    required: false,
  },
};
export const createPostSubscriptionInputs = {
  zendeskConnection: connectionInput,
  postId,
  userId: {
    ...userId,
    comments:
      "The ID of the user to subscribe to the post. If none provided, the API assumes the current user.",
    required: false,
  },
};
export const createSectionSubscriptionInputs = {
  zendeskConnection: connectionInput,
  sectionId,
  userId: {
    ...userId,
    comments:
      "The ID of the user to subscribe to the section. If none provided, the API assumes the current user.",
    required: false,
  },
  locale: {
    ...locale,
    required: false,
    model: undefined,
    default: undefined,
    comments:
      "The locale of the section. If not provided, the default locale is used.",
    clean: cleanString,
  },
  includeComments,
};
export const createTopicSubscriptionInputs = {
  zendeskConnection: connectionInput,
  topicId,
  userId: {
    ...userId,
    comments:
      "The ID of the user to subscribe to the topic. If none provided, the API assumes the current user.",
    required: false,
  },
  includeComments,
};
export const deleteArticleSubscriptionInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    model: undefined,
    default: undefined,
    comments:
      "The locale of the article. If not provided, the default locale is used.",
    clean: cleanString,
  },
  articleId,
  subscriptionId: {
    ...subscriptionId,
    dataSource: "selectArticleSubscription",
  },
};
export const deletePostSubscriptionInputs = {
  zendeskConnection: connectionInput,
  postId,
  subscriptionId: { ...subscriptionId, dataSource: "selectPostSubscription" },
};
export const deleteSectionSubscriptionInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the section picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  sectionId,
  subscriptionId: {
    ...subscriptionId,
    dataSource: "selectSectionSubscription",
  },
};
export const deleteTopicSubscriptionInputs = {
  zendeskConnection: connectionInput,
  topicId,
  subscriptionId: {
    ...subscriptionId,
    dataSource: "selectTopicSubscription",
  },
};
export const getArticleSubscriptionInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    model: undefined,
    default: undefined,
    comments:
      "The locale of the article. If not provided, the default locale is used.",
    clean: cleanString,
  },
  articleId,
  subscriptionId: {
    ...subscriptionId,
    dataSource: "selectArticleSubscription",
  },
};
export const getPostSubscriptionInputs = {
  postId,
  subscriptionId: { ...subscriptionId, dataSource: "selectPostSubscription" },
  zendeskConnection: connectionInput,
};
export const getSectionSubscriptionInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the section picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  sectionId,
  subscriptionId: {
    ...subscriptionId,
    dataSource: "selectSectionSubscription",
  },
};
export const getTopicSubscriptionInputs = {
  zendeskConnection: connectionInput,
  topicId,
  subscriptionId: {
    ...subscriptionId,
    dataSource: "selectTopicSubscription",
  },
};
export const listArticleSubscriptionsInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the article picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  articleId,
  pagination,
};
export const listPostSubscriptionsInputs = {
  zendeskConnection: connectionInput,
  postId,
  pagination,
};
export const listSectionSubscriptionsInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the section picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  sectionId,
  pagination,
};
export const listTopicSubscriptionsInputs = {
  zendeskConnection: connectionInput,
  topicId,
  pagination,
};
