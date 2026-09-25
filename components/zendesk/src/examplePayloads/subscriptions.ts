import type {
  PaginatedResponse,
  Subscription,
  SubscriptionResponse,
} from "../types";
import { paginationAttributes } from "./general";
const subscriptionRaw = {
  subscription: {
    content_id: 8748733,
    id: 35467,
    locale: "en",
    user_id: 888887,
  },
};
const paginatedSubscriptionRaw = {
  ...paginationAttributes,
  subscriptions: [subscriptionRaw.subscription],
};
export const createArticleSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = {
  data: subscriptionRaw,
};
export const createPostSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = { data: subscriptionRaw };
export const createSectionSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = {
  data: subscriptionRaw,
};
export const createTopicSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = { data: subscriptionRaw };
export const deleteArticleSubscriptionExamplePayload = { data: "" };
export const deletePostSubscriptionExamplePayload = { data: "" };
export const deleteSectionSubscriptionExamplePayload = { data: null };
export const deleteTopicSubscriptionExamplePayload = { data: "" };
export const getArticleSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = { data: subscriptionRaw };
export const getPostSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = { data: subscriptionRaw };
export const getSectionSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = { data: subscriptionRaw };
export const getTopicSubscriptionExamplePayload: {
  data: SubscriptionResponse;
} = { data: subscriptionRaw };
export const listArticleSubscriptionsExamplePayload: {
  data:
    | PaginatedResponse<{
        subscriptions: Subscription[];
      }>
    | {
        subscriptions: Subscription[];
      };
} = { data: paginatedSubscriptionRaw };
export const listPostSubscriptionsExamplePayload: {
  data:
    | PaginatedResponse<{
        subscriptions: Subscription[];
      }>
    | {
        subscriptions: Subscription[];
      };
} = { data: paginatedSubscriptionRaw };
export const listSectionSubscriptionsExamplePayload: {
  data:
    | PaginatedResponse<{
        subscriptions: Subscription[];
      }>
    | {
        subscriptions: Subscription[];
      };
} = { data: paginatedSubscriptionRaw };
export const listTopicSubscriptionsExamplePayload: {
  data:
    | PaginatedResponse<{
        subscriptions: Subscription[];
      }>
    | {
        subscriptions: Subscription[];
      };
} = { data: paginatedSubscriptionRaw };
