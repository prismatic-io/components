import type { CreateApiPaginationResponse } from "../types";

interface TicketMessage {
  id: number;
  attachments: {
    url: string;
    name: string;
    size: number | null;
    content_type: string;
    public: boolean;
    extra: string;
  }[];
  body_html: string | null;
  body_text: string | null;
  channel: string;
  created_datetime: string | null;
  external_id: string | null;
  failed_datetime: string | null;
  from_agent: boolean;
  integration_id: number;
  last_sending_error: null;
  message_id: string | null;
  receiver: {
    id: number;
    email: string | null;
    name: string | null;
    firstname: string;
    lastname: string;
    meta: null;
  };
  rule_id: number;
  sender: {
    id: number;
    email: string | null;
    name: string | null;
    firstname: string;
    lastname: string;
    meta: null;
  };
  sent_datetime: string | null;
  source: {
    type: string;
    to: { name: string; address: string }[];
    cc: { name: string; address: string }[];
    bcc: { name: string; address: string }[];
    from: { name: string; address: string };
  };
  stripped_html: string | null;
  stripped_text: string | null;
  subject: string | null;
  ticket_id: number;
  via: string;
  uri: string;
}

export type GetTicketMessageResponse = TicketMessage;

export type CreateTicketMessageResponse = TicketMessage;

export type ListMessagesResponse = CreateApiPaginationResponse<TicketMessage>;
