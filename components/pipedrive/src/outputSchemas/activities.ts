const activityRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    company_id: { type: "integer" },
    user_id: { type: "integer" },
    done: { type: "boolean" },
    type: { type: "string" },
    reference_type: { type: "string" },
    reference_id: { type: "integer" },
    conference_meeting_client: { type: "string" },
    conference_meeting_url: { type: "string" },
    conference_meeting_id: { type: "string" },
    due_date: { type: "string" },
    due_time: { type: "string" },
    duration: { type: "string" },
    busy_flag: { type: "boolean" },
    add_time: { type: "string" },
    marked_as_done_time: { type: "string" },
    last_notification_time: { type: "string" },
    last_notification_user_id: { type: "integer" },
    notification_language_id: { type: "integer" },
    subject: { type: "string" },
    public_description: { type: "string" },
    calendar_sync_include_context: { type: "string" },
    location: { type: "string" },
    org_id: { type: "integer" },
    person_id: { type: "integer" },
    deal_id: { type: "integer" },
    lead_id: { type: "string" },
    project_id: { type: "integer" },
    active_flag: { type: "boolean" },
    update_time: { type: "string" },
    update_user_id: { type: "integer" },
    source_timezone: { type: "string" },
    rec_rule: { type: "string" },
    rec_rule_extension: { type: "string" },
    rec_master_activity_id: { type: "integer" },
    series: { type: "array", items: {} },
    attendees: { type: "array", items: {} },
    participants: {
      type: "array",
      items: {
        type: "object",
        properties: {
          person_id: { type: "integer" },
          primary_flag: { type: "boolean" },
        },
      },
    },
    org_name: { type: "string" },
    person_name: { type: "string" },
    deal_title: { type: "string" },
    owner_name: { type: "string" },
    person_dropbox_bcc: { type: "string" },
    deal_dropbox_bcc: { type: "string" },
    assigned_to_user_id: { type: "integer" },
    note: { type: "string" },
  },
};
export const getActivitiesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: activityRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            next_cursor: { type: "string" },
          },
        },
      },
    },
  },
};
export const deleteActivityOutputSchema = {
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
export const getActivityOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: activityRecordSchema,
      },
    },
  },
};
