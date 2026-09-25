import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const subscriptionSchema = {
  type: "object" as const,
  properties: {
    content_id: { type: "integer" },
    content_type: { type: "string" },
    created_at: { type: "string" },
    id: { type: "integer" },
    include_comments: { type: "boolean" },
    locale: { type: "string" },
    source_locale: { type: "string" },
    updated_at: { type: "string" },
    url: { type: "string" },
    user_id: { type: "integer" },
  },
  required: ["locale"],
};
export const createArticleSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const createPostSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const createSectionSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const createTopicSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const deleteArticleSubscriptionOutputSchema = {
  type: "string" as const,
};
export const deletePostSubscriptionOutputSchema = { type: "string" as const };
export const deleteSectionSubscriptionOutputSchema = { type: "null" as const };
export const deleteTopicSubscriptionOutputSchema = { type: "string" as const };
export const getArticleSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const getPostSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const getSectionSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const getTopicSubscriptionOutputSchema = {
  type: "object" as const,
  properties: { subscription: subscriptionSchema },
  required: ["subscription"],
};
export const listArticleSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    subscriptions: { type: "array", items: subscriptionSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["subscriptions"],
};
export const listPostSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    subscriptions: { type: "array", items: subscriptionSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["subscriptions"],
};
export const listSectionSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    subscriptions: { type: "array", items: subscriptionSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["subscriptions"],
};
export const listTopicSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    subscriptions: { type: "array", items: subscriptionSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["subscriptions"],
};
