import {
  type ActionContext,
  type Connection,
  ConnectionError,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import { WEBHOOK_TOPICS } from "./constants";
import type { ValidatedWebhook } from "./interfaces/ValidatedWebhook";
import type { WebhookData } from "./interfaces/WebhookData";
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
