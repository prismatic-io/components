export interface WebhookNotification {
  subscriptionId: string;
  clientState?: string;
  changeType: string;
  resource: string;
  resourceData?: {
    "@odata.type": string;
    "@odata.id": string;
    id: string;
  };
  subscriptionExpirationDateTime?: string;
  tenantId?: string;
}

export interface WebhookNotificationPayload {
  value: WebhookNotification[];
}
