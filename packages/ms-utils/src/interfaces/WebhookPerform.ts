import type {
  Connection,
  HttpResponse,
  TriggerPayload,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";

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

export interface WebhookPerformResult {
  payload: TriggerPayload;
  response: HttpResponse;
  branch: string;
  crossFlowState?: Record<string, unknown>;
}

export interface ScheduledRenewalResult {
  newSubscriptionId?: string;
  usedUrlFallback: boolean;
  renewedCount: number;
}
