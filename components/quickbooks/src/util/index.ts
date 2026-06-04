import {
  type ActionContext,
  type Connection,
  ConnectionError,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import OAuthClient from "intuit-oauth";
import { quickbooksConnection } from "../connections";
import { MAX_RESULTS } from "../constants";
import type {
  CloudEventsWebhook,
  LegacyWebhook,
  NormalizedWebhookOutput,
  PaginatedDataRequest,
  ParsedQuickBooksEvent,
} from "../types";

export const checkConnectionKey = (connection: Connection): void => {
  if (connection.key !== quickbooksConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
};

export const getRealmId = (connection: Connection): string => {
  return util.types.toString(connection.context.realmId);
};

export const getBaseURL = (connection: Connection): string => {
  const baseURL = util.types.toBool(connection.fields.useSandbox)
    ? OAuthClient.environment.sandbox
    : OAuthClient.environment.production;
  return baseURL;
};

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const addStartPositionAndMaxResults = (
  queryString: string,
  startPosition: string,
  maxResults: string,
): string => {
  let result = queryString;
  if (startPosition) {
    result += ` startPosition ${startPosition}`;
  }
  if (maxResults) {
    result += ` maxResults ${maxResults}`;
  }
  return result;
};

export const paginatedData = async (
  request: PaginatedDataRequest,
): Promise<Record<string, unknown>[]> => {
  const { client, objectName, fetchAll, params } = request;
  let queryString = request.queryString;

  if (fetchAll) {
    const allObjects: Record<string, unknown>[] = [];
    let keepFetching = true;
    let startPosition = "0";
    do {
      queryString = addStartPositionAndMaxResults(
        queryString,
        startPosition,
        MAX_RESULTS.toString(),
      );
      const { data } = await client.get(`/query?query=${queryString}`);
      const objects = data.QueryResponse?.[objectName] || [];
      allObjects.push(...objects);
      startPosition = objects.length.toString();
      keepFetching = objects.length === MAX_RESULTS;
    } while (keepFetching);
    return allObjects;
  }
  queryString = addStartPositionAndMaxResults(
    queryString,
    params.startPosition,
    params.maxResults,
  );
  const { data } = await client.get(`/query?query=${queryString}`);
  const objects = data.QueryResponse?.[objectName] || [];
  return objects;
};

export function isCloudEventsFormat(
  payload: unknown,
): payload is CloudEventsWebhook {
  if (!Array.isArray(payload)) return false;
  if (payload.length === 0) return false;

  const firstEvent = payload[0];
  return (
    typeof firstEvent === "object" &&
    firstEvent !== null &&
    "specversion" in firstEvent &&
    "id" in firstEvent &&
    "source" in firstEvent &&
    "type" in firstEvent
  );
}

export function isLegacyFormat(payload: unknown): payload is LegacyWebhook {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "eventNotifications" in payload &&
    Array.isArray(payload?.eventNotifications)
  );
}

export function parseCloudEventsWebhook(
  webhook: CloudEventsWebhook,
): ParsedQuickBooksEvent[] {
  return webhook.map((event) => {
    const typeMatch = event.type.match(/^qbo\.(\w+)\.(\w+)/);
    const entity = typeMatch?.[1] || "unknown";
    const operation = typeMatch?.[2] || "unknown";

    return {
      id: event.id,
      entityId: event.intuitentityid || "",
      accountId: event.intuitaccountid || "",
      entity,
      operation,
      eventType: event.type,
      timestamp: event.time,
      source: event.source,
      specversion: event.specversion,
    };
  });
}

export function parseLegacyWebhook(
  webhook: LegacyWebhook,
): ParsedQuickBooksEvent[] {
  const events: ParsedQuickBooksEvent[] = [];

  for (const notification of webhook.eventNotifications) {
    const accountId = notification.realmId;

    if (notification.dataChangeEvent?.entities) {
      for (const entity of notification.dataChangeEvent.entities) {
        events.push({
          id: `${accountId}-${entity.id}-${entity.lastUpdated}`, 
          entityId: entity.id,
          accountId,
          entity: entity.name.toLowerCase(),
          operation: entity.operation.toLowerCase(),
          eventType: `legacy.${entity.name.toLowerCase()}.${entity.operation.toLowerCase()}`,
          timestamp: entity.lastUpdated,
          source: "legacy",
        });
      }
    }
  }

  return events;
}

export function parseQuickBooksWebhook(
  rawPayload: unknown,
  logger: ActionContext["logger"],
): NormalizedWebhookOutput {
  if (isCloudEventsFormat(rawPayload)) {
    logger.info("Detected CloudEvents format webhook");
    const events = parseCloudEventsWebhook(rawPayload);

    return {
      format: "cloudevents",
      eventCount: events.length,
      events,
      event: events[0],
      entityId: events[0]?.entityId || "",
      accountId: events[0]?.accountId || "",
      entity: events[0]?.entity || "",
      operation: events[0]?.operation || "",
      eventType: events[0]?.eventType || "",
      timestamp: events[0]?.timestamp,
    };
  }

  if (isLegacyFormat(rawPayload)) {
    logger.warn(
      "Detected legacy webhook format (deprecated). QuickBooks will require CloudEvents format after May 15, 2026. " +
        "Please update your webhook configuration in the QuickBooks Developer Portal.",
    );
    const events = parseLegacyWebhook(rawPayload);

    return {
      format: "legacy",
      formatWarning:
        "Legacy webhook format detected. This format is deprecated and will be removed on May 15, 2026. " +
        "Please migrate to CloudEvents format in your QuickBooks webhook settings.",
      eventCount: events.length,
      events,
      event: events[0],
      entityId: events[0]?.entityId || "",
      accountId: events[0]?.accountId || "",
      entity: events[0]?.entity || "",
      operation: events[0]?.operation || "",
      eventType: events[0]?.eventType || "",
      timestamp: events[0]?.timestamp,
    };
  }

  logger.error("Unable to parse QuickBooks webhook: unrecognized format", {
    payload: rawPayload,
  });
  throw new Error(
    "Unrecognized webhook payload format. Expected CloudEvents (array) or legacy (eventNotifications) format.",
  );
}

export const parseWebhookBody = (payload: TriggerPayload): unknown =>
  JSON.parse((payload.rawBody.data as unknown as Buffer).toString("utf-8"));
