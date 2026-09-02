export const BASE_URL = "https://api.hubapi.com";
export const EVENT_TYPES = [
  { label: "Contact Creation", value: "contact.creation" },
  { label: "Contact Deletion", value: "contact.deletion" },
  { label: "Contact Privacy Deletion", value: "contact.privacyDeletion" },
  { label: "Company Creation", value: "company.creation" },
  { label: "Company Deletion", value: "company.deletion" },
  { label: "Deal Creation", value: "deal.creation" },
  { label: "Deal Deletion", value: "deal.deletion" },
  { label: "Ticket Creation", value: "ticket.creation" },
  { label: "Ticket Deletion", value: "ticket.deletion" },
  { label: "Product Creation", value: "product.creation" },
  { label: "Product Deletion", value: "product.deletion" },
  { label: "Line Item Creation", value: "line_item.creation" },
  { label: "Line Item Deletion", value: "line_item.deletion" },
  { label: "Conversation Creation", value: "conversation.creation" },
  { label: "Conversation Deletion", value: "conversation.deletion" },
  { label: "Conversation New Message", value: "conversation.newMessage" },
  {
    label: "Conversation Privacy Deletion",
    value: "conversation.privacyDeletion",
  },
  { label: "Contact Merge", value: "contact.merge" },
  { label: "Company Merge", value: "company.merge" },
  { label: "Deal Merge", value: "deal.merge" },
  { label: "Ticket Merge", value: "ticket.merge" },
  { label: "Product Merge", value: "product.merge" },
  { label: "Line Item Merge", value: "line_item.merge" },
  { label: "Contact Restore", value: "contact.restore" },
  { label: "Company Restore", value: "company.restore" },
  { label: "Deal Restore", value: "deal.restore" },
  { label: "Ticket Restore", value: "ticket.restore" },
  { label: "Product Restore", value: "product.restore" },
  { label: "Line Item Restore", value: "line_item.restore" },
  { label: "Contact Association Change", value: "contact.associationChange" },
  { label: "Company Association Change", value: "company.associationChange" },
  { label: "Deal Association Change", value: "deal.associationChange" },
  { label: "Ticket Association Change", value: "ticket.associationChange" },
  {
    label: "Line Item Association Change",
    value: "line_item.associationChange",
  },
];
export const EVENT_TYPES_PROPERTY_CHANGE = [
  { label: "Contact Property Change", value: "contact.propertyChange" },
  { label: "Company Property Change", value: "company.propertyChange" },
  { label: "Deal Property Change", value: "deal.propertyChange" },
  { label: "Ticket Property Change", value: "ticket.propertyChange" },
  { label: "Product Property Change", value: "product.propertyChange" },
  { label: "Line Item Property Change", value: "line_item.propertyChange" },
  {
    label: "Conversation Property Change",
    value: "conversation.propertyChange",
  },
];
export const SUCCESS_MESSAGE = "All webhooks deleted successfully";
export const MAX_SEARCH_LIMIT = 200;
export const MAX_SEARCH_RESULTS = 10000;
export const BATCHED_WINDOW_LIMIT = 1000;
export const POLL_REQUEST_TIMEOUT_MS = 10000;
export const CUSTOM_OBJECT_LAST_MODIFIED_PROPERTY = "hs_lastmodifieddate";
export const CUSTOM_OBJECT_CREATED_PROPERTY = "hs_createdate";
export const CUSTOM_OBJECT_SEARCH_ENDPOINT =
  "/crm/v3/objects/{objectType}/search";
