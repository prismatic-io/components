import type { Message } from "@microsoft/microsoft-graph-types";

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
  watermark?: string;
  boundaryIds?: string[];
  classifySince?: string;
  backfillActive?: boolean;
  folderId?: string;
}

export interface WatermarkPosition {
  watermark: string;
  boundaryIds: string[];
}

export interface PollingCursor
  extends WatermarkPosition,
    Record<string, unknown> {
  classifySince: string;
  folderId?: string;
}

export interface MessageChangesObject {
  created: Message[];
  updated: Message[];
}

export interface MessageChange {
  changeType: "created" | "updated";
  record: Message;
}

export interface PaginatedResponse<T> {
  "@odata.context": string;
  value: T[];
  "@odata.nextLink"?: string;
}

export interface MessagesWindowParams {
  position: WatermarkPosition;
  horizonISO: string;
  pageSize: number;
  maxPages: number;
  folderId?: string;
}

export interface PollingWindowRequest {
  position: WatermarkPosition;
  skipFetch: boolean;
  batching: boolean;
  debug: boolean;
  now: Date;
  folderId?: string;
}

export interface MessagesWindow {
  messages: Message[];
  position: WatermarkPosition;
  drained: boolean;
}

export interface PollingStream {
  position: WatermarkPosition;
  classifySince: string;
}
