import type { Connection } from "@prismatic-io/spectral";





export type Sort = "relevant" | "name" | "member_count" | "created";
export type SortDir = "desc" | "asc";

type search_channel_types =
  | "private"
  | "private_exclude"
  | "archived"
  | "exclude_archived"
  | "private_exclude_archived"
  | "multi_workspace"
  | "org_wide"
  | "external_shared_exclude"
  | "external_shared"
  | "external_shared_private"
  | "external_shared_archived"
  | "exclude_org_shared";

export type SearchChannelType = search_channel_types[];

export type SearchAllSort = "timestamp" | "score";





export interface AuthTestResponse {
  ok: boolean;
  error: string;
}

export interface CreateClientProps {
  slackConnection?: Connection;
}





export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface SlackMessage extends Record<string, unknown> {
  ts?: string;
  type?: string;
  user?: string;
  text?: string;
  thread_ts?: string;
}
