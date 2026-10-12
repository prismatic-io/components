const mailParty = {
  id: 18487521,
  name: "Developer",
  latest_sent: true,
  email_address: "dev@test.dev",
  message_time: "2024-09-27 14:30:00",
  linked_person_id: 3,
  linked_person_name: "John Doe",
  linked_organization_id: 2,
  linked_organization_name: "Acme Corp",
  linked_deal_id: 1,
  linked_deal_status: "open",
};
const mailThreadRecord = {
  id: 1,
  account_id: "acc123",
  user_id: 18487521,
  subject: "Re: Contract renewal discussion",
  snippet: "Thanks for your reply. Let me review the proposal...",
  read_flag: 1,
  mail_tracking_status: null,
  has_attachments_flag: 0,
  has_inline_attachments_flag: 0,
  has_real_attachments_flag: 0,
  deleted_flag: 0,
  synced_flag: 1,
  smart_bcc_flag: 0,
  mail_link_tracking_enabled_flag: 0,
  write_flag: true,
  mail_thread_participants: [mailParty],
  version: 2,
  snippet_sender: "John Doe",
  message_count: 3,
  has_draft_flag: 0,
  has_sent_flag: 1,
  archived_flag: 0,
  shared_flag: 0,
  external_deleted_flag: false,
  first_message_to_me_flag: false,
  last_message_timestamp: "2024-09-27 14:30:00",
  first_message_timestamp: "2024-09-25 10:00:00",
  last_message_sent_timestamp: "2024-09-27 14:30:00",
  last_message_received_timestamp: "2024-09-27 12:00:00",
  add_time: "2024-09-25 10:00:00",
  update_time: "2024-09-27 14:30:00",
  deal_id: 1,
  deal_title: "Enterprise License Deal",
  deal_status: "open",
  lead_id: null,
  all_messages_sent_flag: 0,
};
const mailMessageRecord = {
  id: 101,
  from: [{ id: 3, name: "John Doe", email_address: "john@example.com" }],
  to: [{ id: 18487521, name: "Developer", email_address: "dev@test.dev" }],
  cc: [],
  bcc: [],
  body_url: "https://mail-api.pipedrive.com/v1/mailbox/mailMessages/101/body",
  account_id: "acc123",
  user_id: 18487521,
  mail_thread_id: 1,
  subject: "Re: Contract renewal discussion",
  snippet: "Thanks for your reply. Let me review the proposal...",
  mail_tracking_status: null,
  mail_link_tracking_enabled_flag: 0,
  read_flag: 1,
  draft: "0",
  has_body_flag: 1,
  sent_flag: 0,
  sent_from_pipedrive_flag: 0,
  smart_bcc_flag: 0,
  message_time: "2024-09-27 14:30:00",
  add_time: "2024-09-27 14:30:00",
  update_time: "2024-09-27 14:30:00",
  has_attachments_flag: 0,
  has_inline_attachments_flag: 0,
  has_real_attachments_flag: 0,
  write_flag: true,
  item_type: "mail_thread",
  timestamp: "2024-09-27 14:30:00",
};
export const getMailThreadsExamplePayload = {
  data: {
    success: true,
    data: [mailThreadRecord],
    additional_data: {
      pagination: {
        start: 0,
        limit: 50,
        more_items_in_collection: false,
      },
    },
  },
};
export const deleteMailThreadExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
export const getMailThreadExamplePayload = {
  data: {
    success: true,
    data: mailThreadRecord,
  },
};
export const getMailThreadMessagesExamplePayload = {
  data: {
    success: true,
    data: [mailMessageRecord],
  },
};
export const getMailMessageExamplePayload = {
  data: {
    success: true,
    data: mailMessageRecord,
  },
};
