import type { TicketPriority, TicketStatus, TicketType } from "./common";
export interface Ticket {
  assignee_id: number;
  collaborator_ids: number[];
  created_at: string;
  custom_fields: CustomField[];
  custom_status_id: number;
  description: string;
  due_at: string | null;
  external_id: string;
  follower_ids: number[];
  from_messaging_channel: boolean;
  group_id: number;
  has_incidents: boolean;
  id: number;
  organization_id: number;
  priority: TicketPriority;
  problem_id: number;
  raw_subject: string;
  recipient: string;
  requester_id: number;
  satisfaction_rating: SatisfactionRating;
  sharing_agreement_ids: number[];
  status: TicketStatus;
  subject: string;
  submitter_id: number;
  tags: string[];
  type: TicketType;
  updated_at: string;
  url: string;
  via: Via;
}
export interface CustomField {
  id: number;
  value: string;
}
export interface SatisfactionRating {
  comment: string;
  id: number;
  score: string;
}
export interface Via {
  channel: string;
}
export interface TicketChange {
  changeType: "created" | "updated";
  record: Ticket;
}
export interface TicketChangesObject {
  created?: Ticket[];
  updated?: Ticket[];
}
export interface IncrementalTicketsResponse {
  tickets: Ticket[];
  after_cursor: string;
  after_url: string;
  end_of_stream: boolean;
  before_cursor?: string;
  before_url?: string;
  count?: number;
}
