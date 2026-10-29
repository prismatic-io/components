import type { calendar_v3 } from "@googleapis/calendar";
import type {
  ActionContext,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { MAX_BATCHED_PAGE_SIZE } from "../constants";
import type {
  CategorizedEventChanges,
  PollEventsCursor,
  PollEventsTriggerParams,
  PollEventsTriggerState,
  ProcessedEvent,
} from "../types";
import { listAllEvents } from "./listAllEvents";
import { retrieveIncrementalChanges } from "./retrieveIncrementalChanges";

const classifyEvent = (
  event: calendar_v3.Schema$Event,
): ProcessedEvent["changeType"] => {
  if (event.status === "cancelled") return "deleted";
  if (!event.created || !event.updated) return "unknown";
  const createdTime = new Date(event.created).getTime();
  const updatedTime = new Date(event.updated).getTime();
  return updatedTime - createdTime < 1000 ? "created" : "updated";
};

const processEvents = (
  events: calendar_v3.Schema$Event[],
): {
  processedEvents: ProcessedEvent[];
  createdEvents: ProcessedEvent[];
  updatedEvents: ProcessedEvent[];
  deletedEvents: ProcessedEvent[];
} => {
  const createdEvents: ProcessedEvent[] = [];
  const updatedEvents: ProcessedEvent[] = [];
  const deletedEvents: ProcessedEvent[] = [];

  const processedEvents = events.map((event) => {
    const changeType = classifyEvent(event);
    const processed: ProcessedEvent = {
      changeType,
      id: event.id,
      summary: event.summary || "[No title]",
      status: event.status,
      start: event.start,
      end: event.end,
      created: event.created,
      updated: event.updated,
      organizer: event.organizer?.email,
      attendees: event.attendees?.map((a) => ({
        email: a.email,
        responseStatus: a.responseStatus,
        optional: a.optional,
      })),
      location: event.location,
      description: event.description,
      recurringEventId: event.recurringEventId,
      htmlLink: event.htmlLink,
    };

    if (changeType === "created") createdEvents.push(processed);
    else if (changeType === "updated") updatedEvents.push(processed);
    else if (changeType === "deleted") deletedEvents.push(processed);

    return processed;
  });

  return { processedEvents, createdEvents, updatedEvents, deletedEvents };
};

export const pollEventsTriggerPerform = async (
  context: ActionContext & PollingContext,
  payload: TriggerPayload,
  { connection, calendarId, lookBackDate }: PollEventsTriggerParams,
) => {
  const pollState = context.polling.getState() as PollEventsTriggerState;
  const isBatching = context.batch?.enabled === true;
  const incoming = payload.paginationState as PollEventsCursor | undefined;
  const newLastPolledAt = incoming?.drainStartedAt ?? new Date().toISOString();

  let syncToken = incoming?.syncToken ?? pollState.syncToken;
  let events: calendar_v3.Schema$Event[] = [];
  let nextPageToken: string | undefined;
  let drained = true;

  try {
    if (incoming?.pageToken) {
      const response = await listAllEvents({
        googleConnection: connection,
        calendarId,
        pageToken: incoming.pageToken,
        fetchAll: false,
        maxResults: MAX_BATCHED_PAGE_SIZE,
        singleEvents: true,
        showDeleted: true,
      });
      events = response.data.items || [];
      nextPageToken = response.data.nextPageToken;
      if (response.data.nextSyncToken) {
        syncToken = response.data.nextSyncToken;
      }
      drained = !nextPageToken;
    } else if (syncToken) {
      if (isBatching) {
        const response = await listAllEvents({
          googleConnection: connection,
          calendarId,
          syncToken,
          fetchAll: false,
          maxResults: MAX_BATCHED_PAGE_SIZE,
          singleEvents: true,
          showDeleted: true,
        });
        events = response.data.items || [];
        nextPageToken = response.data.nextPageToken;
        if (response.data.nextSyncToken) {
          syncToken = response.data.nextSyncToken;
        }
        drained = !nextPageToken;
      } else {
        const result = await retrieveIncrementalChanges(
          connection,
          calendarId,
          syncToken,
        );
        events = result.events;
        syncToken = result.nextSyncToken;
      }
    } else {
      if (context.debug.enabled) {
        context.logger.info("No sync token found, performing initial sync");
      }

      const updatedMin = lookBackDate
        ? new Date(`${lookBackDate}T00:00:00Z`).toISOString()
        : newLastPolledAt;

      const response = await listAllEvents({
        googleConnection: connection,
        calendarId,
        updatedMin,
        fetchAll: !isBatching,
        maxResults: isBatching ? MAX_BATCHED_PAGE_SIZE : undefined,
        singleEvents: true,
        showDeleted: true,
      });

      syncToken = response.data.nextSyncToken;
      nextPageToken = response.data.nextPageToken;
      events = response.data.items || [];
      drained = !nextPageToken;

      if (!isBatching) {
        events = lookBackDate ? events : [];
      }
    }
  } catch (e: unknown) {
    const syncError = e as Error & { response?: { status: number } };
    if (syncError.response?.status === 410) {
      if (context.debug.enabled) {
        context.logger.warn(
          "Sync token is no longer valid, performing incremental sync from last polled date",
        );
      }

      const resyncTimeMin = pollState.lastPolledAt;
      if (context.debug.enabled) {
        context.logger.info(`Resyncing from ${resyncTimeMin}`);
      }

      const initialResponse = await listAllEvents({
        googleConnection: connection,
        calendarId,
        updatedMin: resyncTimeMin,
        fetchAll: !isBatching,
        maxResults: isBatching ? MAX_BATCHED_PAGE_SIZE : undefined,
        singleEvents: true,
        showDeleted: true,
      });

      syncToken = initialResponse.data.nextSyncToken;
      nextPageToken = initialResponse.data.nextPageToken;
      events = initialResponse.data.items || [];
      drained = !nextPageToken;

      if (!syncToken && drained) {
        throw new Error("No sync token found after resync");
      }
    } else {
      throw syncError;
    }
  }

  const { processedEvents, createdEvents, updatedEvents, deletedEvents } =
    processEvents(events);

  let nextPaginationState: PollEventsCursor = null;
  if (!drained) {
    nextPaginationState = {
      ...(syncToken ? { syncToken } : {}),
      pageToken: nextPageToken as string,
      drainStartedAt: newLastPolledAt,
    };
  }

  const stateUpdate: PollEventsTriggerState = {
    syncToken,
    lastPolledAt: drained ? newLastPolledAt : pollState.lastPolledAt,
  };
  context.polling.setState(stateUpdate as PollEventsTriggerState);

  const changes: CategorizedEventChanges = {
    summary: {
      totalChanges: processedEvents.length,
      created: createdEvents.length,
      updated: updatedEvents.length,
      deleted: deletedEvents.length,
      syncTokenAvailable: !!syncToken,
    },
    createdEvents,
    updatedEvents,
    deletedEvents,
    allChanges: processedEvents,
  };

  const polledNoChanges =
    processedEvents.length === 0 && nextPaginationState === null && !incoming;

  return {
    payload: {
      ...payload,
      paginationState: nextPaginationState ?? undefined,
      body: {
        data: {
          changes,
          calendarId,
          syncToken,
        },
      },
    },
    polledNoChanges,
  };
};
