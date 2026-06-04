import {
  type ActionContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "../client";
import { ResourceState } from "../constants";
import type {
  CalendarChangeEventsInputs,
  CalendarWatch,
  CategorizedEventChanges,
  ProcessedEvent,
} from "../types";
import { getBase64FromUrl } from "../utils";
import { listAllEvents } from "./listAllEvents";
import { manageWatch } from "./manageWatch";
import { retrieveIncrementalChanges } from "./retrieveIncrementalChanges";

export const calendarChangeEventsPerform = async (
  context: ActionContext,
  payload: TriggerPayload,
  { connection, calendarId }: CalendarChangeEventsInputs
) => {
  const headers = util.types.lowerCaseHeaders(payload.headers);
  const invokeType = headers["prismatic-invoke-type"];
  const integrationFlowName = context.flow.name;
  const address = context.webhookUrls[integrationFlowName];
  const stateKey = getBase64FromUrl(address);
  const previousWatch = context.crossFlowState[stateKey] as
    | CalendarWatch
    | undefined;

  if (!previousWatch) {
    throw new Error("No previous watch found in state");
  }

  if (invokeType === "Scheduled") {
    if (context.debug.enabled)
      context.logger.info("Scheduled renewal triggered");

    const calendar = createClient({ connection });
    const newChannelId = uuidv4();

    const watchResult = await manageWatch({
      calendar,
      calendarId,
      webhookAddress: address,
      newChannelId,
      logger: context.logger,
      previousWatch,
    });

    context.crossFlowState[stateKey] = watchResult;

    payload.body.data = watchResult;

    return {
      payload,
      branch: "Log Messages",
      response: { statusCode: 200, contentType: "application/json" },
    };
  }

  let changeDetails = null;

  const resourceState = headers["x-goog-resource-state"];
  const resourceId = headers["x-goog-resource-id"];
  const changedFields = headers["x-goog-changed"];
  const channelId = headers["x-goog-channel-id"];

  const isValidChannel = channelId === previousWatch.channelId;
  const isValidResource = resourceId === previousWatch.resourceId;

  if (!isValidChannel || !isValidResource) {
    throw new Error(
      "Unauthorized webhook call: Channel or resource ID mismatch"
    );
  }

  if (resourceState === ResourceState.SYNC) {
    if (context.debug.enabled)
      context.logger.info("Sync notification received");

    payload.body.data = {
      notification: {
        resourceState,
        resourceId,
        timestamp: new Date().toISOString(),
        type: "sync",
      },
    };

    return {
      payload,
      branch: "Log Messages",
      response: { statusCode: 200, contentType: "application/json" },
    };
  }

  if (context.debug.enabled) context.logger.info("Notification received");

  if (resourceState === ResourceState.EXISTS) {
    const calendar = createClient({ connection });

    let calendarInfo = null;
    let changes: CategorizedEventChanges | null = null;
    let syncExpired = false;

    const calendarResponse = await calendar.calendars.get({
      calendarId,
    });

    calendarInfo = {
      id: calendarResponse.data.id,
      summary: calendarResponse.data.summary,
      description: calendarResponse.data.description,
      timeZone: calendarResponse.data.timeZone,
    };

    const syncStateKey = `${stateKey}_syncToken`;
    const previousSyncToken = context.crossFlowState[syncStateKey] as
      | string
      | undefined;

    let changedEvents: ProcessedEvent[] = [];
    let newSyncToken: string | undefined;

    if (!previousSyncToken) {
      throw new Error("No sync token found in state");
    }
    try {
      if (context.debug.enabled)
        context.logger.info("Using sync token to fetch incremental changes");

      const eventsResponse = await retrieveIncrementalChanges(
        connection,
        calendarId,
        previousSyncToken
      );

      if (eventsResponse.events && eventsResponse.events.length > 0) {
        changedEvents = eventsResponse.events.map((event) => {
          let changeType: ProcessedEvent["changeType"];
          if (event.status === "cancelled") {
            changeType = "deleted";
          } else if (!event.created || !event.updated) {
            changeType = "unknown";
          } else {
            const createdTime = new Date(event.created).getTime();
            const updatedTime = new Date(event.updated).getTime();
            changeType =
              updatedTime - createdTime < 1000 ? "created" : "updated";
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

          return processedEvent;
        });
      }

      newSyncToken = eventsResponse.nextSyncToken;
    } catch (e: unknown) {
      const syncError = e as Error & { response?: { status: number } };

      if (syncError?.response?.status === 410) {
        
        context.logger.warn("Sync token expired, re-establishing baseline");
        syncExpired = true;
        const lastListExecutedAtStateKey = `${stateKey}_lastListExecutedAt`;
        const lastListExecutedAt = context.crossFlowState[
          lastListExecutedAtStateKey
        ] as string | undefined;
        const response = await listAllEvents({
          googleConnection: connection,
          calendarId,
          updatedMin: lastListExecutedAt,
          fetchAll: true,
          singleEvents: true,
          showDeleted: true,
        });
        context.crossFlowState[lastListExecutedAtStateKey] =
          new Date().toISOString();
        newSyncToken = response.data.nextSyncToken;
      } else {
        throw syncError;
      }
    }

    if (!newSyncToken) {
      throw new Error("No new sync token found to continue incremental sync");
    }

    context.crossFlowState[syncStateKey] = newSyncToken;
    if (context.debug.enabled)
      context.logger.info("Updated sync token for next incremental sync");

    if (syncExpired) {
      changes = {
        summary: {
          totalChanges: 0,
          created: 0,
          updated: 0,
          deleted: 0,
          syncTokenAvailable: !!previousSyncToken,
          syncTokenUpdated: !!newSyncToken,
        },
        createdEvents: [],
        updatedEvents: [],
        deletedEvents: [],
        allChanges: [],
      };
      changeDetails = {
        calendar: calendarInfo,
        changes,
        notification: {
          resourceState: ResourceState.RESYNC,
          reason: "sync_token_expired",
          timestamp: new Date().toISOString(),
        },
      };
    } else {
      const createdEvents = changedEvents.filter(
        (e) => e.changeType === "created"
      );
      const updatedEvents = changedEvents.filter(
        (e) => e.changeType === "updated"
      );
      const deletedEvents = changedEvents.filter(
        (e) => e.changeType === "deleted"
      );

      changes = {
        summary: {
          totalChanges: changedEvents.length,
          created: createdEvents.length,
          updated: updatedEvents.length,
          deleted: deletedEvents.length,
          syncTokenAvailable: !!previousSyncToken,
          syncTokenUpdated: !!newSyncToken,
        },
        createdEvents,
        updatedEvents,
        deletedEvents,
        allChanges: changedEvents,
      };
      changeDetails = {
        calendar: calendarInfo,
        changes,
        notification: {
          resourceState,
          changedFields,
          resourceId,
          timestamp: new Date().toISOString(),
        },
      };
    }
  } else {
    changeDetails = {
      calendar: null,
      changes: null,
      notification: {
        resourceState,
        changedFields,
        resourceId,
        timestamp: new Date().toISOString(),
      },
    };
  }

  payload.body.data = changeDetails;

  return {
    payload,
    branch: "Push Notifications",
    response: { statusCode: 200, contentType: "application/json" },
  };
};
