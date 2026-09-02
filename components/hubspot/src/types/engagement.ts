export interface EngagementProperties {
  createdate: string;
  hs_lastmodifieddate: string;
  hs_object_id: number;
  hs_timestamp: string;
  hs_engagement_type: string;
  hs_task_subject?: string;
  hs_postal_mail_body?: string;
  hs_note_body?: string;
  hs_meeting_title?: string;
  hs_call_body?: string;
  hs_call_title?: string;
  hs_email_subject?: string;
  hs_communication_body?: string;
}
export interface Engagement {
  id: number;
  properties: EngagementProperties;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
