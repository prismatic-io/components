export const webhookEvents = [
  "conditional_ticket_events",
  "zen:event-type:organization.created",
  "zen:event-type:organization.custom_field_changed",
  "zen:event-type:organization.deleted",
  "zen:event-type:organization.external_id_changed",
  "zen:event-type:organization.name_changed",
  "zen:event-type:organization.tags_changed",
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

export const exampleTimestamp = new Date().getTime().toString();

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
