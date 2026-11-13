export interface Subscription {
  id: string;
  notificationUrl: string;
  resource: string;
  changeType: string;
  [key: string]: unknown;
}

export interface DriveSubscriptionParams {
  resource: string;
  changeType: string;
  clientState?: string;
}
