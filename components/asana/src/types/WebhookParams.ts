import type { Connection } from "@prismatic-io/spectral";
import type { AsanaFilter } from "./AsanaFilter";
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
