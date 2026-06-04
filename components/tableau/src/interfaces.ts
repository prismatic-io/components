export interface Webhook {
  id: string;
  name: string;
  isEnabled: boolean;
  event: string;
  "webhook-destination": {
    "webhook-destination-http": {
      url: string;
      method: string;
    };
  };
}

export interface ListWebhoks {
  webhooks: {
    webhook: Webhook[];
  };
}

export interface TableauTriggerPayload {
  resource: string;
  event_type: string;
  resource_name: string;
  site_luid: string;
  resource_luid: string;
  created_at: string;
}
