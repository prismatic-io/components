const mailPartySchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    latest_sent: { type: "boolean" },
    email_address: { type: "string" },
    message_time: { type: "string" },
    linked_person_id: { type: "integer" },
    linked_person_name: { type: "string" },
    linked_organization_id: { type: "integer" },
    linked_organization_name: { type: "string" },
    linked_deal_id: { type: "integer" },
    linked_deal_status: { type: "string" },
  },
};

const mailThreadRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    account_id: { type: "string" },
    user_id: { type: "integer" },
    subject: { type: "string" },
    snippet: { type: "string" },
    read_flag: { type: "integer" },
    mail_tracking_status: { type: "string" },
    has_attachments_flag: { type: "integer" },
    has_inline_attachments_flag: { type: "integer" },
    has_real_attachments_flag: { type: "integer" },
    deleted_flag: { type: "integer" },
    synced_flag: { type: "integer" },
    smart_bcc_flag: { type: "integer" },
    mail_link_tracking_enabled_flag: { type: "integer" },
    write_flag: { type: "boolean" },
    mail_thread_participants: { type: "array", items: mailPartySchema },
    version: { type: "integer" },
    snippet_sender: { type: "string" },
    message_count: { type: "integer" },
    has_draft_flag: { type: "integer" },
    has_sent_flag: { type: "integer" },
    archived_flag: { type: "integer" },
    shared_flag: { type: "integer" },
    external_deleted_flag: { type: "boolean" },
    first_message_to_me_flag: { type: "boolean" },
    last_message_timestamp: { type: "string" },
    first_message_timestamp: { type: "string" },
    last_message_sent_timestamp: { type: "string" },
    last_message_received_timestamp: { type: "string" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    deal_id: { type: "integer" },
    deal_title: { type: "string" },
    deal_status: { type: "string" },
    lead_id: { type: "string" },
    all_messages_sent_flag: { type: "integer" },
  },
};

const mailMessageRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    from: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          email_address: { type: "string" },
        },
      },
    },
    to: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          email_address: { type: "string" },
        },
      },
    },
    cc: { type: "array", items: {} },
    bcc: { type: "array", items: {} },
    body_url: { type: "string" },
    account_id: { type: "string" },
    user_id: { type: "integer" },
    mail_thread_id: { type: "integer" },
    subject: { type: "string" },
    snippet: { type: "string" },
    mail_tracking_status: { type: "string" },
    mail_link_tracking_enabled_flag: { type: "integer" },
    read_flag: { type: "integer" },
    draft: { type: "string" },
    has_body_flag: { type: "integer" },
    sent_flag: { type: "integer" },
    sent_from_pipedrive_flag: { type: "integer" },
    smart_bcc_flag: { type: "integer" },
    message_time: { type: "string" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    has_attachments_flag: { type: "integer" },
    has_inline_attachments_flag: { type: "integer" },
    has_real_attachments_flag: { type: "integer" },
    write_flag: { type: "boolean" },
    item_type: { type: "string" },
    timestamp: { type: "string" },
  },
};

export const getMailThreadsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: mailThreadRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            pagination: {
              type: "object",
              properties: {
                start: { type: "integer" },
                limit: { type: "integer" },
                more_items_in_collection: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};

export const deleteMailThreadOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
  },
};

export const getMailThreadOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: mailThreadRecordSchema,
      },
    },
  },
};

export const getMailThreadMessagesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: mailMessageRecordSchema },
      },
    },
  },
};

export const getMailMessageOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: mailMessageRecordSchema,
      },
    },
  },
};
