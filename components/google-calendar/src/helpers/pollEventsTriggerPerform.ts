import type { calendar_v3 } from "@googleapis/calendar";
import type {
  ActionContext,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import type {
  CategorizedEventChanges,
  PollEventsTriggerParams,
  PollEventsTriggerState,
  ProcessedEvent,
} from "../types";
import { listAllEvents } from "./listAllEvents";
import { retrieveIncrementalChanges } from "./retrieveIncrementalChanges";

export const pollEventsTriggerPerform = async (
  context: ActionContext & PollingContext,
  payload: TriggerPayload,
  { connection, calendarId }: PollEventsTriggerParams
) => {
  let polledNoChanges = true;
  const pollState = context.polling.getState() as PollEventsTriggerState;
  const newLastPolledAt = new Date().toISOString();

  let syncToken = pollState.syncToken;
  let events: calendar_v3.Schema$Event[] = [];

  try {
    if (syncToken) {
      const result = await retrieveIncrementalChanges(
        connection,
        calendarId,
        syncToken
      );
      events = result.events;
      syncToken = result.nextSyncToken;
    } else {
      if (context.debug.enabled) {
        context.logger.info("No sync token found, performing initial sync");
      }

      const response = await listAllEvents({
        googleConnection: connection,
        calendarId,
        timeMin: newLastPolledAt,
        fetchAll: true,
        singleEvents: true,
        showDeleted: true,
      });

      syncToken = response.data.nextSyncToken;
      events = [];
    }
  } catch (e: unknown) {
    const syncError = e as Error & { response?: { status: number } };
    
    if (syncError.response?.status === 410) {
      if (context.debug.enabled) {
        context.logger.warn(
          "Sync token is no longer valid, performing incremental sync from last polled date"
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
        fetchAll: true,
        singleEvents: true,
        showDeleted: true,
      });

      syncToken = initialResponse.data.nextSyncToken;
      events = initialResponse.data.items || [];

      if (!syncToken) {
        throw new Error("No sync token found after resync");
      }
    } else {
      throw syncError;
    }
  }

  let processedEvents: ProcessedEvent[] = [];
  const createdEvents: ProcessedEvent[] = [];
  const updatedEvents: ProcessedEvent[] = [];
  const deletedEvents: ProcessedEvent[] = [];

  if (events.length > 0) {
    processedEvents = events.map((event) => {
      let changeType: ProcessedEvent["changeType"];
      if (event.status === "cancelled") {
        changeType = "deleted";
      } else if (!event.created || !event.updated) {
        changeType = "unknown";
      } else {
        const createdTime = new Date(event.created).getTime();
        const updatedTime = new Date(event.updated).getTime();
        changeType = updatedTime - createdTime < 1000 ? "created" : "updated";
      }

      const processedEvent: ProcessedEvent = {
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

      if (changeType === "created") {
        createdEvents.push(processedEvent);
      } else if (changeType === "updated") {
        updatedEvents.push(processedEvent);
      } else if (changeType === "deleted") {
        deletedEvents.push(processedEvent);
      }

      return processedEvent;
    });
    polledNoChanges = false;
  }

  context.polling.setState({
    syncToken,
    lastPolledAt: newLastPolledAt,
  } as PollEventsTriggerState);

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

  return {
    payload: {
      ...payload,
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
