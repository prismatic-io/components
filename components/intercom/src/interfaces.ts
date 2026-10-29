export interface Pages {
  type: string;
  page: number;
  per_page: number;
  next: {
    starting_after: string | undefined;
  } | null;
  total_pages: number;
}

export interface Company {
  type: string;
  company_id: string;
  id: string;
  app_id: string;
  name: string;
  remote_created_at: number;
  created_at: number;
  updated_at: number;
  monthly_spend: number;
  session_count: number;
  user_count: number;
  tags: Tags;
  segments: Segments;
  plan: CustomAttributes;
  custom_attributes: CustomAttributes;
}

export interface CustomAttributes {
  [key: string]: unknown;
}

export interface Segments {
  type: string;
  segments: unknown[];
}

export interface Tags {
  type: string;
  tags: unknown[];
}

export interface Contact {
  type: string;
  id: string;
  external_id: string;
  workspace_id: string;
  role: string;
  email: string;
  email_domain: string;
  phone: string;
  formatted_phone: string;
  name: string;
  owner_id: number;
  has_hard_bounced: boolean;
  marked_email_as_spam: boolean;
  unsubscribed_from_emails: boolean;
  created_at: number;
  updated_at: number;
  signed_up_at: number;
  last_seen_at: number;
  last_replied_at: number;
  last_contacted_at: number;
  last_email_opened_at: number;
  last_email_clicked_at: number;
  language_override: string;
  browser: string;
  browser_version: string;
  browser_language: string;
  os: string;
  android_app_name: string;
  android_app_version: string;
  android_device: string;
  android_os_version: string;
  android_sdk_version: string;
  android_last_seen_at: number;
  ios_app_name: string;
  ios_app_version: string;
  ios_device: string;
  ios_os_version: string;
  ios_sdk_version: string;
  ios_last_seen_at: number;
  custom_attributes: CustomAttributes;
  avatar: Avatar;
  tags: Companies;
  notes: Companies;
  companies: Companies;
  location: Location;
  social_profiles: SocialProfiles;
}

export interface Avatar {
  type: string;
  image_url: string;
}

export interface Companies {
  url: string;
  total_count: number;
  has_more: boolean;
  data?: CompaniesDatum[];
}

export interface CompaniesDatum {
  type: string;
  id: string;
  url: string;
}

export interface Location {
  type: string;
  country: string;
  region: string;
  city: string;
}

export interface SocialProfiles {
  data: SocialProfilesDatum[];
}

export interface SocialProfilesDatum {
  type: string;
  name: string;
  url: string;
}

export interface Tag {
  id: string;
  name: string;
  type: string;
}
export interface Ticket {
  type: "ticket";
  id: string;
  ticket_id: string;
  category: string;
  ticket_attributes: {
    _default_title_: string;
    _default_description_: string;
  };
  open: boolean;
}

export interface TicketType {
  type: "ticket_type";
  id: string;
  name: string;
  description: string;
  icon: string;
  workspace_id: string;
  archived: boolean;
  created_at: number;
  updated_at: number;
  is_internal: boolean;
  ticket_type_attributes: Record<string, unknown>;
  category: string;
}
