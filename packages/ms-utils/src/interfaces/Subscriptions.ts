export interface GraphSubscription {
  id?: string;
  resource: string;
  changeType: string;
  notificationUrl: string;
  expirationDateTime: string;
  clientState?: string;
  latestSupportedTlsVersion?: string;
  creatorId?: string;
}

export interface GraphSubscriptionList {
  "@odata.context": string;
  value: GraphSubscription[];
}

export interface CreateSubscriptionData {
  resource: string;
  changeType: string;
  notificationUrl: string;
  expirationDateTime: string;
  allowDuplicates?: boolean;
  clientState?: string;
  customHeaders?: Array<{ key: string; value: string }>;
  customBody?: Record<string, unknown>;
}

export interface CreateSubscriptionTriggerData {
  resource: string;
  changeType: string;
  customHeaders?: Array<{ key: string; value: string }>;
  clientState?: string;
  expirationDateTime?: string;
  allowDuplicates?: boolean;
  notificationUrl?: string;
}

export interface SubscriptionDeletion {
  id: string;
  deleted: boolean;
}

export interface PaginatedResponse<T> {
  "@odata.context": string;
  value: T[];
  "@odata.nextLink"?: string;
}
