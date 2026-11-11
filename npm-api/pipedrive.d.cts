//#region src/types/deals.d.ts
interface Deal {
  id: number;
  creator_user_id: UserID$1;
  user_id: UserID$1;
  person_id: PersonID$1;
  org_id: OrgID$2;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time: string | null;
  active: boolean;
  deleted: boolean;
  status: string;
  probability: string | null;
  next_activity_date: string | null;
  next_activity_time: string | null;
  next_activity_id: string | null;
  last_activity_id: string | null;
  last_activity_date: string | null;
  lost_reason: string | null;
  visible_to: string;
  close_time: string | null;
  pipeline_id: number;
  won_time: string | null;
  first_won_time: string | null;
  lost_time: string | null;
  products_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  participants_count: number;
  expected_close_date: string | null;
  last_incoming_mail_time: string | null;
  last_outgoing_mail_time: string | null;
  label: string | null;
  local_won_date: string | null;
  local_lost_date: string | null;
  local_close_date: string | null;
  origin: string;
  origin_id: string | null;
  channel: string | null;
  channel_id: string | null;
  stage_order_nr: number;
  person_name: string;
  org_name: string;
  next_activity_subject: string | null;
  next_activity_type: string | null;
  next_activity_duration: string | null;
  next_activity_note: string | null;
  formatted_value: string;
  weighted_value: number;
  formatted_weighted_value: string;
  weighted_value_currency: string;
  rotten_time: string | null;
  owner_name: string;
  cc_email: string;
  org_hidden: boolean;
  person_hidden: boolean;
}
interface UserID$1 {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string | null;
  active_flag: boolean;
  value: number;
}
interface OrgID$2 {
  name: string;
  people_count: number;
  owner_id: number;
  address: string | null;
  active_flag: boolean;
  cc_email: string;
  label_ids: Record<string, unknown>[];
  owner_name: string;
  value: number;
}
interface PersonID$1 {
  active_flag: boolean;
  name: string;
  email: Email$2[];
  phone: Email$2[];
  owner_id: number;
  value: number;
}
interface Email$2 {
  value: string;
  primary: boolean;
}
//#endregion
//#region src/types/organization.d.ts
interface Organization {
  id: number;
  creator_user_id: UserID;
  user_id: UserID;
  person_id: PersonID;
  org_id: OrgID$1;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time: string | null;
  active: boolean;
  deleted: boolean;
  status: string;
  probability: string | null;
  next_activity_date: string | null;
  next_activity_time: string | null;
  next_activity_id: string | null;
  last_activity_id: string | null;
  last_activity_date: string | null;
  lost_reason: string | null;
  visible_to: string;
  close_time: string | null;
  pipeline_id: number;
  won_time: string | null;
  first_won_time: string | null;
  lost_time: string | null;
  products_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  participants_count: number;
  expected_close_date: string | null;
  last_incoming_mail_time: string | null;
  last_outgoing_mail_time: string | null;
  label: string | null;
  local_won_date: string | null;
  local_lost_date: string | null;
  local_close_date: string | null;
  origin: string;
  origin_id: string | null;
  channel: string | null;
  channel_id: string | null;
  stage_order_nr: number;
  person_name: string;
  org_name: string;
  next_activity_subject: string | null;
  next_activity_type: string | null;
  next_activity_duration: string | null;
  next_activity_note: string | null;
  formatted_value: string;
  weighted_value: number;
  formatted_weighted_value: string;
  weighted_value_currency: string;
  rotten_time: string | null;
  owner_name: string;
  cc_email: string;
  org_hidden: boolean;
  person_hidden: boolean;
}
interface UserID {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string | null;
  active_flag: boolean;
  value: number;
}
interface OrgID$1 {
  name: string;
  people_count: number;
  owner_id: number;
  address: string | null;
  active_flag: boolean;
  cc_email: string;
  label_ids: Record<string, unknown>[];
  owner_name: string;
  value: number;
}
interface PersonID {
  active_flag: boolean;
  name: string;
  email: Email$1[];
  phone: Email$1[];
  owner_id: number;
  value: number;
}
interface Email$1 {
  value: string;
  primary: boolean;
}
//#endregion
//#region src/types/persons.d.ts
interface Person {
  id: number;
  company_id: number;
  owner_id: OwnerID;
  org_id: OrgID;
  name: string;
  first_name: string;
  last_name: string | null;
  open_deals_count: number;
  related_open_deals_count: number;
  closed_deals_count: number;
  related_closed_deals_count: number;
  participant_open_deals_count: number;
  participant_closed_deals_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  won_deals_count: number;
  related_won_deals_count: number;
  lost_deals_count: number;
  related_lost_deals_count: number;
  active_flag: boolean;
  phone: Email[];
  email: Email[];
  first_char: string;
  update_time: string;
  delete_time: string | null;
  add_time: string;
  visible_to: string;
  picture_id: string | null;
  next_activity_date: string | null;
  next_activity_time: string | null;
  next_activity_id: string | null;
  last_activity_id: string | null;
  last_activity_date: string | null;
  last_incoming_mail_time: string | null;
  last_outgoing_mail_time: string | null;
  label: string | null;
  label_ids: Record<string, unknown>[];
  im: Email[];
  postal_address: string | null;
  postal_address_lat: string | null;
  postal_address_long: string | null;
  postal_address_subpremise: string | null;
  postal_address_street_number: string | null;
  postal_address_route: string | null;
  postal_address_sublocality: string | null;
  postal_address_locality: string | null;
  postal_address_admin_area_level_1: string | null;
  postal_address_admin_area_level_2: string | null;
  postal_address_country: string | null;
  postal_address_postal_code: string | null;
  postal_address_formatted_address: string | null;
  notes: string | null;
  birthday: string | null;
  job_title: string | null;
  org_name: string;
  owner_name: string;
  primary_email: string | null;
  cc_email: string;
}
interface Email {
  value: string;
  primary: boolean;
}
interface OrgID {
  name: string;
  people_count: number;
  owner_id: number;
  address: string | null;
  active_flag: boolean;
  cc_email: string;
  label_ids: Record<string, unknown>[];
  owner_name: string;
  value: number;
}
interface OwnerID {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string | null;
  active_flag: boolean;
  value: number;
}
//#endregion
//#region src/types/pagination.d.ts
interface AdditionalCursorData {
  next_cursor: string | null;
}
interface GenericCursorPaginationData<T> {
  data: T[];
  additional_data: AdditionalCursorData;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "pipedrive";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/pipedrive/";
  display: {
    label: string;
    description: string;
    category: "Application Connectors";
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventAction: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventObject: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        default: string;
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      httpAuthUser: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      httpAuthPassword: {
        label: string;
        type: "password";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findUsersByName: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      term: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      searchByEmail: {
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserFollowers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserPermissions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserRoleAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserRoleSettings: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserSettings: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserConnections: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pipelineId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addStage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pipelineId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      dealProbability: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      rottenFlag: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      rottenDays: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteStage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateStage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pipelineId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      dealProbability: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      rottenFlag: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown) => true | undefined;
        comments: string;
      };
      rottenDays: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStageDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      ids: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      code: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      unit: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      tax: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      visibleTo: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      prices: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      code: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      unit: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      tax: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      visibleTo: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      prices: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      status: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeDeletedFiles: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductFollowers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addProductFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      followerId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductFieldsV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<unknown>;
    }>;
    getProductField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductFieldV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldCode: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductFieldV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldCode: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPipelines: import("@prismatic-io/spectral").ActionDefinition<{
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
    addPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      isDealProbabilityEnabled: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      totalsConvertCurrency: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      isDealProbabilityEnabled: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPipelineConversionStatistics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      startDate: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      endDate: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      userId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPipelineDeals: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      stageId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        default: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
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
    getPipelineMovementStatistics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      startDate: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      endDate: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      userId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersons: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<Person>;
    }>;
    addPerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      orgId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      addTime: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          emails: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          phones: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          visibleTo: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          marketingStatus: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchPersons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      term: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      fields: {
        label: string;
        type: "string";
        default: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      exactMatch: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      organizationId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      includeFields: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      orgId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          emails: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          phones: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          visibleTo: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          marketingStatus: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonActivities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      done: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      status: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeDeletedFiles: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonUpdates: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      allChanges: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      items: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonFollowers: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
    addPersonFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      userId: {
        required: boolean;
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          user_id: number;
          id: number;
          person_id: number;
          add_time: string;
        };
      };
    }>;
    deletePersonFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      followerId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonMailMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    mergePersons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      mergeWithId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePersonPicture: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonFieldsV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<unknown>;
    }>;
    getPersonField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonFieldV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldCode: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePersonField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePersonFieldV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldCode: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPermissionSets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPermissionSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPermissionSetAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizations: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<Organization>;
    }>;
    addOrganization: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      visibleTo: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      addTime: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchOrganization: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      term: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      fields: {
        label: string;
        type: "string";
        default: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      exactMatch: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteOrganization: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganization: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateOrganization: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      visibleTo: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationActivities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      done: {
        label: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      status: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeDeletedFiles: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationUpdates: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      allChanges: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      items: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationFollowers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addOrganizationFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteOrganizationFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      followerId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationMailMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    mergeOrganizations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      mergeWithId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationPersons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getNoteFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
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
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      version: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMailMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      includeBody: {
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMailThreads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folder: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteMailThread: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMailThread: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMailThreadMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLeads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      archivedStatus: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      ownerId: {
        label: string;
        type: "string";
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
        placeholder: string;
      };
      filterId: {
        label: string;
        type: "string";
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
        placeholder: string;
      };
      sort: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      labelIds: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      personId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      organizationId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          value: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          expectedCloseDate: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          visibleTo: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          wasSeen: {
            label: string;
            type: "boolean";
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      labelIds: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      personId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      organizationId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          title: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          value: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          expectedCloseDate: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          visibleTo: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          wasSeen: {
            label: string;
            type: "boolean";
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
          };
          isArchived: {
            label: string;
            type: "boolean";
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchLeads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      term: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      fields: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      exactMatch: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      personId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      organizationId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      includeFields: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLeadSources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLeadLabels: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addLeadLabel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      color: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLeadLabel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      color: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteLeadLabel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFilters: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      type: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      conditions: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityType: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      description: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      contentType: string | undefined;
    }>;
    getDeals: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      stageId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      status: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<Deal>;
    }>;
    addDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      personId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      orgId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pipelineId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      stageId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          value: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          currency: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          status: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          expectedCloseDate: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          probability: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          lostReason: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          visibleTo: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          addTime: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      term: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      fields: {
        label: string;
        type: "string";
        default: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      exactMatch: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      personId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      organizationId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      status: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      includeFields: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealsSummary: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      status: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      userId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      stageId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealsTimeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      startDate: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      interval: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      amount: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
      fieldKey: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      userId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pipelineId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      filterId: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      excludeDeals: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      totalsConvertCurrency: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      personId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      orgId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pipelineId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      stageId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          title: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          value: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          currency: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          status: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
          expectedCloseDate: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          probability: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          lostReason: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          visibleTo: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealActivities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      done: {
        label: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeDeletedFiles: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealFollowers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addDealFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDealFollower: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      followerId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealMailMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    mergeDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      mergeWithId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealParticipants: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addDealParticipant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      personId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDealParticipant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      dealParticipantId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addDealProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      productId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      itemPrice: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
      quantity: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
      discount: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      discountType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      productVariationId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      comments: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      tax: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      isEnabled: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDealProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      productAttachmentId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      productVariationId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          itemPrice: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          quantity: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          discount: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          discountType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          comments: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          tax: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDealProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      productAttachmentId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealFieldsV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<unknown>;
    }>;
    getDealField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealFieldV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldCode: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDealField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDealFieldV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldCode: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonFieldDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    setFieldValueForPerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      customFieldKey: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      value: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrencies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      term: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addCallLog: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      activityId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      subject: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      duration: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      outcome: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      fromPhoneNumber: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      toPhoneNumber: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      startTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      endTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      personId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      orgId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      dealId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      note: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserCallLogs: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          start: {
            label: string;
            type: "string";
            default: string;
            clean: (value: unknown) => number;
            comments: string;
            example: string;
            placeholder: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCallLog: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCallLog: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCompanyAddons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getActivityTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getActivityFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getActivityFieldsV2: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCursorPaginationData<unknown>;
    }>;
    getActivities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
          cursor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      updatedSince: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      updatedUntil: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      sortBy: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDirection: {
        default: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteActivity: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getActivity: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        type: "string";
        required: true;
        shown: true;
        default: string;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
      };
      tokenUrl: {
        type: "string";
        required: true;
        shown: true;
        default: string;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
      };
      scopes: {
        type: "string";
        required: false;
        shown: false;
        default: string;
        label: string;
        comments: string;
        placeholder: string;
      };
      clientId: {
        type: "string";
        required: true;
        shown: true;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
      };
      clientSecret: {
        type: "password";
        required: true;
        shown: true;
        label: string;
        comments: string;
        placeholder: string;
      };
    };
  }, "oauth2">[];
  dataSources: {
    selectActivity: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDeal: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFile: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFilter: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLead: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrganization: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPerson: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPipeline: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectStage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pipedriveTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventAction: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventObject: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      httpAuthUser: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      httpAuthPassword: {
        label: string;
        type: "password";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;