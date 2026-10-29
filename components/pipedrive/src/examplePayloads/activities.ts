const activityRecord = {
  id: 1,
  company_id: 12882925,
  user_id: 18487521,
  done: false,
  type: "call",
  reference_type: null,
  reference_id: null,
  conference_meeting_client: null,
  conference_meeting_url: null,
  conference_meeting_id: null,
  due_date: "2024-10-15",
  due_time: "10:00",
  duration: "00:30",
  busy_flag: true,
  add_time: "2024-09-27 14:25:27",
  marked_as_done_time: null,
  last_notification_time: null,
  last_notification_user_id: null,
  notification_language_id: null,
  subject: "Follow-up call with client",
  public_description: "Discuss contract renewal",
  calendar_sync_include_context: null,
  location: null,
  org_id: 2,
  person_id: 3,
  deal_id: 1,
  lead_id: null,
  project_id: null,
  active_flag: true,
  update_time: "2024-09-27 14:25:28",
  update_user_id: 18487521,
  source_timezone: null,
  rec_rule: null,
  rec_rule_extension: null,
  rec_master_activity_id: null,
  series: [],
  attendees: null,
  participants: [
    {
      person_id: 3,
      primary_flag: true,
    },
  ],
  org_name: "Acme Corp",
  person_name: "John Doe",
  deal_title: "Enterprise License Deal",
  owner_name: "Developer",
  person_dropbox_bcc: "test-sandbox+person3@pipedrivemail.com",
  deal_dropbox_bcc: "test-sandbox+deal1@pipedrivemail.com",
  assigned_to_user_id: 18487521,
  note: "Remember to prepare pricing sheet",
};

export const getActivitiesExamplePayload = {
  data: {
    success: true,
    data: [activityRecord],
    additional_data: {
      next_cursor:
        "eyJmaWVsZCI6ImlkIiwiZmllbGRWYWx1ZSI6MSwiZmllbGRUeXBlIjoiaW50IiwiZGlyZWN0aW9uIjoiZGVzYyJ9",
    },
  },
};

export const deleteActivityExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};

export const getActivityExamplePayload = {
  data: {
    success: true,
    data: activityRecord,
  },
};
