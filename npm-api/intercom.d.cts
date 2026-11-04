//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/interfaces.d.ts
interface Pages {
  type: string;
  page: number;
  per_page: number;
  next: {
    starting_after: string | undefined;
  } | null;
  total_pages: number;
}
interface Company {
  type: string;
  company_id: string;
  id: string;
  app_id: string;
  name: string;
  remote_created_at: number;
  created_at: number;
  updated_at: number;
  monthly_spend: number;
  session_count: number;
  user_count: number;
  tags: Tags;
  segments: Segments;
  plan: CustomAttributes;
  custom_attributes: CustomAttributes;
}
interface CustomAttributes {
  [key: string]: unknown;
}
interface Segments {
  type: string;
  segments: unknown[];
}
interface Tags {
  type: string;
  tags: unknown[];
}
interface Contact {
  type: string;
  id: string;
  external_id: string;
  workspace_id: string;
  role: string;
  email: string;
  email_domain: string;
  phone: string;
  formatted_phone: string;
  name: string;
  owner_id: number;
  has_hard_bounced: boolean;
  marked_email_as_spam: boolean;
  unsubscribed_from_emails: boolean;
  created_at: number;
  updated_at: number;
  signed_up_at: number;
  last_seen_at: number;
  last_replied_at: number;
  last_contacted_at: number;
  last_email_opened_at: number;
  last_email_clicked_at: number;
  language_override: string;
  browser: string;
  browser_version: string;
  browser_language: string;
  os: string;
  android_app_name: string;
  android_app_version: string;
  android_device: string;
  android_os_version: string;
  android_sdk_version: string;
  android_last_seen_at: number;
  ios_app_name: string;
  ios_app_version: string;
  ios_device: string;
  ios_os_version: string;
  ios_sdk_version: string;
  ios_last_seen_at: number;
  custom_attributes: CustomAttributes;
  avatar: Avatar;
  tags: Companies;
  notes: Companies;
  companies: Companies;
  location: Location;
  social_profiles: SocialProfiles;
}
interface Avatar {
  type: string;
  image_url: string;
}
interface Companies {
  url: string;
  total_count: number;
  has_more: boolean;
  data?: CompaniesDatum[];
}
interface CompaniesDatum {
  type: string;
  id: string;
  url: string;
}
interface Location {
  type: string;
  country: string;
  region: string;
  city: string;
}
interface SocialProfiles {
  data: SocialProfilesDatum[];
}
interface SocialProfilesDatum {
  type: string;
  name: string;
  url: string;
}
//#endregion
//#region src/types.d.ts
interface IntercomRecord {
  id: string;
  created_at: number;
  updated_at: number;
  [key: string]: unknown;
}
interface PollingChangesObject {
  created: IntercomRecord[];
  updated: IntercomRecord[];
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "intercom";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/intercom/";
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
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTicketTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTicket: import("@prismatic-io/spectral").ActionDefinition<{
      ticketTypeId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      contactId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      companyId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      ticketAttributes: {
        label: string;
        language: "json";
        type: "code";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTicket: import("@prismatic-io/spectral").ActionDefinition<{
      ticketId: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTags: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      perPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      order: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      companyName: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      tagId: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      segmentId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      startingAfter: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: Company[];
        pages: Pages | null;
      };
    }>;
    createCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      company_id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
      remote_created_at: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      monthly_spend: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
      plan: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      size: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
      website: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      industry: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      company_id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
      remote_created_at: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown) => string;
        comments: string;
      };
      name: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      monthly_spend: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
      plan: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      size: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
      website: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      industry: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      perPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      order: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      startingAfter: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: Contact[];
        pages: Pages | null;
      };
    }>;
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      role: {
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
      external_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      avatar: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      signed_up_at: {
        label: string;
        type: "string";
        clean: (value: unknown) => string;
        comments: string;
      };
      last_seen_at: {
        label: string;
        type: "string";
        clean: (value: unknown) => string;
        comments: string;
      };
      unsubscribed_from_emails: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      role: {
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
      external_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      avatar: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      signed_up_at: {
        label: string;
        type: "string";
        clean: (value: unknown) => string;
        comments: string;
      };
      last_seen_at: {
        label: string;
        type: "string";
        clean: (value: unknown) => string;
        comments: string;
      };
      unsubscribed_from_emails: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    archiveContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    unarchiveContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchContacts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      role: {
        required: false;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      name: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      email: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      jsonQuery: {
        label: string;
        required: false;
        type: "code";
        language: "json";
        clean: (value: unknown) => object;
        comments: string;
      };
      startingAfter: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    attachTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      tagId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    detachTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      tagId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    attachCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    detachCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        required: true;
        label: string;
        dataSource: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: "Contacts" | "Companies";
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: PollingChangesObject;
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
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "intercom";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
        comments: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
        comments: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: false;
        shown: false;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "intercom"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "intercomAccesssToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accessToken: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "intercomAccesssToken">)[];
  dataSources: {
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTag: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTicket: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTicketType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;