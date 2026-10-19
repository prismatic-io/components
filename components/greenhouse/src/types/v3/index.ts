import type { Application } from "../v1/Applications";
export interface V3Application {
  id: number;
  candidate_id: number;
  job_id: number | null;
  job_post_id: number | null;
  referrer_id: number | null;
  source_id: number | null;
  recruiter_id: number | null;
  coordinator_id: number | null;
  stage_id: number | null;
  stage_name: string | null;
  status: "in_process" | "rejected" | "hired" | "converted";
  prospect: boolean;
  needs_decision: boolean;
  rejection_reason_id: number | null;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  custom_fields: Record<string, unknown> | null;
  answers: Array<{
    question: string;
    answer: string | null;
  }>;
  prospective_job_ids?: number[];
  [key: string]: unknown;
}
export interface V3Candidate {
  id: number;
  first_name: string;
  last_name: string;
  company: string | null;
  title: string | null;
  created_at: string;
  updated_at: string;
  last_activity: string | null;
  is_private: boolean;
  email_addresses: Array<{
    value: string;
    type: string;
  }>;
  phone_numbers: Array<{
    value: string;
    type: string;
  }>;
  addresses: Array<{
    value: string;
    type: string;
  }>;
  website_addresses: Array<{
    value: string;
    type: string;
  }>;
  social_media_addresses: Array<{
    value: string;
  }>;
  tags: string[];
  custom_fields: Record<string, unknown> | null;
  [key: string]: unknown;
}
export interface V3Attachment {
  id: number;
  application_id: number;
  candidate_id: number | null;
  type: string;
  filename: string;
  url: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}
export interface V3Job {
  id: number;
  name: string;
  requisition_id: string | null;
  status: "open" | "closed" | "draft";
  confidential: boolean;
  is_template: boolean | null;
  copied_from_id: number | null;
  department_id: number | null;
  office_ids: number[];
  created_at: string;
  opened_at: string | null;
  closed_at: string | null;
  updated_at: string;
  notes: string | null;
  custom_fields: Record<string, unknown> | null;
  [key: string]: unknown;
}
export interface V3User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  primary_email: string | null;
  updated_at: string;
  created_at: string;
  deactivated: boolean;
  site_admin: boolean;
  emails: string[];
  employee_id: string | null;
  [key: string]: unknown;
}
export interface V3RejectionReason {
  id: number;
  name: string;
  [key: string]: unknown;
}
export interface V3Department {
  id: number;
  name: string;
  parent_id: number | null;
  [key: string]: unknown;
}
export interface V3Office {
  id: number;
  name: string;
  parent_id: number | null;
  [key: string]: unknown;
}
export interface V3CustomField {
  id: number;
  name: string;
  field_type: string;
  [key: string]: unknown;
}
export interface V3ApplicationChangesObject {
  created: Application[];
  updated: Application[];
}
export interface V3ApplicationChange {
  changeType: "created" | "updated";
  record: Application;
}
export interface V3PollWindowStart extends Record<string, unknown> {
  since: string;
  drainStartedAt: string;
  backfill: boolean;
  after?: string;
}
export interface V3PollingCursor extends V3PollWindowStart {
  after: string;
}
export interface V3PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  cursor?: V3PollingCursor;
}
