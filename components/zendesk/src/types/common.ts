import type { Connection } from "@prismatic-io/spectral";
import type {
  ticketPriorities,
  ticketStatuses,
  ticketTypes,
  userRoles,
} from "../constants";
export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketStatus = (typeof ticketStatuses)[number];
export type TicketType = (typeof ticketTypes)[number];
export type UserRole = (typeof userRoles)[number];
export interface CreateClientProps {
  zendeskConnection: Connection;
  username?: string;
  debug?: boolean | undefined;
}
export interface ZendeskConnectionProps {
  username: string;
  token: string;
  remoteUri: string;
  subdomain: string;
  oauth: boolean;
}
export interface ValidateCommentParams {
  bodyValue: unknown;
  htmlValue: unknown;
  attachment?: Record<string, Record<string, unknown>>;
}
export interface Tag {
  count: number;
  name: string;
}
export interface UserSegment {
  id: string;
  name: string;
  built_in: boolean;
  created_at: string;
  group_ids: number[];
  or_tags: unknown[];
  organization_ids: number[];
  tags: string[];
  updated_at: string;
  user_type: string;
}
export interface PermissionGroup {
  id: number;
  name: string;
  built_in: boolean;
  publish: number[];
  edit: unknown[];
  created_at: string;
  updated_at: string;
}
