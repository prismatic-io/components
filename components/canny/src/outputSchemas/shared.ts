export const idOnlySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};
export const successStringSchema = {
  type: "string" as const,
};
export const boardSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    created: { type: "string", format: "date-time" },
    isPrivate: { type: "boolean" },
    name: { type: "string" },
    postCount: { type: "number" },
    privateComments: { type: "boolean" },
    url: { type: "string" },
  },
  required: [
    "id",
    "created",
    "isPrivate",
    "name",
    "postCount",
    "privateComments",
    "url",
  ],
};
export const boardListItemSchema = {
  type: "object" as const,
  properties: {
    ...boardSchema.properties,
    token: { type: "string", format: "uuid" },
  },
  required: boardSchema.required,
};
export const nestedBoardSchema = {
  type: "object" as const,
  properties: boardSchema.properties,
  required: ["id"],
};
export const categoryBoardSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    created: { type: "string", format: "date-time" },
    name: { type: "string" },
    postCount: { type: "number" },
    url: { type: "string" },
  },
  required: ["id"],
};
export const categorySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    board: categoryBoardSchema,
    created: { type: "string", format: "date-time" },
    name: { type: "string" },
    parentID: { type: ["string", "null"] },
    postCount: { type: "number" },
    url: { type: "string" },
  },
  required: ["id", "board", "created", "name", "parentID", "postCount", "url"],
};
export const reducedCategorySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    parentID: { type: ["string", "null"] },
    postCount: { type: "number" },
    url: { type: "string" },
  },
  required: ["id"],
};
export const nullableReducedCategorySchema = {
  type: ["object", "null"],
  properties: reducedCategorySchema.properties,
  required: reducedCategorySchema.required,
};
export const tagSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    board: nestedBoardSchema,
    created: { type: "string", format: "date-time" },
    name: { type: "string" },
    postCount: { type: "number" },
    url: { type: "string" },
  },
  required: ["id", "board", "created", "name", "postCount", "url"],
};
export const reducedTagSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    postCount: { type: "number" },
    url: { type: "string" },
  },
  required: ["id"],
};
export const userSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    alias: { type: ["string", "null"] },
    avatarURL: { type: ["string", "null"] },
    companies: { type: "array", items: { type: "object" } },
    created: { type: "string", format: "date-time" },
    customFields: { type: ["object", "null"], additionalProperties: true },
    email: { type: ["string", "null"], format: "email" },
    isAdmin: { type: "boolean" },
    lastActivity: { type: ["string", "null"] },
    name: { type: "string" },
    url: { type: "string" },
    userID: { type: ["string", "null"] },
  },
  required: [
    "id",
    "alias",
    "avatarURL",
    "companies",
    "created",
    "customFields",
    "email",
    "isAdmin",
    "lastActivity",
    "name",
    "url",
    "userID",
  ],
};
export const nestedUserSchema = {
  type: "object" as const,
  properties: userSchema.properties,
  required: ["id"],
};
export const nullableNestedUserSchema = {
  type: ["object", "null"],
  properties: userSchema.properties,
  required: ["id"],
};
export const companySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    created: { type: "string", format: "date-time" },
    customFields: { type: "object", additionalProperties: true },
    domain: { type: ["string", "null"] },
    memberCount: { type: "number" },
    monthlySpend: { type: ["number", "null"] },
    name: { type: "string" },
  },
  required: [
    "id",
    "created",
    "customFields",
    "domain",
    "memberCount",
    "monthlySpend",
    "name",
  ],
};
export const changeCommentSchema = {
  type: ["object", "null"],
  properties: {
    imageURLs: { type: "array", items: { type: "string" } },
    value: { type: "string" },
  },
};
export const postSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    author: nullableNestedUserSchema,
    board: nestedBoardSchema,
    by: nullableNestedUserSchema,
    category: nullableReducedCategorySchema,
    changeComment: changeCommentSchema,
    clickup: {
      type: "object",
      properties: {
        linkedTasks: { type: "array", items: { type: "object" } },
      },
    },
    commentCount: { type: "number" },
    created: { type: "string", format: "date-time" },
    customFields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          value: {},
        },
        required: ["id", "name", "value"],
      },
    },
    details: { type: "string" },
    eta: { type: ["string", "null"] },
    imageURLs: { type: "array", items: { type: "string" } },
    jira: {
      type: "object",
      properties: {
        linkedIssues: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              key: { type: "string" },
              url: { type: "string" },
            },
            required: ["id", "key", "url"],
          },
        },
      },
    },
    linear: {
      type: "object",
      properties: {
        linkedIssueIDs: { type: "array", items: { type: "string" } },
      },
    },
    mergeHistory: {
      type: "array",
      items: {
        type: "object",
        properties: {
          created: { type: "string", format: "date-time" },
          post: {
            type: "object",
            properties: {
              created: { type: "string", format: "date-time" },
              details: { type: "string" },
              id: { type: "string" },
              imageURLs: { type: "array", items: { type: "string" } },
              title: { type: "string" },
            },
            required: ["id"],
          },
        },
        required: ["created", "post"],
      },
    },
    owner: nullableNestedUserSchema,
    roadmaps: { type: "array", items: { type: "object" } },
    score: { type: "number" },
    status: { type: "string" },
    statusChangedAt: { type: "string" },
    tags: { type: "array", items: reducedTagSchema },
    title: { type: "string" },
    url: { type: "string" },
  },
  required: [
    "id",
    "author",
    "board",
    "by",
    "category",
    "commentCount",
    "created",
    "customFields",
    "details",
    "eta",
    "imageURLs",
    "owner",
    "roadmaps",
    "score",
    "status",
    "statusChangedAt",
    "tags",
    "title",
    "url",
  ],
};
export const reducedPostSchema = {
  type: "object" as const,
  properties: {
    id: postSchema.properties.id,
    category: postSchema.properties.category,
    commentCount: postSchema.properties.commentCount,
    eta: postSchema.properties.eta,
    imageURLs: postSchema.properties.imageURLs,
    jira: postSchema.properties.jira,
    linear: postSchema.properties.linear,
    score: postSchema.properties.score,
    status: postSchema.properties.status,
    tags: postSchema.properties.tags,
    title: postSchema.properties.title,
    url: postSchema.properties.url,
  },
  required: ["id"],
};
export const commentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    author: nestedUserSchema,
    board: nestedBoardSchema,
    created: { type: "string", format: "date-time" },
    imageURLs: { type: "array", items: { type: "string" } },
    internal: { type: "boolean" },
    likeCount: { type: "number" },
    mentions: { type: "array", items: nestedUserSchema },
    parentID: { type: ["string", "null"] },
    post: reducedPostSchema,
    private: { type: "boolean" },
    reactions: { type: ["object", "null"], additionalProperties: true },
    status: { type: ["string", "null"] },
    value: { type: "string" },
  },
  required: [
    "id",
    "author",
    "board",
    "created",
    "imageURLs",
    "internal",
    "likeCount",
    "mentions",
    "parentID",
    "post",
    "private",
    "reactions",
    "status",
    "value",
  ],
};
export const voteSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    board: nestedBoardSchema,
    by: nullableNestedUserSchema,
    created: { type: "string", format: "date-time" },
    post: reducedPostSchema,
    voter: nestedUserSchema,
    votePriority: {
      type: "string",
      enum: ["Nice to have", "Important", "Must have", "No priority"],
    },
    zendeskTicket: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" },
        created: { type: "string", format: "date-time" },
        subject: { type: "string" },
        description: { type: "string" },
        url: { type: "string" },
      },
    },
  },
  required: [
    "id",
    "board",
    "by",
    "created",
    "post",
    "voter",
    "votePriority",
    "zendeskTicket",
  ],
};
export const statusChangeSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    changeComment: changeCommentSchema,
    changer: nullableNestedUserSchema,
    created: { type: "string", format: "date-time" },
    post: reducedPostSchema,
    status: { type: "string" },
  },
  required: ["id", "changeComment", "changer", "created", "post", "status"],
};
export const entrySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    created: { type: "string", format: "date-time" },
    labels: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          created: { type: "string", format: "date-time" },
          entryCount: { type: "number" },
          name: { type: "string" },
          url: { type: "string" },
        },
        required: ["id"],
      },
    },
    lastSaved: { type: "string", format: "date-time" },
    markdownDetails: { type: "string" },
    plaintextDetails: { type: "string" },
    posts: { type: "array", items: reducedPostSchema },
    publishedAt: { type: ["string", "null"] },
    scheduledFor: { type: ["string", "null"] },
    reactions: { type: ["object", "null"], additionalProperties: true },
    status: { type: "string", enum: ["draft", "scheduled", "published"] },
    title: { type: "string" },
    types: {
      type: "array",
      items: { type: "string", enum: ["new", "improved", "fixed"] },
    },
    url: { type: "string" },
  },
  required: [
    "id",
    "created",
    "labels",
    "lastSaved",
    "markdownDetails",
    "plaintextDetails",
    "posts",
    "publishedAt",
    "scheduledFor",
    "reactions",
    "status",
    "title",
    "types",
    "url",
  ],
};
