//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/articleAttachments.d.ts
interface ArticleAttachments {
  article_attachments: ArticleAttachment[];
}
interface ArticleAttachment {
  article_id: number;
  content_type: string;
  content_url: string;
  file_name: string;
  id: number;
  inline: boolean;
  size: number;
}
//#endregion
//#region src/types/articles.d.ts
interface Article {
  author_id: number;
  body: string;
  comments_disabled: boolean;
  content_tag_ids?: number[];
  created_at: string;
  draft: boolean;
  edited_at: string;
  html_url?: string;
  id: number;
  label_names?: string[];
  locale: string;
  outdated_locales?: string[];
  permission_group_id?: number;
  position?: number;
  promoted: boolean;
  section_id?: number;
  source_locale: string;
  title: string;
  updated_at: string;
  url: string;
  user_segment_id?: number;
  vote_count?: number;
  vote_sum?: number;
}
//#endregion
//#region src/types/categories.d.ts
interface Category {
  description: string;
  id: number;
  locale: string;
  name: string;
}
//#endregion
//#region src/types/pagination.d.ts
interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
interface Meta {
  has_more: boolean;
  after_cursor: string;
  before_cursor: string;
}
type PaginatedResponse<T> = Record<string, T[]> & {
  meta: Meta;
} & {
  links: Links;
};
//#endregion
//#region src/types/posts.d.ts
interface Post {
  author_id?: number;
  closed?: boolean;
  comment_count?: number;
  content_tag_ids?: number[];
  created_at?: string;
  details?: string;
  featured?: boolean;
  follower_count?: number;
  html_url?: string;
  id: number;
  non_author_editor_id?: number;
  non_author_updated_at?: string;
  pinned?: boolean;
  status?: string;
  title: string;
  topic_id?: number;
  updated_at?: string;
  url?: string;
  vote_count?: number;
  vote_sum?: number;
}
//#endregion
//#region src/types/sections.d.ts
interface Section {
  id: number;
  description: string;
  locale: string;
  name: string;
  position?: number;
  category_id?: number;
}
//#endregion
//#region src/types/subscriptions.d.ts
interface Subscription {
  content_id?: number;
  content_type?: string;
  created_at?: string;
  id: number;
  locale: string;
  updated_at?: string;
  user_id?: number;
  include_comments?: boolean;
  source_locale?: string;
  url?: string;
}
interface SubscriptionResponse {
  subscription: Subscription;
}
//#endregion
//#region src/types/topics.d.ts
interface Topic {
  id: number;
  manageable_by?: string;
  position?: number;
  user_segment_id?: number;
  description?: string;
  name: string;
  html_url?: string;
  url?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "zendesk";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/zendesk/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      callbackUrl: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      allowDuplicates: {
        comments: string;
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showOnlyInstanceWebhooks: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createWebhookTrigger: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      title: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messageBody: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      conditions: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      allowDuplicates: {
        comments: string;
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTriggers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listArticleSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<{
        subscriptions: Subscription[];
      }> | {
        subscriptions: Subscription[];
      };
    }>;
    getArticleSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        model: undefined;
        default: undefined;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SubscriptionResponse;
    }>;
    createArticleSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        model: undefined;
        default: undefined;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      userId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscription: {
          locale: string;
          user_id?: number;
          content_id?: string | number | undefined;
          content_type?: string;
          created_at?: string;
          id: number;
          updated_at?: string;
          include_comments?: boolean;
          source_locale?: string;
          url?: string;
        };
      };
    }>;
    deleteArticleSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        model: undefined;
        default: undefined;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSectionSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<{
        subscriptions: Subscription[];
      }> | {
        subscriptions: Subscription[];
      };
    }>;
    getSectionSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SubscriptionResponse;
    }>;
    createSectionSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      userId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      locale: {
        required: boolean;
        model: undefined;
        default: undefined;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
      };
      includeComments: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscription: {
          locale: string;
          user_id?: number;
          content_id?: number;
          content_type?: string;
          created_at?: string;
          id: number;
          updated_at?: string;
          include_comments?: boolean;
          source_locale?: string;
          url?: string;
        };
      };
    }>;
    deleteSectionSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    listPostSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<{
        subscriptions: Subscription[];
      }> | {
        subscriptions: Subscription[];
      };
    }>;
    createPostSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      userId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscription: {
          user_id?: number;
          content_id?: number;
          content_type?: string;
          created_at?: string;
          id: number;
          locale: string;
          updated_at?: string;
          include_comments?: boolean;
          source_locale?: string;
          url?: string;
        };
      };
    }>;
    deletePostSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPostSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SubscriptionResponse;
    }>;
    createTopicSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      userId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      includeComments: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscription: {
          user_id?: number;
          content_id?: number;
          content_type?: string;
          created_at?: string;
          id: number;
          locale: string;
          updated_at?: string;
          include_comments?: boolean;
          source_locale?: string;
          url?: string;
        };
      };
    }>;
    getTopicSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SubscriptionResponse;
    }>;
    listTopicSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<{
        subscriptions: Subscription[];
      }> | {
        subscriptions: Subscription[];
      };
    }>;
    deleteTopicSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      subscriptionId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPost: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      postTitle: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      postDetails: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      isPostFeatured: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isPostPinned: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      postStatus: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      notifySubscribers: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      contentTagIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deletePost: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPost: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        post: Post;
      };
    }>;
    listPosts: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterBy: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicId: {
        required: boolean;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
      sortBy: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updatePost: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      postTitle: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      postDetails: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      postStatus: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      topicId: {
        required: boolean;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
      moderationFlags: {
        label: string;
        comments: string;
        inputs: {
          isPostFeatured: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
          isPostPinned: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
          isPostClosed: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contentTagIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        post: {
          content_tag_ids?: string[] | number[] | undefined;
          featured?: boolean;
          title: string;
          id: number;
          author_id?: number;
          closed?: boolean;
          comment_count?: number;
          created_at?: string;
          details?: string;
          follower_count?: number;
          html_url?: string;
          non_author_editor_id?: number;
          non_author_updated_at?: string;
          pinned?: boolean;
          status?: string;
          topic_id?: number;
          updated_at?: string;
          url?: string;
          vote_count?: number;
          vote_sum?: number;
        };
      };
    }>;
    createTopic: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicDescription: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        topic: {
          description?: string;
          name: string;
          id: number;
          manageable_by?: string;
          position?: number;
          user_segment_id?: number;
          html_url?: string;
          url?: string;
        };
      };
    }>;
    deleteTopic: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTopic: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      topicName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userSegmentId: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      position: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      topicDescription: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      manageableBy: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        topic: {
          description?: string;
          name: string;
          id: number;
          manageable_by?: string;
          position?: number;
          user_segment_id?: number;
          html_url?: string;
          url?: string;
        };
      };
    }>;
    getTopic: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        topic: Topic;
      };
    }>;
    listTopics: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createSection: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      sectionName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sectionDescription: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      position: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        section: {
          position?: number;
          locale: string;
          description: string;
          name: string;
          id: number;
          category_id?: number;
        };
      };
    }>;
    getSection: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        section: Section;
      };
    }>;
    listSections: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      filters: {
        label: string;
        comments: string;
        inputs: {
          categoryId: {
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            dataSource: string;
          };
          sortBy: {
            model: {
              label: string;
              value: string;
            }[];
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            required: false;
            example: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateSection: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      sectionName: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      sectionDescription: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      position: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      categoryId: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      parentSectionId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        section: {
          position?: number;
          locale: string;
          description: string;
          name: string;
          id: number;
          category_id?: number;
        };
      };
    }>;
    deleteSection: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    unifiedSearch: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchQuery: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locales: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      brandIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      categoryIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      contentTypes: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      externalSourceIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      sectionIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      topicIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchArticles: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchQuery: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterLocale: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      brandIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      categoryIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      filters: {
        label: string;
        comments: string;
        inputs: {
          filterSectionId: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          shouldFilterMultibrand: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          sortBy: {
            model: {
              label: string;
              value: string;
            }[];
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            required: false;
            example: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      dateRangeFilters: {
        label: string;
        comments: string;
        inputs: {
          filterCreatedAt: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterCreatedAfter: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterCreatedBefore: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterUpdatedAt: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterUpdatedAfter: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterUpdatedBefore: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      filterLabelNames: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchPosts: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchQuery: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filters: {
        label: string;
        comments: string;
        inputs: {
          topicId: {
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            dataSource: string;
          };
          sortBy: {
            model: {
              label: string;
              value: string;
            }[];
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            required: false;
            example: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      dateRangeFilters: {
        label: string;
        comments: string;
        inputs: {
          filterCreatedAt: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterCreatedAfter: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterCreatedBefore: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterUpdatedAt: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterUpdatedAfter: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          filterUpdatedBefore: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listArticleAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ArticleAttachments | PaginatedResponse<ArticleAttachments>;
    }>;
    getArticleAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      articleAttachmentId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        article_attachment: ArticleAttachment;
      };
    }>;
    createArticleAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      file: {
        comments: string;
        required: boolean;
        label: string;
        type: "data";
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload | undefined;
      };
      fileName: {
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      inline: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        article_attachment: {
          inline: boolean;
          file_name: string;
          article_id: string | number;
          content_type: string;
          content_url: string;
          id: number;
          size: number;
        };
      };
    }>;
    deleteArticleAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      articleAttachmentId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCategory: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      categoryName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      categoryDescription: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      position: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        category: {
          locale: string;
          description: string;
          name: string;
          id: number;
        };
      };
    }>;
    deleteCategory: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      categoryId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCategory: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        category: Category;
      };
    }>;
    listCategories: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      sortBy: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      sortOrder: {
        label: string;
        type: "string";
        required: false;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<{
        categories: Category[];
      }> | {
        categories: Category[];
      };
    }>;
    updateCategory: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      categoryId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      categoryName: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      categoryDescription: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      position: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        category: {
          locale: string;
          description: string;
          name: string;
          id: number;
        };
      };
    }>;
    listArticles: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      filters: {
        label: string;
        comments: string;
        inputs: {
          sortBy: {
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            required: false;
            example: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          startTime: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      articleLabels: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<{
        articles: Article[];
      }> | {
        articles: Article[];
      };
    }>;
    showArticle: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        article: Article;
      };
    }>;
    createArticle: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      articleTitle: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      userSegmentId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      permissionGroupId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      articleBody: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      isDraft: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      notifySubscribers: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateArticle: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      assignmentIds: {
        label: string;
        comments: string;
        inputs: {
          sectionId: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            dataSource: string;
          };
          authorId: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          permissionGroupId: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            dataSource: string;
          };
          userSegmentId: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            dataSource: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      articleTitle: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      articleBody: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      displayOptions: {
        label: string;
        comments: string;
        inputs: {
          promoted: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
          position: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          commentsDisabled: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contentTagIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      labelNames: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    associateAttachmentsInBulkToArticle: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      articleId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      attachmentIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      userName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userEmail: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountSettings: {
        label: string;
        comments: string;
        inputs: {
          userRole: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: ({
              label: string;
              value: "admin";
            } | {
              label: string;
              value: "agent";
            } | {
              label: string;
              value: "end-user";
            })[];
            clean: (value: unknown) => string | undefined;
          };
          isModerator: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          isVerified: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      userPhone: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      profileDetails: {
        label: string;
        comments: string;
        inputs: {
          userAlias: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          userNotes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          userDetails: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      organizationId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: number;
        name: string;
      }[];
    }>;
    searchUsers: import("@prismatic-io/spectral").ActionDefinition<{
      externalId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ({
        id: number;
        name: string;
        notes: string;
      } | {
        id: number;
        name: string;
        notes?: undefined;
      })[];
    }>;
    showUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      accountSettings: {
        label: string;
        comments: string;
        inputs: {
          userRole: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: ({
              label: string;
              value: "admin";
            } | {
              label: string;
              value: "agent";
            } | {
              label: string;
              value: "end-user";
            })[];
            clean: (value: unknown) => string | undefined;
          };
          isModerator: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
          isVerified: {
            label: string | {
              key: string;
              value: string;
            };
            comments: string | undefined;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          userName: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          userEmail: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          userPhone: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      profileDetails: {
        label: string;
        comments: string;
        inputs: {
          userAlias: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          userNotes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          userDetails: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          userTimeZone: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      organizationId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createTicket: import("@prismatic-io/spectral").ActionDefinition<{
      requesterName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requesterEmail: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      assigneeId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      recipientEmail: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      ticketSubject: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      classification: {
        label: string;
        comments: string;
        inputs: {
          ticketPriority: {
            label: string;
            type: "string";
            required: false;
            model: ({
              label: string;
              value: "high";
            } | {
              label: string;
              value: "low";
            } | {
              label: string;
              value: "normal";
            } | {
              label: string;
              value: "urgent";
            })[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          ticketStatus: {
            label: string;
            type: "string";
            required: false;
            model: ({
              label: string;
              value: "closed";
            } | {
              label: string;
              value: "hold";
            } | {
              label: string;
              value: "new";
            } | {
              label: string;
              value: "open";
            } | {
              label: string;
              value: "pending";
            } | {
              label: string;
              value: "solved";
            })[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          ticketType: {
            label: string;
            type: "string";
            required: false;
            model: ({
              label: string;
              value: "incident";
            } | {
              label: string;
              value: "problem";
            } | {
              label: string;
              value: "question";
            } | {
              label: string;
              value: "task";
            })[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      ticketComment: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      ticketCommentHTML: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      requesterOrganization: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      followers: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteTicket: import("@prismatic-io/spectral").ActionDefinition<{
      ticketId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getByExternalId: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTickets: import("@prismatic-io/spectral").ActionDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTicketsByUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTicketsToUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    showTicket: import("@prismatic-io/spectral").ActionDefinition<{
      ticketId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateTicket: import("@prismatic-io/spectral").ActionDefinition<{
      ticketId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      ticketComment: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      ticketCommentHTML: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      file: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload | undefined;
      };
      fileName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      classification: {
        label: string;
        comments: string;
        inputs: {
          ticketPriority: {
            label: string;
            type: "string";
            required: false;
            model: ({
              label: string;
              value: "high";
            } | {
              label: string;
              value: "low";
            } | {
              label: string;
              value: "normal";
            } | {
              label: string;
              value: "urgent";
            })[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          ticketStatus: {
            label: string;
            type: "string";
            required: false;
            model: ({
              label: string;
              value: "closed";
            } | {
              label: string;
              value: "hold";
            } | {
              label: string;
              value: "new";
            } | {
              label: string;
              value: "open";
            } | {
              label: string;
              value: "pending";
            } | {
              label: string;
              value: "solved";
            })[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          ticketType: {
            label: string;
            type: "string";
            required: false;
            model: ({
              label: string;
              value: "incident";
            } | {
              label: string;
              value: "problem";
            } | {
              label: string;
              value: "question";
            } | {
              label: string;
              value: "task";
            })[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      assigneeEmail: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      assigneeId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      ticketSubject: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      requesterOrganization: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2DynamicInputs";
    display: {
      label: string;
      description: string;
    };
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    inputs: {
      domain: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2AuthorizationCodeInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
      authorizeUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "oauth2DynamicInputs"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiToken";
    display: {
      label: string;
      description: string;
    };
    inputs: Record<string, import("@prismatic-io/spectral").ConnectionInput> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "apiToken"> | import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "oauth2">)[];
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    listArticlesDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listCategoriesDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listPermissionGroupsDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSectionsDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locale: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listTagsDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listUserSegmentsDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectArticleSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      articleId: {
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPost: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPostSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSectionSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sectionId: {
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTicket: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTopic: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTopicSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topicId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      zendeskConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;