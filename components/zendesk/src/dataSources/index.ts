import { dataSource, type Element } from "@prismatic-io/spectral";
import {
  articleId,
  connectionInput,
  locale,
  postId,
  sectionId,
  topicId,
} from "../inputs";
import { createClient, rawHttpClient } from "../auth";
import type {
  Article,
  Category,
  PermissionGroup,
  Post,
  Section,
  Subscription,
  Tag,
  Topic,
  UserSegment,
} from "../types";
import { paginateResults } from "../util";

export const listArticlesDataSource = dataSource({
  display: {
    label: "Select Articles",
    description: "Select an article from a dropdown menu.",
  },
  perform: async (context, { locale, zendeskConnection }) => {
    const nextUrl = `/help_center/${locale}/articles`;
    const results = [] as Article[];
    const client = rawHttpClient(zendeskConnection);
    const pageSize = 30;

    const paginatedResults = await paginateResults<Article>(
      client,
      nextUrl,
      results,
      "articles",
      pageSize,
    );

    return {
      result: paginatedResults.map((article) => ({
        label: article.title,
        key: article.id.toString(),
      })),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
  },
  dataSourceType: "picklist",
});

export const listSectionsDataSource = dataSource({
  display: {
    label: "Select Sections",
    description: "Select a section from a dropdown menu.",
  },
  perform: async (context, { zendeskConnection, locale }) => {
    const client = rawHttpClient(zendeskConnection);
    const results: Section[] = [];
    const nextUrl = `/help_center/${locale}/sections`;

    const paginatedResults = await paginateResults<Section>(
      client,
      nextUrl,
      results,
      "sections",
    );

    return {
      result: paginatedResults.map((section) => ({
        label: section.name,
        key: section.id.toString(),
      })),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
  },
  dataSourceType: "picklist",
});
export const listCategoriesDataSource = dataSource({
  display: {
    label: "Select Categories",
    description: "Select a category from a dropdown menu.",
  },
  perform: async (context, { zendeskConnection, locale }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Category[];
    const nextUrl = `/help_center/${locale}/categories`;
    const paginatedResults = await paginateResults<Category>(
      client,
      nextUrl,
      results,
      "categories",
    );

    return {
      result: paginatedResults.map((category) => ({
        label: category.name,
        key: category.id.toString(),
      })),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
  },
  dataSourceType: "picklist",
});

export const listTagsDataSource = dataSource({
  display: {
    label: "Select Tags",
    description: "Select a tag from a dropdown menu.",
  },
  perform: async (context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Tag[];
    const nextUrl = "/tags.json";
    const paginatedResults = await paginateResults<Tag>(
      client,
      nextUrl,
      results,
      "tags",
    );

    return {
      result: paginatedResults.map((tag) => ({
        label: tag.name,
        key: tag.name,
      })),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
});

export const listUserSegmentsDataSource = dataSource({
  display: {
    label: "Select User Segments",
    description: "Select a user segment from a dropdown menu.",
  },
  perform: async (context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as UserSegment[];
    const nextUrl = "/help_center/user_segments.json";
    const paginatedResults = await paginateResults<UserSegment>(
      client,
      nextUrl,
      results,
      "user_segments",
    );

    return {
      result: paginatedResults.map((usegment: UserSegment) => ({
        label: usegment.name,
        key: usegment.id.toString(),
      })),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
});

export const listPermissionGroupsDataSource = dataSource({
  display: {
    label: "Select Management Permission Groups",
    description: "Select a management permission group from a dropdown menu.",
  },
  perform: async (context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as PermissionGroup[];
    const nextUrl = "/guide/permission_groups.json";
    const paginatedResults = await paginateResults<PermissionGroup>(
      client,
      nextUrl,
      results,
      "permission_groups",
    );

    return {
      result: paginatedResults.map((pgroup: PermissionGroup) => ({
        label: pgroup.name,
        key: pgroup.id.toString(),
      })),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
});

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from your Zendesk account.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = createClient({
      zendeskConnection,
    });

    const result = await client.users.list();

    return {
      result: result
        .map<Element>((user) => ({
          label: user.name,
          key: user.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "John Doe", key: "488042375842" }],
  },
});

export const selectTicket = dataSource({
  display: {
    label: "Select Ticket",
    description: "Select a ticket from your Zendesk account.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = createClient({
      zendeskConnection,
    });

    const result = await client.tickets.list();

    return {
      result: result
        .map<Element>((ticket) => ({
          label: `${ticket.id} - ${ticket.subject}`,
          key: ticket.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "12345 - Example Ticket Subject", key: "12345" }],
  },
});

export const selectTopic = dataSource({
  display: {
    label: "Select Topic",
    description: "Select a topic from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Topic[];

    const paginatedResults = await paginateResults<Topic>(
      client,
      "/community/topics",
      results,
      "topics",
    );

    return {
      result: paginatedResults
        .map<Element>((topic) => ({
          label: topic.name,
          key: topic.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Topic", key: "12" }],
  },
});

export const selectPost = dataSource({
  display: {
    label: "Select Post",
    description: "Select a post from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Post[];

    const paginatedResults = await paginateResults<Post>(
      client,
      "/community/posts",
      results,
      "posts",
    );

    return {
      result: paginatedResults
        .map<Element>((post) => ({
          label: post.title,
          key: post.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Post Title", key: "12" }],
  },
});

export const selectTopicSubscription = dataSource({
  display: {
    label: "Select Topic Subscription",
    description:
      "Select a subscription for a topic in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, topicId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];

    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/community/topics/${topicId}/subscriptions`,
      results,
      "subscriptions",
    );

    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "topic"})`,
          key: sub.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId: { ...topicId, dataSource: undefined },
  },
  dataSourceType: "picklist",
});

export const selectArticleSubscription = dataSource({
  display: {
    label: "Select Article Subscription",
    description:
      "Select a subscription for an article in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, articleId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];

    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/community/articles/${articleId}/subscriptions`,
      results,
      "subscriptions",
    );

    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "article"})`,
          key: sub.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleId: { ...articleId, dataSource: undefined },
  },
  dataSourceType: "picklist",
});

export const selectSectionSubscription = dataSource({
  display: {
    label: "Select Section Subscription",
    description:
      "Select a subscription for a section in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, sectionId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];

    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/help_center/sections/${sectionId}/subscriptions`,
      results,
      "subscriptions",
    );

    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "section"})`,
          key: sub.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    sectionId: { ...sectionId, dataSource: undefined },
  },
  dataSourceType: "picklist",
});

export const selectPostSubscription = dataSource({
  display: {
    label: "Select Post Subscription",
    description: "Select a subscription for a post in the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, postId }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Subscription[];

    const paginatedResults = await paginateResults<Subscription>(
      client,
      `/community/posts/${postId}/subscriptions`,
      results,
      "subscriptions",
    );

    return {
      result: paginatedResults
        .map<Element>((sub) => ({
          label: `${sub.id} (${sub.content_type || "post"})`,
          key: sub.id.toString(),
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId: { ...postId, dataSource: undefined },
  },
  dataSourceType: "picklist",
});

export default {
  listArticlesDataSource,
  listSectionsDataSource,
  listCategoriesDataSource,
  listTagsDataSource,
  listUserSegmentsDataSource,
  listPermissionGroupsDataSource,
  selectArticleSubscription,
  selectPost,
  selectPostSubscription,
  selectSectionSubscription,
  selectTicket,
  selectTopic,
  selectTopicSubscription,
  selectUser,
};
