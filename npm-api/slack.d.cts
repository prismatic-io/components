//#region node_modules/@slack/web-api/dist/types/response/UsersInfoResponse.d.ts
type UsersInfoResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  user?: User$1;
  warning?: string;
};
interface User$1 {
  color?: string;
  deleted?: boolean;
  enterprise_id?: string;
  enterprise_name?: string;
  enterprise_user?: EnterpriseUser;
  has_2fa?: boolean;
  id?: string;
  is_admin?: boolean;
  is_app_user?: boolean;
  is_bot?: boolean;
  is_connector_bot?: boolean;
  is_email_confirmed?: boolean;
  is_invited_user?: boolean;
  is_owner?: boolean;
  is_primary_owner?: boolean;
  is_restricted?: boolean;
  is_stranger?: boolean;
  is_ultra_restricted?: boolean;
  is_workflow_bot?: boolean;
  locale?: string;
  name?: string;
  profile?: Profile$1;
  real_name?: string;
  team_id?: string;
  teams?: string[];
  tz?: string;
  tz_label?: string;
  tz_offset?: number;
  updated?: number;
  who_can_share_contact_card?: string;
}
interface EnterpriseUser {
  enterprise_id?: string;
  enterprise_name?: string;
  id?: string;
  is_admin?: boolean;
  is_owner?: boolean;
  is_primary_owner?: boolean;
  teams?: string[];
}
interface Profile$1 {
  always_active?: boolean;
  api_app_id?: string;
  avatar_hash?: string;
  bot_id?: string;
  display_name?: string;
  display_name_normalized?: string;
  email?: string;
  first_name?: string;
  guest_expiration_ts?: number;
  guest_invited_by?: string;
  huddle_state?: string;
  huddle_state_expiration_ts?: number;
  image_1024?: string;
  image_192?: string;
  image_24?: string;
  image_32?: string;
  image_48?: string;
  image_512?: string;
  image_72?: string;
  image_original?: string;
  is_custom_image?: boolean;
  last_name?: string;
  phone?: string;
  pronouns?: string;
  real_name?: string;
  real_name_normalized?: string;
  skype?: string;
  start_date?: string;
  status_emoji?: string;
  status_emoji_display_info?: StatusEmojiDisplayInfo$1[];
  status_emoji_url?: string;
  status_expiration?: number;
  status_text?: string;
  status_text_canonical?: string;
  team?: string;
  title?: string;
}
interface StatusEmojiDisplayInfo$1 {
  display_alias?: string;
  display_url?: string;
  emoji_name?: string;
  unicode?: string;
}
//#endregion
//#region node_modules/@slack/web-api/dist/types/response/UsersLookupByEmailResponse.d.ts
type UsersLookupByEmailResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  response_metadata?: ResponseMetadata;
  user?: User;
  warning?: string;
};
interface ResponseMetadata {
  messages?: string[];
}
interface User {
  color?: string;
  deleted?: boolean;
  has_2fa?: boolean;
  id?: string;
  is_admin?: boolean;
  is_app_user?: boolean;
  is_bot?: boolean;
  is_email_confirmed?: boolean;
  is_invited_user?: boolean;
  is_owner?: boolean;
  is_primary_owner?: boolean;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  name?: string;
  profile?: Profile;
  real_name?: string;
  team_id?: string;
  two_factor_type?: string;
  tz?: string;
  tz_label?: string;
  tz_offset?: number;
  updated?: number;
  who_can_share_contact_card?: string;
}
interface Profile {
  avatar_hash?: string;
  display_name?: string;
  display_name_normalized?: string;
  email?: string;
  first_name?: string;
  guest_expiration_ts?: number;
  guest_invited_by?: string;
  huddle_state?: string;
  huddle_state_expiration_ts?: number;
  image_1024?: string;
  image_192?: string;
  image_24?: string;
  image_32?: string;
  image_48?: string;
  image_512?: string;
  image_72?: string;
  image_original?: string;
  is_custom_image?: boolean;
  last_name?: string;
  phone?: string;
  pronouns?: string;
  real_name?: string;
  real_name_normalized?: string;
  skype?: string;
  start_date?: string;
  status_emoji?: string;
  status_emoji_display_info?: StatusEmojiDisplayInfo[];
  status_emoji_url?: string;
  status_expiration?: number;
  status_text?: string;
  status_text_canonical?: string;
  team?: string;
  title?: string;
}
interface StatusEmojiDisplayInfo {
  display_alias?: string;
  display_url?: string;
  emoji_name?: string;
  unicode?: string;
}
//#endregion
//#region node_modules/@slack/web-api/dist/WebClient.d.ts
interface WebAPICallResult {
  ok: boolean;
  response_metadata?: {
    warnings?: string[];
    next_cursor?: string;
    scopes?: string[];
    acceptedScopes?: string[];
    retryAfter?: number;
    messages?: string[];
  };
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
type Sort = "relevant" | "name" | "member_count" | "created";
type SortDir = "desc" | "asc";
type search_channel_types = "private" | "private_exclude" | "archived" | "exclude_archived" | "private_exclude_archived" | "multi_workspace" | "org_wide" | "external_shared_exclude" | "external_shared" | "external_shared_private" | "external_shared_archived" | "exclude_org_shared";
type SearchChannelType = search_channel_types[];
type SearchAllSort = "timestamp" | "score";
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "slack";
  documentationUrl: "https://prismatic.io/docs/components/slack/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      revokeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        default: string;
        example: string;
        comments: string;
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
      signingSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      isUser: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "webhookUrl";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      webhookUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
    };
  }, "webhookUrl">)[];
  actions: {
    postMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      message: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      messageId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messageId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deletePendingMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messageId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messageId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      message: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postEphemeralMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      message: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    closeConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      conversationName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      conversationName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isPrivate: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    renameConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      conversationName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newConversationName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      email: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UsersLookupByEmailResponse;
    }>;
    getUserById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      user: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UsersInfoResponse;
    }>;
    leaveConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listConversations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      teamId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      excludeArchived: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      channelTypes: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          includePublicChannels: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includePrivateChannels: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeMultiPartyImchannels: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeImChannels: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listConversationMembers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      teamId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postSlackMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      message: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postBlockMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blocks: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (block: unknown) => any;
      };
      message: {
        label: string;
        comments: string;
        placeholder: string;
        type: "text";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      messageId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postWebhookBlockMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      message: {
        label: string;
        required: boolean;
        comments: string;
        placeholder: string;
        type: "text";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blocks: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (block: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    archiveConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    conversationExists: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listScheduledMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    inviteUserToConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    setConversationPurpose: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purpose: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    setConversationTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topic: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listUsersConversations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      teamId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileContent: {
        label: string;
        type: "data";
        comments: string;
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      channels: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      initialComment: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      thread: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getConversationsHistory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeAllMetadata: {
        label: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeRange: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          oldest: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          latest: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          inclusive: {
            label: string;
            comments: string;
            type: "boolean";
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
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
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
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
    openView: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      trigger_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      view: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    publishView: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      view: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    pushView: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      trigger_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      view: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateView: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      view: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => any;
      };
      view_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      external_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchAll: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          count: {
            label: string;
            comments: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown) => number;
          };
          page: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      highlight: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SearchAllSort;
      };
      sort_dir: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SortDir;
      };
      team_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          count: {
            label: string;
            comments: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown) => number;
          };
          page: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      highlight: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SearchAllSort;
      };
      sort_dir: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SortDir;
      };
      team_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          count: {
            label: string;
            comments: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown) => number;
          };
          page: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      highlight: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SearchAllSort;
      };
      sort_dir: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SortDir;
      };
      team_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchConversation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connected_team_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => SearchChannelType;
      };
      search_channel_types: {
        label: string;
        type: "string";
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        comments: string;
        clean: (value: unknown) => SearchChannelType;
      };
      sort: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => Sort;
      };
      sort_dir: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => SortDir;
      };
      team_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => SearchChannelType;
      };
      total_count_only: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTeams: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      slackConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    slashCommandWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      responseBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => any;
      };
      contentType: {
        label: string;
        default: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: {
        deserializedBody: {
          [k: string]: string;
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        body: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown>;
      };
      response: {
        body?: string;
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectChannels: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showIdInDropdown: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includePublicChannels: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includePrivateChannels: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeMultiPartyImchannels: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeImChannels: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTeams: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showIdInDropdown: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUsers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showIdInDropdown: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;