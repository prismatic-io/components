import type { calendar_v3 } from "@googleapis/calendar";
import type { ActionLogger, Connection } from "@prismatic-io/spectral";

export type CalendarWatch = {
  channelId: string;
  resourceId: string;
  expiration: string;
};

export type ManageWatchParams = {
  calendar: calendar_v3.Calendar;
  calendarId: string;
  webhookAddress: string;
  newChannelId: string;
  previousWatch?: CalendarWatch;
  logger: ActionLogger;
};

export type StopWatchParams = {
  calendar: calendar_v3.Calendar;
  channelId: string;
  resourceId: string;
};

export type CalendarChangeEventsInputs = {
  connection: Connection;
  calendarId: string;
};

export type PollEventsTriggerParams = {
  connection: Connection;
  calendarId: string;
};

export type PollEventsTriggerState = {
  syncToken: string | undefined;
  lastPolledAt: string | undefined;
};

export type ProcessedEvent = {
  changeType: "created" | "updated" | "deleted" | "unknown";
  id?: string;
  summary: string;
  status?: string;
  start?: calendar_v3.Schema$EventDateTime;
  end?: calendar_v3.Schema$EventDateTime;
  created?: string;
  updated?: string;
  organizer?: string;
  attendees?: Array<{
    email?: string;
    responseStatus?: string;
    optional?: boolean;
  }>;
  location?: string;
  description?: string;
  recurringEventId?: string;
  htmlLink?: string;
};

export type EventChangeSummary = {
  totalChanges: number;
  created: number;
  updated: number;
  deleted: number;
  syncTokenAvailable: boolean;
  syncTokenUpdated?: boolean;
};

export type CategorizedEventChanges = {
  summary: EventChangeSummary;
  createdEvents: ProcessedEvent[];
  updatedEvents: ProcessedEvent[];
  deletedEvents: ProcessedEvent[];
  allChanges: ProcessedEvent[];
};
