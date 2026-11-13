export interface WebhookNotification {
  subscriptionId: string;
  changeType: string;
  resource: string;
  clientState?: string | null;
  resourceData?: {
    "@odata.type": string;
    "@odata.id": string;
    id: string;
  };
  subscriptionExpirationDateTime?: string;
  tenantId?: string;
}

export type LifecycleEvent =
  | "reauthorizationRequired"
  | "subscriptionRemoved"
  | "missed";

export interface LifecycleNotification {
  subscriptionId: string;
  lifecycleEvent: LifecycleEvent;
  subscriptionExpirationDateTime?: string;
  tenantId?: string;
  clientState?: string | null;
}

export interface GraphNotificationPayload {
  value: Array<WebhookNotification | LifecycleNotification>;
}
