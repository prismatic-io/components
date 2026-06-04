import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";


export interface PaginatedResponse<T> {
  [key: string]: T[] | number | unknown;
  total_items: number;
}


export interface PaginatedRequestParams {
  
  client: HttpClient;
  
  endpoint: string;
  
  dataKey: string;
  
  fetchAll?: boolean;
  
  count?: number;
  
  offset?: number;
  
  params?: Record<string, unknown>;
}


export interface MailchimpList {
  id: string;
  name: string;
}


export interface MailchimpStore {
  id: string;
  name: string;
}


export interface MailchimpCampaign {
  id: string;
  settings: {
    title: string;
  };
}


export interface MailchimpCustomer {
  id: string;
  email_address: string;
}


export interface MailchimpProduct {
  id: string;
  title: string;
}


export interface MailchimpMember {
  id: string;
  email_address: string;
  full_name: string;
}


export interface MailchimpOrder {
  id: string;
  customer: {
    id: string;
    email_address: string;
  };
  order_total: number;
}


export interface MailchimpOrderLineItem {
  id: string;
  product_title: string;
  product_variant_title: string;
}


export interface MailchimpCart {
  id: string;
  customer: {
    id: string;
    email_address: string;
  };
  checkout_url: string;
}


export interface WebhookEvents {
  subscribe: boolean;
  unsubscribe: boolean;
  profile: boolean;
  cleaned: boolean;
  upemail: boolean;
  campaign: boolean;
}


export interface WebhookSources {
  user: boolean;
  admin: boolean;
  api: boolean;
}


export interface MailchimpWebhook {
  id: string;
  url: string;
  events: WebhookEvents;
  sources: WebhookSources;
  list_id: string;
}


export interface MailchimpWebhookPayload {
  type:
    | "subscribe"
    | "unsubscribe"
    | "profile"
    | "cleaned"
    | "upemail"
    | "campaign";
  fired_at: string;
  data: {
    id?: string;
    email?: string;
    email_type?: string;
    ip_opt?: string;
    ip_signup?: string;
    list_id?: string;
    merges?: Record<string, string>;
    reason?: string;
    new_email?: string;
    old_email?: string;
    subject?: string;
    status?: string;
  };
}
