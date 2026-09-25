export const ticketPriorities = ["high", "low", "normal", "urgent"] as const;
export const ticketStatuses = [
  "closed",
  "hold",
  "new",
  "open",
  "pending",
  "solved",
] as const;
export const ticketTypes = ["incident", "problem", "question", "task"] as const;
export const userRoles = ["admin", "agent", "end-user"] as const;
export const webhookEvents = [
  "conditional_ticket_events",
  "zen:event-type:organization.created",
  "zen:event-type:organization.custom_field_changed",
  "zen:event-type:organization.deleted",
  "zen:event-type:organization.external_id_changed",
  "zen:event-type:organization.name_changed",
  "zen:event-type:organization.tags_changed",
  "zen:event-type:ticket.agent_assignment_changed",
  "zen:event-type:ticket.attachment_linked_to_comment",
  "zen:event-type:ticket.attachment_redacted_from_comment",
  "zen:event-type:ticket.brand_changed",
  "zen:event-type:ticket.comment_added",
  "zen:event-type:ticket.comment_made_private",
  "zen:event-type:ticket.comment_redacted",
  "zen:event-type:ticket.created",
  "zen:event-type:ticket.csat_received",
  "zen:event-type:ticket.csat_requested",
  "zen:event-type:ticket.custom_field_changed",
  "zen:event-type:ticket.custom_status_changed",
  "zen:event-type:ticket.description_changed",
  "zen:event-type:ticket.email_ccs_changed",
  "zen:event-type:ticket.external_id_changed",
  "zen:event-type:ticket.followers_changed",
  "zen:event-type:ticket.form_changed",
  "zen:event-type:ticket.group_assignment_changed",
  "zen:event-type:ticket.marked_as_spam",
  "zen:event-type:ticket.merged",
  "zen:event-type:ticket.next_sla_breach_changed",
  "zen:event-type:ticket.ola_policy_changed",
  "zen:event-type:ticket.organization_changed",
  "zen:event-type:ticket.permanently_deleted",
  "zen:event-type:ticket.priority_changed",
  "zen:event-type:ticket.problem_link_changed",
  "zen:event-type:ticket.requester_changed",
  "zen:event-type:ticket.schedule_changed",
  "zen:event-type:ticket.sla_policy_changed",
  "zen:event-type:ticket.soft_deleted",
  "zen:event-type:ticket.status_changed",
  "zen:event-type:ticket.subject_changed",
  "zen:event-type:ticket.submitter_changed",
  "zen:event-type:ticket.tags_changed",
  "zen:event-type:ticket.task_due_at_changed",
  "zen:event-type:ticket.type_changed",
  "zen:event-type:ticket.undeleted",
  "zen:event-type:user.active_changed",
  "zen:event-type:user.alias_changed",
  "zen:event-type:user.created",
  "zen:event-type:user.custom_field_changed",
  "zen:event-type:user.custom_role_changed",
  "zen:event-type:user.default_group_changed",
  "zen:event-type:user.deleted",
  "zen:event-type:user.details_changed",
  "zen:event-type:user.external_id_changed",
  "zen:event-type:user.group_membership_created",
  "zen:event-type:user.group_membership_deleted",
  "zen:event-type:user.identity_changed",
  "zen:event-type:user.identity_created",
  "zen:event-type:user.identity_deleted",
  "zen:event-type:user.last_login_changed",
  "zen:event-type:user.merged",
  "zen:event-type:user.name_changed",
  "zen:event-type:user.notes_changed",
  "zen:event-type:user.only_private_comments_changed",
  "zen:event-type:user.organization_membership_created",
  "zen:event-type:user.organization_membership_deleted",
  "zen:event-type:user.password_changed",
  "zen:event-type:user.photo_changed",
  "zen:event-type:user.role_changed",
  "zen:event-type:user.suspended_changed",
  "zen:event-type:user.tags_changed",
  "zen:event-type:user.time_zone_changed",
];
export const zendeskLocales = [
  "de",
  "en-us",
  "es",
  "fr",
  "it",
  "ja",
  "ko",
  "pt-br",
  "zh-cn",
];
export const articleSortByOptions = [
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
  { label: "Title", value: "title" },
  { label: "Edited At", value: "edited_at" },
  { label: "Position", value: "position" },
];
export const EXAMPLE_TIMESTAMP = "1735689600";
export const postFilterByOptions = [
  {
    label: "Planned",
    value: "planned",
  },
  {
    label: "Not Planned",
    value: "not_planned",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Answered",
    value: "answered",
  },
  {
    label: "None",
    value: "none",
  },
];
export const postSortByOptions = [
  {
    label: "Created At",
    value: "created_at",
  },
  {
    label: "Updated At",
    value: "updated_at",
  },
  {
    label: "Position",
    value: "position",
  },
  {
    label: "Edited At",
    value: "edited_at",
  },
  {
    label: "Recent Activity",
    value: "recent_activity",
  },
  {
    label: "Votes",
    value: "votes",
  },
  {
    label: "Comment Count",
    value: "comments",
  },
];
export const SUCCESS_MESSAGE = "Success executing action";
export const DATA_SOURCE_PAGE_SIZE = 30;
export const TRIGGER_BATCH_SIZE = 50;
export const INCREMENTAL_START_TIME_OFFSET_SECONDS = 60;
export const INCREMENTAL_PAGE_SIZE = 1000;
export const BATCHED_INCREMENTAL_PAGE_SIZE = 100;
export const MAX_PAGES_PER_POLL = 10;
export const BATCHED_MAX_PAGES_PER_POLL = 1;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const defaultWebhookTriggerMessageBody = {
  current_user: {
    details: "{{current_user.details}}",
    email: "{{current_user.email}}",
    external_id: "{{current_user.external_id}}",
    first_name: "{{current_user.first_name}}",
    language: "{{current_user.language}}",
    name: "{{current_user.name}}",
    notes: "{{current_user.notes}}",
    "organization.details": "{{current_user.organization.details}}",
    "organization.name": "{{current_user.organization.name}}",
    "organization.notes": "{{current_user.organization.notes}}",
    phone: "{{current_user.phone}}",
    tags: "{{current_user.tags}}",
  },
  ticket: {
    account: "{{ticket.account}}",
    assignee: {
      first_name: "{{ticket.assignee.first_name}}",
      last_name: "{{ticket.assignee.last_name}}",
      name: "{{ticket.assignee.name}}",
    },
    brand: {
      name: "{{ticket.brand.name}}",
    },
    cc_names: "{{ticket.cc_names}}",
    ccs: "{{ticket.ccs}}",
    comments_formatted: "{{ticket.comments_formatted}}",
    description: "{{ticket.description}}",
    due_date: "{{ticket.due_date}}",
    email_cc_names: "{{ticket.email_cc_names}}",
    email_ccs: "{{ticket.email_ccs}}",
    external_id: "{{ticket.external_id}}",
    follower_names: "{{ticket.follower_names}}",
    follower_reply_type_message: "{{ticket.follower_reply_type_message}}",
    followers: "{{ticket.followers}}",
    group: {
      name: "{{ticket.group.name}}",
    },
    id: "{{ticket.id}}",
    in_business_hours: "{{ticket.in_business_hours}}",
    latest_comment_formatted: "{{ticket.latest_comment_formatted}}",
    latest_public_comment_formatted:
      "{{ticket.latest_public_comment_formatted}}",
    link: "{{ticket.link}}",
    organization: {
      external_id: "{{ticket.organization.external_id}}",
      name: "{{ticket.organization.name}}",
    },
    priority: "{{ticket.priority}}",
    public_comments_formatted: "{{ticket.public_comments_formatted}}",
    requester: {
      email: "{{ticket.requester.email}}",
      external_id: "{{ticket.requester.external_id}}",
      first_name: "{{ticket.requester.first_name}}",
      language: "{{ticket.requester.language}}",
      last_name: "{{ticket.requester.last_name}}",
      name: "{{ticket.requester.name}}",
      phone: "{{ticket.requester.phone}}",
    },
    status: "{{ticket.status}}",
    tags: "{{ticket.tags}}",
    ticket_field_ID: "{{ticket.ticket_field_ID}}",
    ticket_field_option_title_ID: "{{ticket.ticket_field_option_title_ID}}",
    ticket_form: "{{ticket.ticket_form}}",
    ticket_type: "{{ticket.ticket_type}}",
    title: "{{ticket.title}}",
    via: "{{ticket.via}}",
  },
};
export const defaultWebhookTriggerConditions = {
  all: [],
  any: [
    { field: "status", operator: "changed" },
    { field: "status", operator: "not_changed" },
  ],
};
