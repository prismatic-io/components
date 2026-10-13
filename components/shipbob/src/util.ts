import {
  type ActionContext,
  type Connection,
  ConnectionError,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import { LOOK_BACK_DATE_PATTERN, WEBHOOK_TOPICS } from "./constants";
import type { ValidatedWebhook } from "./interfaces/ValidatedWebhook";
import type { WebhookData } from "./interfaces/WebhookData";
import type {
  PollingState,
  PollWindow,
  ShipbobOrder,
  ShipbobOrderChange,
  ShipbobOrderChanges,
} from "./types/polling";
import type { WebhookTopic } from "./types/WebhookTopic";
export const jsonInputClean = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
export const valueListStringInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value.join(",");
  }
  return undefined;
};
export const validateWebhook = (
  payloadHeaders: Record<string, string>,
): ValidatedWebhook => {
  const headers = util.types.lowerCaseHeaders(payloadHeaders);
  const shipbobSubscriptionId = headers["shipbob-subscription-id"];
  const shipbobTopic = headers["shipbob-topic"];
  const hasShipbobHeaders =
    shipbobSubscriptionId &&
    shipbobTopic &&
    shipbobSubscriptionId !== "" &&
    shipbobTopic !== "";
  if (!hasShipbobHeaders) throw new Error("Not a ShipBob webhook");
  if (!WEBHOOK_TOPICS.has(shipbobTopic as WebhookTopic))
    throw new Error("Invalid ShipBob topic");
  return { shipbobSubscriptionId, shipbobTopic: shipbobTopic as WebhookTopic };
};
export const capitalizeWithoutUnderscores = (input: string): string => {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const webhookPerformFunction = async (
  _context: ActionContext,
  payload: TriggerPayload,
) => {
  const { shipbobSubscriptionId, shipbobTopic } = validateWebhook(
    payload.headers,
  );
  const requestBody = util.types.toString(payload.rawBody.data);
  const jsonBody = JSON.parse(requestBody);
  return Promise.resolve({
    payload,
    response: {
      headers: {
        ...payload.headers,
        "shipbob-subscription-id": shipbobSubscriptionId,
        "shipbob-topic": shipbobTopic,
      },
      statusCode: 200,
      contentType: "application/json",
      body: jsonBody,
    },
  });
};
export const getTopicsInputModel = () =>
  Array.from(WEBHOOK_TOPICS).map((topic) => ({
    label: capitalizeWithoutUnderscores(topic),
    value: topic,
  }));
export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
export const hasRepeatedString = (arr: string[]): boolean => {
  const stringSet = new Set<string>();
  for (const str of arr) {
    if (stringSet.has(str)) {
      return true;
    }
    stringSet.add(str);
  }
  return false;
};
export const removeVersionFromUrl = (url: string): string => {
  const versionRegex = /\/\d+\.\d+/;
  return url.replace(versionRegex, "");
};
export const getAllPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  params?: Record<string, unknown>,
  extraHeaders?: Record<string, unknown>,
): Promise<T[]> => {
  const allData: T[] = [];
  let page = 1;
  let hasMore = true;
  do {
    const { headers, data } = await client.get(url, {
      params: { ...params, Page: page, Limit: 250 },
      ...(extraHeaders && { headers: extraHeaders as Record<string, string> }),
    });
    allData.push(...data);
    const lowerCaseHeaders = util.types.lowerCaseHeaders(
      headers as Record<string, string>,
    );
    const totalPages =
      util.types.toNumber(lowerCaseHeaders["total-pages"]) || 1;
    hasMore = page < totalPages;
    page += 1;
  } while (hasMore);
  return allData;
};
export const getExistingWebhookIds = (
  webhookUrl: string,
  data: WebhookData[],
): string[] => {
  return data
    .filter(({ subscription_url }) => subscription_url === webhookUrl)
    .map(({ id }) => id);
};
export const toShipbobDate = (iso: string): string => iso.slice(0, 10);
export const classifyOrdersByPollDate = (
  orders: ShipbobOrder[],
  lastPolledAt: string,
): {
  created: ShipbobOrder[];
  updated: ShipbobOrder[];
} => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const created: ShipbobOrder[] = [];
  const updated: ShipbobOrder[] = [];
  for (const order of orders) {
    const createdMs = order.created_date
      ? new Date(order.created_date).getTime()
      : Number.NaN;
    if (!Number.isNaN(createdMs) && createdMs > lastPolledAtMs) {
      created.push(order);
    } else {
      updated.push(order);
    }
  }
  return { created, updated };
};
export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};
export const resolvePollWindow = (
  state: PollingState | undefined,
  params: {
    lookBackDate: string;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
): PollWindow | null => {
  const stored = state?.lastPolledAt;
  if (stored) {
    return {
      since: stored,
      createdAfter: stored,
      includeNew: params.showNewRecords,
      includeUpdated: params.showUpdatedRecords,
    };
  }
  if (!params.lookBackDate) {
    return null;
  }
  return {
    since: params.lookBackDate,
    createdAfter: new Date(Date.parse(params.lookBackDate) - 1).toISOString(),
    includeNew: true,
    includeUpdated: true,
  };
};
export const resolveShipbobOrderChanges = (
  data: ShipbobOrderChanges | undefined,
): ShipbobOrderChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): ShipbobOrderChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): ShipbobOrderChange => ({ changeType: "updated", record }),
    ),
  ];
};
