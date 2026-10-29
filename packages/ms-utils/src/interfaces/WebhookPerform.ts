import type { Connection } from "@prismatic-io/spectral";
import type {
  BoundaryActionContext as ActionContext,
  BoundaryTriggerPayload,
  BoundaryHttpClient as HttpClient,
  BoundaryHttpResponse as HttpResponse,
} from "./boundary";

export interface SubscriptionNotification {
  subscriptionId: string;
  subscriptionExpirationDateTime: string;
  changeType: string;
  resource: string;
  resourceData: {
    "@odata.type": string;
    "@odata.id": string;
    "@odata.etag": string;
    id: string;
  };
  clientState: string | null;
  tenantId: string;
  [key: string]: unknown;
}

export interface SubscriptionBody {
  value: SubscriptionNotification[];
}

export type ResourceFetchCallback = (
  client: HttpClient,
  notification: SubscriptionNotification,
  context: ActionContext,
  params: Record<string, unknown>,
) => Promise<{ key: string; data: Record<string, unknown> } | undefined>;

export interface CreateMsWebhookPerformOptions {
  createClient: (connection: Connection, debug: boolean) => HttpClient;
  renewalExpirationMinutes: number;
  fetchResourceData?: ResourceFetchCallback;
}

export interface WebhookPerformResult<
  TPayload extends BoundaryTriggerPayload = BoundaryTriggerPayload,
> {
  payload: TPayload;
  response: HttpResponse;
  branch: string;
  crossFlowState?: Record<string, unknown>;
}

export interface ScheduledRenewalResult {
  newSubscriptionId?: string;
  usedUrlFallback: boolean;
  renewedCount: number;
}
