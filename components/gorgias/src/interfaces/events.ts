import type { CreateApiPaginationResponse } from "../types";

interface Event {
  id: number;
  context: string | null;
  created_datetime: string | null;
  data: Record<string, unknown>;
  object_id: number;
  object_type: string;
  type: string;
  user_id: number;
  url: string;
}

export type GetEventResponse = Event;

export type ListEventsResponse = CreateApiPaginationResponse<Event>;
