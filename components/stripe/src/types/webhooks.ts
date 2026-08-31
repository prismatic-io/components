export interface CreatedWebhook {
  webhook?: {
    id: string;
    object: string;
    api_version: string;
    application: string;
    created: number;
    description: string;
    enabled_events: string[];
    livemode: boolean;
    metadata: Record<string, unknown>;
    secret: string;
    status: string;
    url: string;
  };
}
