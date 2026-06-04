export interface WebhookSubscription {
  id: string;
  endpoint: {
    callbackUrl: string;
  };
  topic: string;
  createdAt: string;
  updatedAt: string;
  format: string;
  includeFields: string[];
  metafieldNamespaces: string[];
  apiVersion: {
    displayName: string;
  };
}
