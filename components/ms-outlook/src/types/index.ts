
export interface ODataAttrs {
  "@odata.id"?: string;
  "@odata.etag"?: string;
  "@odata.context"?: string;
  "@odata.type"?: string;
}


export interface ODataQueryParams {
  $top?: string | number;
  $skip?: string;
  $search?: string;
  $filter?: string;
}

export interface SubscriptionBody {
  value: SubscriptionData[];
}

export interface SubscriptionData {
  subscriptionId: string;
  subscriptionExpirationDateTime: string;
  changeType: string;
  resource: string;
  resourceData: ResourceData;
  clientState: string | null;
  tenantId: string;
  [key: string]: unknown;
}

export interface ResourceData {
  "@odata.type": string;
  "@odata.id": string;
  "@odata.etag": string;
  id: string;
}

export interface WebhookResourceConfig {
  endpoint: string;
  dataKey: string;
}


export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string; 
}

export interface PaginatedResponse<T> {
  "@odata.context": string;
  value: T[];
  "@odata.nextLink"?: string;
}
