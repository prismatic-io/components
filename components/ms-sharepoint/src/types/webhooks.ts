export type LifecycleEvent = "reauthorizationRequired" | "subscriptionRemoved" | "missed";

export interface Subscription {
  id: string;
  resource: string;
  changeType: string;
  notificationUrl: string;
}

export interface DriveSubscriptionParams {
  resource: string;
  changeType: string;
  clientState?: string;
}

export interface WebhookNotification {
  subscriptionId: string;
  changeType: string;
  resource: string;
  clientState?: string;
  resourceData?: {
    "@odata.type": string;
    "@odata.id": string;
    id: string;
  };
  subscriptionExpirationDateTime?: string;
  tenantId?: string;
}

export interface LifecycleNotification {
  subscriptionId: string;
  lifecycleEvent: LifecycleEvent;
  subscriptionExpirationDateTime?: string;
  tenantId?: string;
  clientState?: string;
}

export interface GraphNotificationPayload {
  value: Array<WebhookNotification | LifecycleNotification>;
}
