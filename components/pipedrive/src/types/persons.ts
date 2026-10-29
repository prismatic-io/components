export interface Person {
  id: number;
  company_id: number;
  owner_id: OwnerID;
  org_id: OrgID;
  name: string;
  first_name: string;
  last_name: string | null;
  open_deals_count: number;
  related_open_deals_count: number;
  closed_deals_count: number;
  related_closed_deals_count: number;
  participant_open_deals_count: number;
  participant_closed_deals_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  won_deals_count: number;
  related_won_deals_count: number;
  lost_deals_count: number;
  related_lost_deals_count: number;
  active_flag: boolean;
  phone: Email[];
  email: Email[];
  first_char: string;
  update_time: string;
  delete_time: string | null;
  add_time: string;
  visible_to: string;
  picture_id: string | null;
  next_activity_date: string | null;
  next_activity_time: string | null;
  next_activity_id: string | null;
  last_activity_id: string | null;
  last_activity_date: string | null;
  last_incoming_mail_time: string | null;
  last_outgoing_mail_time: string | null;
  label: string | null;
  label_ids: Record<string, unknown>[];
  im: Email[];
  postal_address: string | null;
  postal_address_lat: string | null;
  postal_address_long: string | null;
  postal_address_subpremise: string | null;
  postal_address_street_number: string | null;
  postal_address_route: string | null;
  postal_address_sublocality: string | null;
  postal_address_locality: string | null;
  postal_address_admin_area_level_1: string | null;
  postal_address_admin_area_level_2: string | null;
  postal_address_country: string | null;
  postal_address_postal_code: string | null;
  postal_address_formatted_address: string | null;
  notes: string | null;
  birthday: string | null;
  job_title: string | null;
  org_name: string;
  owner_name: string;
  primary_email: string | null;
  cc_email: string;
}

export interface Email {
  value: string;
  primary: boolean;
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

export interface OwnerID {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string | null;
  active_flag: boolean;
  value: number;
}
