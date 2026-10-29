import type { WEBHOOK_EVENTS } from "../constants";

export type WebhookEventFlag = (typeof WEBHOOK_EVENTS)[number]["value"];

export interface HookRef {
  projectId: string;
  hookId: number;
}

export interface WebhookConfig {
  projects: string[];
  events: WebhookEventFlag[];
  branchFilter: string | null;
}

export interface WebhookState {
  secret: string;
  hooks: HookRef[];
  config: WebhookConfig;
}
