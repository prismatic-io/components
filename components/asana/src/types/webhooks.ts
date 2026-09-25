import type { Connection } from "@prismatic-io/spectral";
import type { Task } from "./resources";
export interface AsanaFilter {
  resource_type?: string;
  resource_subtype?: string;
  action: string;
  fields?: string[];
}
export interface AsanaWebhook {
  gid: string;
  active: boolean;
  resource: {
    gid: string;
    name: string;
    resource_type?: string;
  };
  resource_type?: string;
  target: string;
}
export type Event = {
  action: string;
  change?: {
    action: string;
    added_value?: {
      gid: string;
      resource_type: string;
    };
    field: string;
    new_value?: {
      gid: string;
      resource_type: string;
    };
    removed_value?: {
      gid: string;
      resource_type: string;
    };
  };
  created_at: string;
  parent?: {
    gid: string;
    resource_type: string;
    name: string;
  } | null;
  resource: {
    gid: string;
    resource_type: string;
    name: string;
  };
  type?: string;
  user?: {
    gid: string;
    resource_type: string;
    name: string;
  } | null;
  task?: object;
  story?: object;
};
export type CachedTasks = Record<string, Task | Record<string, never>>;
export type CachedStories = Record<string, Record<string, unknown>>;
export type WebhookFilterSettings = {
  triggerWhenAdded: boolean;
  triggerWhenChanged: boolean;
  triggerWhenDeleted: boolean;
  triggerWhenRemoved: boolean;
  triggerWhenUndeleted: boolean;
};
export interface CreateWebhookParams {
  endpoint: string;
  resourceId: string;
  filters?: AsanaFilter[];
  asanaConnection: Connection;
}
export interface DeleteWebhookParams {
  endpoint: string;
  resourceId: string;
  asanaConnection: Connection;
}
export type ResolvedWebhookSecrets = {
  value: string[];
  isLegacy: boolean;
};
export type ResolvedWebhookSecret = {
  value: string;
  isLegacy: boolean;
};
