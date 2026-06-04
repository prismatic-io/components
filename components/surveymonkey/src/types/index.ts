











import type { Connection } from "@prismatic-io/spectral";








export interface PaginationLinks {
  self: string;
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}








export interface PaginatedResponse<T> {
  data: T[];
  per_page?: number;
  page?: number;
  total: number;
  links?: PaginationLinks;
}





export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  language?: string;
  account_type?: string;
  date_created?: string;
  date_last_login?: string;
  href: string;
}





export interface Survey {
  id: string;
  title: string;
  nickname?: string;
  custom_variables?: Record<string, string>;
  language?: string;
  question_count?: number;
  page_count?: number;
  date_created?: string;
  date_modified?: string;
  href: string;
}




export interface SurveyDetails extends Survey {
  pages: SurveyPage[];
  preview?: string;
  edit_url?: string;
  collect_url?: string;
  analyze_url?: string;
  summary_url?: string;
}

export interface SurveyPage {
  id: string;
  title: string;
  description?: string;
  position: number;
  question_count: number;
  questions?: SurveyQuestion[];
  href: string;
}

export interface SurveyQuestion {
  id: string;
  family: string;
  subtype: string;
  heading: string;
  position: number;
  required?: boolean;
  sorting?: string;
  answers?: QuestionAnswer;
  href: string;
}

export interface QuestionAnswer {
  choices?: AnswerChoice[];
  rows?: AnswerRow[];
  other?: AnswerOther;
}

export interface AnswerChoice {
  id: string;
  text: string;
  position: number;
  visible?: boolean;
  is_na?: boolean;
  weight?: number;
}

export interface AnswerRow {
  id: string;
  text: string;
  position: number;
  visible?: boolean;
}

export interface AnswerOther {
  id: string;
  text: string;
  position: number;
  visible?: boolean;
  is_answer_choice?: boolean;
}










export type CollectorType =
  | "weblink"
  | "email"
  | "social"
  | "embedded"
  | "popup";

export type CollectorStatus = "open" | "closed" | "new";

export interface Collector {
  id: string;
  name: string;
  type: CollectorType;
  status: CollectorStatus;
  redirect_url?: string;
  thank_you_page?: string;
  thank_you_message?: string;
  disqualification_message?: string;
  close_date?: string;
  closed_page_message?: string;
  allow_multiple_responses?: boolean;
  date_created?: string;
  date_modified?: string;
  url?: string;
  edit_url?: string;
  anonymous_type?: string;
  href: string;
}

export interface CollectorStats {
  id: string;
  completed: number;
  partial: number;
  total: number;
  disqualified: number;
  started: number;
  unique_clicks: number;
}





export type ResponseStatus =
  | "completed"
  | "partial"
  | "disqualified"
  | "overquota";

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  collector_id: string;
  recipient_id?: string;
  total_time?: number;
  custom_value?: string;
  edit_url?: string;
  analyze_url?: string;
  ip_address?: string;
  response_status: ResponseStatus;
  custom_variables?: Record<string, string>;
  logic_path?: Record<string, unknown>;
  date_created?: string;
  date_modified?: string;
  href: string;
}




export interface SurveyResponseDetails extends SurveyResponse {
  pages: ResponsePage[];
  metadata?: ResponseMetadata;
}

export interface ResponsePage {
  id: string;
  questions: ResponseQuestion[];
}

export interface ResponseQuestion {
  id: string;
  answers: ResponseAnswer[];
}

export interface ResponseAnswer {
  choice_id?: string;
  row_id?: string;
  col_id?: string;
  other_id?: string;
  text?: string;
  tag_data?: string[];
}

export interface ResponseMetadata {
  contact?: ResponseContact;
}

export interface ResponseContact {
  email?: string;
  first_name?: string;
  last_name?: string;
}





export interface Contact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  custom_fields?: Record<string, string>;
  href: string;
}

export interface ContactList {
  id: string;
  name: string;
  href: string;
}

export interface ContactField {
  id: string;
  label: string;
  field_type: string;
  href: string;
}








export type WebhookEventType =
  | "response_completed"
  | "response_created"
  | "response_updated"
  | "response_deleted"
  | "response_disqualified"
  | "response_overquota"
  | "survey_created"
  | "survey_updated"
  | "survey_deleted"
  | "collector_created"
  | "collector_updated"
  | "collector_deleted";

export type WebhookObjectType = "survey" | "collector";

export interface Webhook {
  id: string;
  name: string;
  event_type: WebhookEventType;
  object_type?: WebhookObjectType;
  object_ids?: string[];
  subscription_url: string;
  authorization?: string;
  href: string;
}

export type EventsWebhookInputs = {
  connection: Connection;
  eventType: string;
  objectType: string | undefined;
  objectIds: string[] | undefined;
};




export interface WebhookPayload {
  name: string;
  filter_type: WebhookObjectType;
  filter_id: string;
  event_type: WebhookEventType;
  event_id: string;
  object_type: string;
  object_id: string;
  event_datetime: string;
  resources: WebhookResources;
}

export interface WebhookResources {
  survey_id?: string;
  collector_id?: string;
  respondent_id?: string;
  recipient_id?: string;
  user_id?: string;
}





export interface SurveyMonkeyError {
  error: {
    id: string;
    name: string;
    message: string;
    http_status_code: number;
    docs?: string;
  };
}








export interface CreateSurveyInput {
  title: string;
  nickname?: string;
  from_template_id?: string;
  from_survey_id?: string;
  language?: string;
}




export interface CreateCollectorInput {
  type: CollectorType;
  name?: string;
  thank_you_message?: string;
  disqualification_message?: string;
  close_date?: string;
  closed_page_message?: string;
  redirect_url?: string;
  allow_multiple_responses?: boolean;
}




export interface CreateContactInput {
  email: string;
  first_name?: string;
  last_name?: string;
  custom_fields?: Record<string, string>;
}




export interface CreateContactListInput {
  name: string;
}




export interface CreateWebhookInput {
  name: string;
  event_type: WebhookEventType;
  object_type?: WebhookObjectType;
  object_ids?: string[];
  subscription_url: string;
  authorization?: string;
}

export type RegionKey = "us" | "eu" | "ca";
