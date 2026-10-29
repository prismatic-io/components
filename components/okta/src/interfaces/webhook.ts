import type { Connection, KeyValuePair } from "@prismatic-io/spectral";

export interface Webhook {
  id: string;
  status: string;
  verificationStatus: string;
  name: string;
  description: null | string;
  created: string;
  createdBy: string;
  lastUpdated: string;
  events: Events;
  channel: Channel;
  _links: Links;
}

interface Links {
  self: Self;
  verify: Deactivate;
  deactivate: Deactivate;
}

interface Deactivate {
  href: string;
  hints: Hints;
}

interface Hints {
  allow: string[];
}

interface Self {
  href: string;
}

interface Channel {
  type: string;
  version: string;
  config: Config;
}

interface Config {
  uri: string;
  headers: string[];
  method: string;
  authScheme: AuthScheme;
}

interface AuthScheme {
  type: string;
  key: string;
}

interface Events {
  type: string;
  items: string[];
  filter: Filter | null;
}

interface Filter {
  type: string;
  eventFilterMap: EventFilterMap[];
}

interface EventFilterMap {
  event: string;
  condition: Condition;
}

interface Condition {
  version: string | null;
  expression: string;
}

export interface EventHookDeletion {
  id: string;
  deleted: boolean;
}

export interface CreateEventHookData {
  eventHookName: string;
  eventHookUrl: string;
  eventHookItems: string[];
  eventHookItemsCode?: string[] | object;
  eventHookDescription?: string;
  eventHookFilter?: Record<string, string> | object;
  eventHookUrlHeaders?: KeyValuePair[];
}

export type CreateEventHookTriggerData = Omit<
  CreateEventHookData,
  "eventHookName" | "eventHookUrl" | "eventHookDescription"
> & {
  connection: Connection;
};
