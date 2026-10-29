import type { CreateApiPaginationResponse } from "../types";

export interface CreateTicketResponse {
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
    channels: { id: number }[];
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
      to: { name: string; address: string }[];
      cc: { name: string; address: string }[];
      bcc: { name: string; address: string }[];
      from: { name: string; address: string };
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
    decoration: { color: string };
  }[];
  trashed_datetime: string | null;
  updated_datetime: string | null;
  via: string;
  uri: string;
}

export interface GetTicketResponse {
  id: number;
  url: string;
  external_id: string | null;
  events: [
    {
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
    },
  ];
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
      to: { name: string; address: string }[];
      cc: { name: string; address: string }[];
      bcc: { name: string; address: string }[];
      from: { name: string; address: string };
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

export type ListTicketCustomFieldsResponse = {
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

export type ListTicketsResponse = CreateApiPaginationResponse<{
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
    decoration: { color: string };
  }[];
  spam: boolean | null;
  trashed_datetime: string | null;
  updated_datetime: string | null;
  via: string;
  uri: string;
}>;

export interface UpdateTicketResponse {
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
    channels: { id: number }[];
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
      to: { name: string; address: string }[];
      cc: { name: string; address: string }[];
      bcc: { name: string; address: string }[];
      from: { name: string; address: string };
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
    decoration: { color: string };
  }[];
  trashed_datetime: string | null;
  updated_datetime: string | null;
  via: string;
  uri: string;
}

export type UpdateTicketCustomFieldsResponse = {
  field: {
    id: number;
    external_id: string | null;
    object_type: string;
    label: string;
    description: string | null;
    priority: number;
    required: boolean;
    managed_by: string;
    definition:
      | {
          input_settings: "INPUT_NUMBER";
          data_type: string;
        }
      | {
          input_settings: "INPUT" | "DROPDOWN";
          data_type: string;
        }
      | {
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
