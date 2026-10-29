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

export interface ListWebhooks {
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

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface TableauRecord extends Record<string, unknown> {
  id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChangesObject {
  created?: TableauRecord[];
  updated?: TableauRecord[];
}

export interface RecordChange {
  changeType: "created" | "updated";
  record: TableauRecord;
}