export const MAX_FILTER_GROUPS = 5;
export const MAX_FILTERS_PER_GROUP = 6;
export const MAX_FILTERS_TOTAL = 18;
export const SEARCH_ENDPOINTS = [
  { label: "Companies", value: "/crm/v3/objects/companies/search" },
  { label: "Contacts", value: "/crm/v3/objects/contacts/search" },
  { label: "Custom objects", value: "/crm/v3/objects/{objectType}/search" },
  { label: "Deals", value: "/crm/v3/objects/deals/search" },
  {
    label: "Feedback submissions",
    value: "/crm/v3/objects/feedback_submissions/search",
  },
  { label: "Line items", value: "/crm/v3/objects/line_items/search" },
  { label: "Products", value: "/crm/v3/objects/products/search" },
  { label: "Quotes", value: "/crm/v3/objects/quotes/search" },
  { label: "Tickets", value: "/crm/v3/objects/tickets/search" },
  { label: "Calls", value: "/crm/v3/objects/calls/search" },
  { label: "Emails", value: "/crm/v3/objects/emails/search" },
  { label: "Meetings", value: "/crm/v3/objects/meetings/search" },
  { label: "Notes", value: "/crm/v3/objects/notes/search" },
  { label: "Tasks", value: "/crm/v3/objects/tasks/search" },
];
export const HUBSPOT_DATE_PROPERTIES = {
  "/crm/v3/objects/carts/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/companies/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/contacts/search": {
    createdate: "createdate",
    lastmodifieddate: "lastmodifieddate",
  },
  "/crm/v3/objects/deals/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/deal_split/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/discounts/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/feedback_submissions/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/fees/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/invoices/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/leads/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/line_items/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/orders/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/commerce_payments/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/products/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/quotes/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/subscriptions/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/taxes/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/tickets/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/calls/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/emails/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/meetings/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/notes/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/tasks/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
};
export const ENGAGEMENT_OBJECTS = [
  { label: "Tasks", value: "tasks" },
  { label: "Postal Mail", value: "postal_mail" },
  { label: "Notes", value: "notes" },
  { label: "Meetings", value: "meetings" },
  { label: "Calls", value: "calls" },
  { label: "Emails", value: "emails" },
  { label: "Communications", value: "communications" },
];
export const ENGAGEMENT_PROPERTIES = [
  { label: "Task - Timestamp", value: "hs_timestamp" },
  { label: "Task - Body", value: "hs_task_body" },
  { label: "Task - Owner ID", value: "hubspot_owner_id" },
  { label: "Task - Subject", value: "hs_task_subject" },
  { label: "Task - Status", value: "hs_task_status" },
  { label: "Task - Priority", value: "hs_task_priority" },
  { label: "Task - Type", value: "hs_task_type" },
  { label: "Postal Mail - Timestamp", value: "hs_timestamp" },
  { label: "Postal Mail - Body", value: "hs_postal_mail_body" },
  { label: "Postal Mail - Owner ID", value: "hubspot_owner_id" },
  { label: "Postal Mail - Attachment IDs", value: "hs_attachment_ids" },
  { label: "Note - Timestamp", value: "hs_timestamp" },
  { label: "Note - Body", value: "hs_note_body" },
  { label: "Note - Owner ID", value: "hubspot_owner_id" },
  { label: "Note - Attachment IDs", value: "hs_attachment_ids" },
  { label: "Meeting - Timestamp", value: "hs_timestamp" },
  { label: "Meeting - Title", value: "hs_meeting_title" },
  { label: "Meeting - Owner ID", value: "hubspot_owner_id" },
  { label: "Meeting - Body", value: "hs_meeting_body" },
  { label: "Meeting - Internal Notes", value: "hs_internal_meeting_notes" },
  { label: "Meeting - External URL", value: "hs_meeting_external_URL" },
  { label: "Meeting - Location", value: "hs_meeting_location" },
  { label: "Meeting - Start Time", value: "hs_meeting_start_time" },
  { label: "Meeting - End Time", value: "hs_meeting_end_time" },
  { label: "Meeting - Outcome", value: "hs_meeting_outcome" },
  { label: "Meeting - Activity Type", value: "hs_activity_type" },
  { label: "Meeting - Attachment IDs", value: "hs_attachment_ids" },
  { label: "Call - Timestamp", value: "hs_timestamp" },
  { label: "Call - Body", value: "hs_call_body" },
  { label: "Call - Callee Object ID", value: "hs_call_callee_object_id" },
  {
    label: "Call - Callee Object Type ID",
    value: "hs_call_callee_object_type_id",
  },
  { label: "Call - Direction", value: "hs_call_direction" },
  { label: "Call - Disposition", value: "hs_call_disposition" },
  { label: "Call - Duration", value: "hs_call_duration" },
  { label: "Call - From Number", value: "hs_call_from_number" },
  { label: "Call - Recording URL", value: "hs_call_recording_url" },
  { label: "Call - Status", value: "hs_call_status" },
  { label: "Call - Title", value: "hs_call_title" },
  { label: "Call - To Number", value: "hs_call_to_number" },
  { label: "Call - Owner ID", value: "hubspot_owner_id" },
  { label: "Call - Activity Type", value: "hs_activity_type" },
  { label: "Call - Attachment IDs", value: "hs_attachment_ids" },
  { label: "Email - Timestamp", value: "hs_timestamp" },
  { label: "Email - Owner ID", value: "hubspot_owner_id" },
  { label: "Email - Direction", value: "hs_email_direction" },
  { label: "Email - HTML", value: "hs_email_html" },
  { label: "Email - Status", value: "hs_email_status" },
  { label: "Email - Subject", value: "hs_email_subject" },
  { label: "Email - Text", value: "hs_email_text" },
  { label: "Email - Attachment IDs", value: "hs_attachment_ids" },
  { label: "Email - Headers", value: "hs_email_headers" },
  {
    label: "Communication - Channel Type",
    value: "hs_communication_channel_type",
  },
  {
    label: "Communication - Logged From",
    value: "hs_communication_logged_from",
  },
  { label: "Communication - Body", value: "hs_communication_body" },
  { label: "Communication - Timestamp", value: "hs_timestamp" },
];
export const OBJECT_ID_PROPERTY = "hs_object_id";
export const RATE_LIMIT_MAX_ATTEMPTS = 5;
export const RATE_LIMIT_FALLBACK_DELAY_MS = 1000;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const COMPANY_PROPS = ["name", "state", "city", "domain", "industry"];
export const CONTACT_PROPS = [
  "firstname",
  "lastname",
  "email",
  "company",
  "website",
  "phone",
];
export const DEAL_PROPS = ["dealname", "closedate", "dealstage"];
export const DEAL_SEARCH_PROPS = [
  "hs_object_id",
  "createdate",
  "hubspot_owner_id",
  "dealstage",
  "amount",
  "dealname",
  "closedate",
  "days_to_close",
  "hs_analytics_source",
  "hs_analytics_source_data_1",
  "hs_analytics_source_data_2",
  "hs_campaign",
  "hs_closed_amount",
  "hs_lastmodifieddate",
  "dealtype",
  "description",
];
