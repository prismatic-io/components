import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  BATCHED_INCREMENTAL_PAGE_SIZE,
  BATCHED_MAX_PAGES_PER_POLL,
  INCREMENTAL_PAGE_SIZE,
  MAX_PAGES_PER_POLL,
} from "../constants";
import type {
  IncrementalTicketsResponse,
  Ticket,
  TicketChange,
  TicketChangesObject,
} from "../types";
export const fetchTicketsWindow = async (
  client: HttpClient,
  startCursor: string | undefined,
  startTime: number,
  pageSize: number,
  maxPages: number,
): Promise<{
  tickets: Ticket[];
  afterCursor: string;
  endOfStream: boolean;
}> => {
  const allTickets: Ticket[] = [];
  let cursor = startCursor;
  let afterCursor = startCursor ?? "";
  let endOfStream = false;
  for (let page = 0; page < maxPages; page++) {
    const params: Record<string, string | number> = { per_page: pageSize };
    if (cursor) {
      params.cursor = cursor;
    } else {
      params.start_time = startTime;
    }
    const { data } = await client.get<IncrementalTicketsResponse>(
      "/incremental/tickets/cursor",
      { params },
    );
    if (Array.isArray(data.tickets)) {
      allTickets.push(...data.tickets);
    }
    afterCursor = data.after_cursor;
    cursor = data.after_cursor;
    if (data.end_of_stream) {
      endOfStream = true;
      break;
    }
  }
  return { tickets: allTickets, afterCursor, endOfStream };
};
export const incrementalWindowBounds = (
  isBatching: boolean,
): {
  pageSize: number;
  maxPages: number;
} =>
  isBatching
    ? {
        pageSize: BATCHED_INCREMENTAL_PAGE_SIZE,
        maxPages: BATCHED_MAX_PAGES_PER_POLL,
      }
    : { pageSize: INCREMENTAL_PAGE_SIZE, maxPages: MAX_PAGES_PER_POLL };
export const partitionTicketsByTimestamp = (
  tickets: Ticket[],
  sinceDate: Date,
): {
  created: Ticket[];
  updated: Ticket[];
} => {
  const created: Ticket[] = [];
  const updated: Ticket[] = [];
  for (const ticket of tickets) {
    const createdAt = ticket.created_at ? new Date(ticket.created_at) : null;
    if (createdAt && createdAt > sinceDate) {
      created.push(ticket);
    } else {
      updated.push(ticket);
    }
  }
  return { created, updated };
};
export const resolveTicketChanges = (
  data: TicketChangesObject | undefined,
): TicketChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): TicketChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): TicketChange => ({ changeType: "updated", record }),
    ),
  ];
};
