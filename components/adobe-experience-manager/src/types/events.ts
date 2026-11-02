import type {
  ActionContext,
  Connection,
  TriggerEventFunctionReturn,
} from "@prismatic-io/spectral";

export type AemSitesEventCode =
  | "aem.sites.contentFragment.created"
  | "aem.sites.contentFragment.modified"
  | "aem.sites.contentFragment.published"
  | "aem.sites.contentFragment.unpublished"
  | "aem.sites.contentFragment.deleted"
  | "aem.sites.page.created"
  | "aem.sites.page.modified"
  | "aem.sites.page.published"
  | "aem.sites.page.unpublished"
  | "aem.sites.page.deleted";

export type AemAssetsEventCode =
  | "aem.assets.asset.processing_completed"
  | "aem.assets.asset.metadata_updated"
  | "aem.assets.asset.published"
  | "aem.assets.asset.unpublished"
  | "aem.assets.asset.deleted";

type AemEventCode = AemSitesEventCode | AemAssetsEventCode;

export interface AemCloudEvent {
  id?: string;
  source?: string;
  type?: AemEventCode | (string & {});
  time?: string;
  specversion?: string;
  recipientclientid?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface AemEventEnvelope {
  eventId: string | null;
  eventSource: string | null;
  eventType: string | null;
}

export interface AemWebhookFlowState {
  registrationId: string;
  previousClientId: string;
  previousEventTypes: string[];
  previousProviderId: string;
  previousWorkspace: string;
}

export interface IoEventsRegistration {
  registration_id: string;
  webhook_url?: string;
  delivery_type?: string;
  [key: string]: unknown;
}

export interface IoEventsRegistrationListResponse {
  _embedded?: { registrations?: IoEventsRegistration[] };
}

export interface RegistrationParams {
  connection: Connection;
  consumerOrgId: string;
  projectId: string;
  workspaceId: string;
  providerId: string;
  eventTypes: string[];
}

type AemEventTriggerParams = RegistrationParams & { publishBaseUrl?: string };

export interface AemEventLifecycleHandlers {
  create: (
    context: ActionContext,
    params: AemEventTriggerParams,
  ) => Promise<TriggerEventFunctionReturn | undefined>;
  delete: (
    context: ActionContext,
    params: AemEventTriggerParams,
  ) => Promise<TriggerEventFunctionReturn>;
}
