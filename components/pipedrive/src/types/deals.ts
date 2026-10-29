export interface Deal {
  id: number;
  creator_user_id: UserID;
  user_id: UserID;
  person_id: PersonID;
  org_id: OrgID;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time: string | null;
  active: boolean;
  deleted: boolean;
  status: string;
  probability: string | null;
  next_activity_date: string | null;
  next_activity_time: string | null;
  next_activity_id: string | null;
  last_activity_id: string | null;
  last_activity_date: string | null;
  lost_reason: string | null;
  visible_to: string;
  close_time: string | null;
  pipeline_id: number;
  won_time: string | null;
  first_won_time: string | null;
  lost_time: string | null;
  products_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  participants_count: number;
  expected_close_date: string | null;
  last_incoming_mail_time: string | null;
  last_outgoing_mail_time: string | null;
  label: string | null;
  local_won_date: string | null;
  local_lost_date: string | null;
  local_close_date: string | null;
  origin: string;
  origin_id: string | null;
  channel: string | null;
  channel_id: string | null;
  stage_order_nr: number;
  person_name: string;
  org_name: string;
  next_activity_subject: string | null;
  next_activity_type: string | null;
  next_activity_duration: string | null;
  next_activity_note: string | null;
  formatted_value: string;
  weighted_value: number;
  formatted_weighted_value: string;
  weighted_value_currency: string;
  rotten_time: string | null;
  owner_name: string;
  cc_email: string;
  org_hidden: boolean;
  person_hidden: boolean;
}

export interface UserID {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string | null;
  active_flag: boolean;
  value: number;
}

export interface OrgID {
  name: string;
  people_count: number;
  owner_id: number;
  address: string | null;
  active_flag: boolean;
  cc_email: string;
  label_ids: Record<string, unknown>[];
  owner_name: string;
  value: number;
}

export interface PersonID {
  active_flag: boolean;
  name: string;
  email: Email[];
  phone: Email[];
  owner_id: number;
  value: number;
}

export interface Email {
  value: string;
  primary: boolean;
}
