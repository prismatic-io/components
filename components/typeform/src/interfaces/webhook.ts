import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface Webhook {
  created_at: string;
  enabled: boolean;
  event_types: EventTypes;
  form_id: string;
  id: string;
  tag: string;
  updated_at: string;
  url: string;
  verify_ssl: boolean;
}

export interface EventTypes {
  form_response: boolean;
  form_response_partial: boolean;
}

export interface CreateWebhook {
  client: HttpClient;
  formId: string;
  tag: string;
  secret: string;
  form_response: boolean;
  form_response_partial: boolean;
  enabled: boolean;
  url: string | undefined;
}

export interface DeleteWebhook {
  client: HttpClient;
  formId: string;
  tag: string;
}
