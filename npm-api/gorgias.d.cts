//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface CreateApiPaginationResponse<T> {
  data: T[];
  object: string;
  uri: string;
  meta: {
    prev_cursor: string | null;
    next_cursor: string | null;
  };
}
interface GorgiasRecord {
  id: number;
  created_datetime: string | null;
  updated_datetime: string | null;
  [key: string]: unknown;
}
//#endregion
//#region src/interfaces/tickets.d.ts
interface CreateTicketResponse {
  id: number;
  assignee_user: {
    id: number;
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    meta: {
      sso: string | null;
      profile_picture_url: string | null;
    };
  };
  channel: string;
  closed_datetime: string | null;
  created_datetime: string | null;
  customer: {
    id: number;
    channels: {
      id: number;
    }[];
    email: string | null;
    external_id: string | null;
    firstname: string;
    integrations: Record<string, unknown>;
    lastname: string;
    name: string | null;
    note: string | null;
  };
  external_id: string | null;
  from_agent: boolean;
  is_unread: boolean;
  language: string | null;
  last_message_datetime: string | null;
  last_received_message_datetime: string | null;
  messages: {
    id: number;
    attachments: {
      url: string;
      name: string;
      size: number | null;
      content_type: string;
      public: boolean;
      extra: string;
    }[];
    body_html: string | null;
    body_text: string | null;
    channel: string;
    created_datetime: string | null;
    external_id: string | null;
    failed_datetime: string | null;
    from_agent: boolean;
    integration_id: number;
    last_sending_error: null;
    message_id: string | null;
    receiver: {
      id: number;
      email: string | null;
      name: string | null;
      firstname: string;
      lastname: string;
      meta: null;
    };
    rule_id: number;
    sender: {
      id: number;
      email: string | null;
      name: string | null;
      firstname: string;
      lastname: string;
      meta: null;
    };
    sent_datetime: string | null;
    source: {
      type: string;
      to: {
        name: string;
        address: string;
      }[];
      cc: {
        name: string;
        address: string;
      }[];
      bcc: {
        name: string;
        address: string;
      }[];
      from: {
        name: string;
        address: string;
      };
    };
    stripped_html: string | null;
    stripped_text: string | null;
    subject: string | null;
    ticket_id: number;
    via: string;
    uri: string;
  }[];
  meta: Record<string, unknown>;
  opened_datetime: string | null;
  reply_options: string;
  satisfaction_survey: {
    id: number;
    body_text: string | null;
    created_datetime: string | null;
    customer_id: number;
    meta: Record<string, unknown>;
    score: number | null;
    scored_datetime: string | null;
    sent_datetime: string | null;
    should_send_datetime: string | null;
    ticket_id: number;
  };
  snoozed_datetime: string | null;
  spam: boolean | null;
  status: string;
  subject: string | null;
  tags: {
    id: number;
    name: string;
    uri: string;
    decoration: {
      color: string;
    };
  }[];
  trashed_datetime: string | null;
  updated_datetime: string | null;
  via: string;
  uri: string;
}
interface GetTicketResponse {
  id: number;
  url: string;
  external_id: string | null;
  events: [{
    idcreated_datetime: string;
    data: Record<string, unknown>;
    type: string;
    user: {
      id: number;
      firstname: string;
      lastname: string;
      name: string;
      email: string;
    };
    uri: string;
  }];
  status: string;
  channel: string;
  via: string;
  from_agent: boolean;
  is_unread: boolean;
  spam: boolean | null;
  customer: {
    id: number;
    channels: {
      id: number;
      type: string;
      address: string;
      preferred: boolean;
      created_datetime: string;
      updated_datetime: string;
      deleted_datetime: string | null;
      user: {
        id: number;
        name: string | null;
      };
      customer: {
        id: number;
        name: string | null;
      };
    }[];
    email: string | null;
    external_id: string | null;
    firstname: string;
    integrations: Record<string, unknown>;
    external_data: Record<string, unknown>[];
    ecommerce_data: Record<string, unknown>;
    lastname: string;
    meta: null;
    name: string | null;
    note: string | null;
  };
  assignee_user: {
    id: number;
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    meta: {
      sso: string | null;
      profile_picture_url: string | null;
    };
  };
  language: string | null;
  subject: string | null;
  meta: Record<string, unknown>;
  tags: {
    id: number;
    name: string;
    uri: string;
    decoration: {
      color: string;
    };
  }[];
  custom_fields: null;
  messages: {
    id: number;
    attachments: {
      url: string;
      name: string;
      size: number | null;
      content_type: string;
      public: boolean;
      extra: string;
    }[];
    body_html: string | null;
    body_text: string | null;
    channel: string;
    created_datetime: string | null;
    external_id: string | null;
    failed_datetime: string | null;
    from_agent: boolean;
    integration_id: number;
    last_sending_error: null;
    message_id: string | null;
    receiver: {
      id: number;
      email: string | null;
      name: string | null;
      firstname: string;
      lastname: string;
      meta: null;
    };
    rule_id: number;
    sender: {
      id: number;
      email: string | null;
      name: string | null;
      firstname: string;
      lastname: string;
      meta: null;
    };
    sent_datetime: string | null;
    source: {
      type: string;
      to: {
        name: string;
        address: string;
      }[];
      cc: {
        name: string;
        address: string;
      }[];
      bcc: {
        name: string;
        address: string;
      }[];
      from: {
        name: string;
        address: string;
      };
    };
    stripped_html: string | null;
    stripped_text: string | null;
    subject: string | null;
    ticket_id: number;
    via: string;
    uri: string;
  }[];
  created_datetime: string | null;
  opened_datetime: string | null;
  last_received_message_datetime: string | null;
  last_message_datetime: string | null;
  updated_datetime: string | null;
  closed_datetime: string | null;
  trashed_datetime: string | null;
  snooze_datetime: string | null;
  satisfaction_survey: {
    id: number;
    body_text: string | null;
    created_datetime: string;
    customer_id: number;
    meta: Record<string, unknown> | null;
    score: number | null;
    scored_datetime: string | null;
    sent_datetime: string | null;
    should_send_datetime: string | null;
    ticket_id: number;
  };
  reply_options: string;
}
type ListTicketCustomFieldsResponse = {
  field: {
    id: number;
    external_id: string | null;
    object_type: string;
    label: string;
    description: string | null;
    priority: number;
    required: boolean;
    managed_by: string;
    definition: {
      input_settings: "INPUT_NUMBER" | "INPUT" | "DROPDOWN";
      data_type: string;
    };
    created_datetime: string;
    updated_datetime: string;
    deactivated_datetime: string | null;
  };
  value: string;
  prediction: {
    predicted: string;
    confidence: number;
    display: boolean;
    confirmed: boolean;
    modified: boolean;
  };
}[];
type ListTicketsResponse = CreateApiPaginationResponse<{
  id: number;
  assignee_user: {
    id: number;
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    meta: {
      sso: string | null;
      profile_picture_url: string | null;
    };
  };
  channel: string;
  closed_datetime: string | null;
  created_datetime: string | null;
  customer: {
    id: number;
    email: string | null;
    name: string | null;
    firstname: string;
    lastname: string;
  };
  excerpt: string;
  external_id: string | null;
  from_agent: boolean;
  integrations: Record<string, unknown>;
  is_unread: boolean;
  language: string | null;
  last_message_datetime: string | null;
  last_received_message_datetime: string | null;
  messages_count: number;
  meta: Record<string, unknown>;
  opened_datetime: string | null;
  snoozed_datetime: string | null;
  status: string;
  subject: string | null;
  tags: {
    id: number;
    name: string;
    uri: string;
    decoration: {
      color: string;
    };
  }[];
  spam: boolean | null;
  trashed_datetime: string | null;
  updated_datetime: string | null;
  via: string;
  uri: string;
}>;
interface UpdateTicketResponse {
  id: number;
  assignee_user: {
    id: number;
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    meta: {
      sso: string | null;
      profile_picture_url: string | null;
    };
  };
  channel: string;
  closed_datetime: string | null;
  created_datetime: string | null;
  customer: {
    id: number;
    channels: {
      id: number;
    }[];
    email: string | null;
    external_id: string | null;
    firstname: string;
    integrations: Record<string, unknown>;
    lastname: string;
    name: string | null;
    note: string | null;
  };
  external_id: string | null;
  from_agent: boolean;
  is_unread: boolean;
  language: string | null;
  last_message_datetime: string | null;
  last_received_message_datetime: string | null;
  messages: {
    id: number;
    attachments: {
      url: string;
      name: string;
      size: number | null;
      content_type: string;
      public: boolean;
      extra: string;
    }[];
    body_html: string | null;
    body_text: string | null;
    channel: string;
    created_datetime: string | null;
    external_id: string | null;
    failed_datetime: string | null;
    from_agent: boolean;
    integration_id: number;
    last_sending_error: null;
    message_id: string | null;
    receiver?: {
      id: number;
      email: string | null;
      name: string | null;
      firstname: string;
      lastname: string;
      meta: null;
    };
    rule_id: number;
    sender: {
      id: number;
      email: string | null;
      name: string | null;
      firstname: string;
      lastname: string;
      meta: null;
    };
    sent_datetime: string | null;
    source: {
      type: string;
      to: {
        name: string;
        address: string;
      }[];
      cc: {
        name: string;
        address: string;
      }[];
      bcc: {
        name: string;
        address: string;
      }[];
      from: {
        name: string;
        address: string;
      };
    };
    stripped_html: string | null;
    stripped_text: string | null;
    subject: string | null;
    ticket_id: number;
    via: string;
    uri: string;
  }[];
  meta: Record<string, unknown>;
  opened_datetime: string | null;
  reply_options: string;
  satisfaction_survey: {
    id: number;
    body_text: string | null;
    created_datetime: string | null;
    customer_id: number;
    meta: Record<string, unknown>;
    score: number | null;
    scored_datetime: string | null;
    sent_datetime: string | null;
    should_send_datetime: string | null;
    ticket_id: number;
  };
  snoozed_datetime: string | null;
  spam: boolean | null;
  status: string;
  subject: string | null;
  tags: {
    id: number;
    name: string;
    uri: string;
    decoration: {
      color: string;
    };
  }[];
  trashed_datetime: string | null;
  updated_datetime: string | null;
  via: string;
  uri: string;
}
type UpdateTicketCustomFieldsResponse = {
  field: {
    id: number;
    external_id: string | null;
    object_type: string;
    label: string;
    description: string | null;
    priority: number;
    required: boolean;
    managed_by: string;
    definition: {
      input_settings: "INPUT_NUMBER";
      data_type: string;
    } | {
      input_settings: "INPUT" | "DROPDOWN";
      data_type: string;
    } | {
      input_settings: "DROPDOWN";
      data_type: string;
    };
    created_datetime: string;
    updated_datetime: string;
    deactivated_datetime: string | null;
  };
  value: string;
  prediction: {
    predicted: string;
    confidence: number;
    display: boolean;
    confirmed: boolean;
    modified: boolean;
  };
}[];
//#endregion
//#region src/constants.d.ts
declare enum MESSAGES {
  SUCCESS = "Success",
  ERROR = "Error"
}
//#endregion
//#region src/interfaces/ticketMessages.d.ts
interface TicketMessage {
  id: number;
  attachments: {
    url: string;
    name: string;
    size: number | null;
    content_type: string;
    public: boolean;
    extra: string;
  }[];
  body_html: string | null;
  body_text: string | null;
  channel: string;
  created_datetime: string | null;
  external_id: string | null;
  failed_datetime: string | null;
  from_agent: boolean;
  integration_id: number;
  last_sending_error: null;
  message_id: string | null;
  receiver: {
    id: number;
    email: string | null;
    name: string | null;
    firstname: string;
    lastname: string;
    meta: null;
  };
  rule_id: number;
  sender: {
    id: number;
    email: string | null;
    name: string | null;
    firstname: string;
    lastname: string;
    meta: null;
  };
  sent_datetime: string | null;
  source: {
    type: string;
    to: {
      name: string;
      address: string;
    }[];
    cc: {
      name: string;
      address: string;
    }[];
    bcc: {
      name: string;
      address: string;
    }[];
    from: {
      name: string;
      address: string;
    };
  };
  stripped_html: string | null;
  stripped_text: string | null;
  subject: string | null;
  ticket_id: number;
  via: string;
  uri: string;
}
type ListMessagesResponse = CreateApiPaginationResponse<TicketMessage>;
//#endregion
//#region src/interfaces/search.d.ts
type SearchResponse = Record<string, unknown>;
//#endregion
//#region src/interfaces/files.d.ts
type UploadFilesResponse = {
  content_type: string;
  size: number;
  name: string;
  url: string;
}[];
//#endregion
//#region src/interfaces/events.d.ts
interface Event {
  id: number;
  context: string | null;
  created_datetime: string | null;
  data: Record<string, unknown>;
  object_id: number;
  object_type: string;
  type: string;
  user_id: number;
  url: string;
}
type ListEventsResponse = CreateApiPaginationResponse<Event>;
//#endregion
//#region src/interfaces/customers.d.ts
interface Address {
  id?: number;
  zip?: string;
  city: string;
  name?: string;
  country: string;
  address1?: string;
  address2?: string;
  province?: string;
  last_name: string;
  first_name: string;
  line_1?: string;
  line_2?: string;
  zip_code?: string;
  created_datetime?: string;
  updated_datetime?: string;
  deleted_datetime?: string;
  external_id?: string;
  state?: string;
  preferred?: boolean;
  phone_number?: string;
  shopper_external_id?: string;
  country_code?: string;
  province_code?: string;
  default?: boolean;
  customer_id?: number;
  country_name?: string;
}
interface Price {
  amount: string;
  currency_code: string;
}
interface PriceSet {
  shop_money: Price;
  presentment_money: Price;
}
interface TaxLine {
  rate: number;
  price: string;
  title: string;
  price_set: PriceSet;
}
interface LineItem {
  id: number;
  unit_price?: string;
  discount_type?: string;
  discount_reason?: string;
  total_amount?: string;
  fulfilled_quantity?: number;
  updated_datetime?: string;
  discount_amount?: string;
  sku?: string;
  name?: string;
  grams?: number;
  price?: string;
  title: string;
  taxable: boolean;
  quantity: number;
  price_set?: PriceSet;
  tax_lines?: TaxLine[];
  product_id?: number;
  variant_id?: number;
  total_discount?: string;
  requires_shipping: boolean;
  fulfillment_status?: string | null;
  total_discount_set?: PriceSet;
  fulfillment_service?: string;
  fulfillable_quantity?: number;
  product_options?: ProductOptions;
  deleted_datetime?: string;
  created_datetime?: string;
}
interface ProductOptions {
  size: number;
}
interface Order {
  id: number;
  total_tax: string;
  created_at: string;
  line_items: LineItem[];
  contact_email: string;
  billing_address: Address;
}
interface BaseCustomer {
  id: number;
  note: string;
  name?: string;
  tags?: string;
  email: string;
  firstname: string;
  lastname: string;
  orders_count?: number;
  default_address?: Address;
  created_datetime?: string;
  external_id?: string;
}
interface Integration {
  orders: Order[];
  customer: BaseCustomer;
  __integration_type__: string;
}
interface Store {
  id: number;
  type: string;
  helpdesk_integration_id: number;
  default_currency: string;
  url: string;
  updated_datetime: string;
  currencies: string[];
  display_name: string;
  created_datetime: string;
  name: string;
  deleted_datetime: string;
  uuid: string;
}
interface Shopper {
  id: number;
  first_name: string;
  helpdesk_customer_id: number;
  updated_datetime: string;
  phone_number: string;
  middle_name: string;
  deleted_datetime: string;
  birthdate: string;
  status: string;
  external_id: string;
  email_address: string;
  accepts_marketing_sms: boolean;
  accepts_marketing_email: boolean;
  last_name: string;
  created_datetime: string;
}
interface ExternalData {
  badge: string;
  points: number;
  __app_name__: string;
}
interface EcommerceOrder {
  external_status: string;
  total_amount: string;
  number: number;
  billing_address: Address;
  tax_amount: string;
  discount_codes: string[];
  line_items: LineItem[];
  status: string;
  external_fulfillment_status: string;
  payment_status: string;
  shopper_external_id: string;
  external_payment_status: string;
  name: string;
  currency: string;
  created_datetime: string;
  id: number;
  updated_datetime: string;
  subtotal_amount: string;
  deleted_datetime: string;
  external_id: string;
  shipping_address: Address;
  discount_amount: string;
  shipping_amount: string;
}
interface EcommerceData {
  store: Store;
  shopper: Shopper;
  orders: EcommerceOrder[];
  addresses: Address[];
}
interface CreateCustomerResponse extends BaseCustomer {
  integrations: Record<string, Integration>;
  language: string;
  timezone: string;
  updated_datetime: string;
}
interface GetCustomerResponse extends BaseCustomer {
  channels: {
    id: number;
  }[];
  integrations: Record<string, Integration>;
  language: string;
  timezone: string;
  updated_datetime: string;
  external_data: Record<string, ExternalData>;
  ecommerce_data: Record<string, EcommerceData>;
}
interface UpdateCustomerResponse extends BaseCustomer {
  integrations: Record<string, Integration>;
  language: string;
  timezone: string;
  updated_datetime: string;
}
type ListCustomersResponse = CreateApiPaginationResponse<{
  id: number;
  created_datetime: string | null;
  email: string | null;
  external_id: string | null;
  firstname: string;
  language: string | null;
  lastname: string;
  name: string | null;
  timezone: string | null;
  updated_datetime: string | null;
}>;
//#endregion
//#region src/interfaces/account.d.ts
interface GetAccountResponse {
  created_datetime: string;
  deactivated_datetime: string | null;
  domain: string;
  settings: {
    id: number;
    type: string;
    data: {
      timezone: string;
      business_hours: {
        days: string;
        from_time: string;
        to_time: string;
      };
    };
  }[];
  status: {
    status: string;
  };
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "gorgias";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  documentationUrl: "https://prismatic.io/docs/components/gorgias/";
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        placeholder: string;
        label: string;
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
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
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
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      messages: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      meta: {
        label: string;
        comments: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      status: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      subject: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => {
          [x: string]: any;
        }[] | undefined;
      };
      ticketTimestamps: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          closed_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          created_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          last_message_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          last_received_message_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          opened_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          snooze_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          trashed_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          updated_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assignee_team: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          assignee_user: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          channel: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          customer: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          from_agent: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          language: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          spam: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          via: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: CreateTicketResponse;
    }>;
    deleteTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: MESSAGES;
      };
    }>;
    deleteTicketCustomField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: MESSAGES;
      };
    }>;
    getTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      relationships: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetTicketResponse;
    }>;
    listTickets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      customer_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      view_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      rule_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      ticket_ids: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      fetchAll: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (valueBase: unknown, minValue?: number, maxValue?: number) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      order_by: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          value: string;
          label: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListTicketsResponse | {
        data: {
          id: number;
          assignee_user: {
            id: number;
            email: string;
            name: string;
            firstname: string;
            lastname: string;
            meta: {
              sso: string | null;
              profile_picture_url: string | null;
            };
          };
          channel: string;
          closed_datetime: string | null;
          created_datetime: string | null;
          customer: {
            id: number;
            email: string | null;
            name: string | null;
            firstname: string;
            lastname: string;
          };
          excerpt: string;
          external_id: string | null;
          from_agent: boolean;
          integrations: Record<string, unknown>;
          is_unread: boolean;
          language: string | null;
          last_message_datetime: string | null;
          last_received_message_datetime: string | null;
          messages_count: number;
          meta: Record<string, unknown>;
          opened_datetime: string | null;
          snoozed_datetime: string | null;
          status: string;
          subject: string | null;
          tags: {
            id: number;
            name: string;
            uri: string;
            decoration: {
              color: string;
            };
          }[];
          spam: boolean | null;
          trashed_datetime: string | null;
          updated_datetime: string | null;
          via: string;
          uri: string;
        }[];
        object: string;
        uri: string;
        meta: {
          prev_cursor: null;
          next_cursor: null;
        };
      };
    }>;
    updateTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      meta: {
        label: string;
        comments: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      status: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => {
          [x: string]: any;
        }[] | undefined;
      };
      ticketTimestamps: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          closed_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          last_message_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          last_received_message_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          opened_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          snooze_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          trashed_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          updated_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assignee_team: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          assignee_user: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          channel: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          customer: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          from_agent: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          is_unread: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          language: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          spam: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          via: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UpdateTicketResponse;
    }>;
    updateTicketCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      custom_fields: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UpdateTicketCustomFieldsResponse;
    }>;
    listTicketCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListTicketCustomFieldsResponse;
    }>;
    createTicketMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      channel: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      source: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      via: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      body_html: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      body_text: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      message_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      subject: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      messageTimestamps: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          created_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          failed_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
          sent_datetime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => Date | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          from_agent: {
            type: "boolean";
            required: false;
            label: string;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            placeholder: string;
            example: string;
          };
          action: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            model: {
              value: string;
              label: string;
            }[];
          };
          attachments: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => any[] | undefined;
          };
          receiver: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          sender: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: TicketMessage;
    }>;
    getTicketMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: TicketMessage;
    }>;
    listMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (valueBase: unknown, minValue?: number, maxValue?: number) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      order_by: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          value: string;
          label: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListMessagesResponse | {
        data: TicketMessage[];
        object: string;
        uri: string;
        meta: {
          prev_cursor: null;
          next_cursor: null;
        };
      };
    }>;
    search: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          value: string;
          label: string;
        }[];
      };
      query: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      size: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SearchResponse;
    }>;
    downloadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      file_type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      domain_hash: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      resource_name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    uploadFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      type: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UploadFilesResponse;
    }>;
    getEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Event;
    }>;
    listEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      created_datetime: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      object_id: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      object_type: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        model: {
          value: string;
          label: string;
        }[];
        example: string;
        placeholder: string;
      };
      types: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      user_ids: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      fetchAll: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (valueBase: unknown, minValue?: number, maxValue?: number) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      order_by: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          value: string;
          label: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListEventsResponse | {
        data: Event[];
        object: string;
        uri: string;
        meta: {
          prev_cursor: null;
          next_cursor: null;
        };
      };
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      channels: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      language: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      timezone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: CreateCustomerResponse;
    }>;
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: MESSAGES;
      };
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetCustomerResponse;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      language: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      timezone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      view_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
      };
      fetchAll: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
          };
          limit: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (valueBase: unknown, minValue?: number, maxValue?: number) => number | undefined;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      order_by: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListCustomersResponse | {
        data: {
          id: number;
          created_datetime: string | null;
          email: string | null;
          external_id: string | null;
          firstname: string;
          language: string | null;
          lastname: string;
          name: string | null;
          timezone: string | null;
          updated_datetime: string | null;
        }[];
        object: string;
        uri: string;
        meta: {
          prev_cursor: null;
          next_cursor: null;
        };
      };
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      channels: {
        required: false;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      external_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      language: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      timezone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: UpdateCustomerResponse;
    }>;
    updateCustomerData: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      id: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      data: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: MESSAGES;
      };
    }>;
    getAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetAccountResponse;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      payload: {
        body: {
          data: {
            created: GorgiasRecord[];
            updated: GorgiasRecord[];
          };
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
    key: "gorgias-oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      domain: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: false;
        shown: boolean;
        comments: string;
        example: string;
        default: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: boolean;
      };
    };
  }, "gorgias-oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "gorgias-api-key";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      domain: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
      username: {
        label: string;
        type: "string";
        required: true;
        comments: string;
      };
      apiKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "gorgias-api-key">)[];
  dataSources: {
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      view_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
      };
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEvent: import("@prismatic-io/spectral").DataSourceDefinition<{
      created_datetime: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      object_id: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      object_type: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        model: {
          value: string;
          label: string;
        }[];
        example: string;
        placeholder: string;
      };
      types: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      user_ids: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMessage: import("@prismatic-io/spectral").DataSourceDefinition<{
      ticket_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTicket: import("@prismatic-io/spectral").DataSourceDefinition<{
      customer_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      view_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      rule_id: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (valueBase: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;