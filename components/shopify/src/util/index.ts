import * as crypto from "node:crypto";
import { type TriggerPayload, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { DocumentNode } from "graphql";
import type { GraphQLClient, Variables } from "graphql-request";
import parseLinkHeader from "parse-link-header";
import createWebhookQuery from "../actions/graphql/queries/webhooks/CreateWebhook.gql";
import deleteWebhookQuery from "../actions/graphql/queries/webhooks/DeleteWebhook.gql";
import listWebhooksQuery from "../actions/graphql/queries/webhooks/ListWebhooks.gql";
import type { ObjectNodes } from "../actions/interfaces/ObjectNodes";
import type { PageInfo } from "../actions/interfaces/PageInfo";
import type { PaginationResponse } from "../actions/interfaces/PaginationResponse";
import type { UserError } from "../actions/interfaces/UserError";
import type { WebhookSubscription } from "../actions/interfaces/Webhook";
import type { Webhookinput } from "../actions/interfaces/Webhookinput";
import type { ShopifyWebhook } from "../actions/webhooks";
import { MAX_LIMIT } from "../constants";

export const validateMetafieldType = (value: unknown, type: string) => {
  if (type.toLocaleLowerCase().trim() === "single_line_text_field") {
    return util.types.toString(value);
  }
  if (type.toLocaleLowerCase().trim() === "number_integer") {
    return util.types.toInt(value);
  }
  if (type.toLocaleLowerCase().trim() === "boolean") {
    return util.types.toBool(value);
  }
};

export const performFunction = async (context, payload: TriggerPayload, { secret_key }) => {
  if (secret_key) {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const SHOPIFY_HMAC = headers["x-shopify-hmac-sha256"];
    if (SHOPIFY_HMAC) {
      const requestBody = payload.rawBody.data;
      if (!context.isSimulatedTestExecution) {
        const signature = crypto
          .createHmac("sha256", secret_key)
          .update(requestBody as string, "utf8")
          .digest("base64");
        const match = signature === SHOPIFY_HMAC;
        if (!match) {
          throw new Error("Signature verification failed");
        }
      }
      return Promise.resolve({
        payload,
        response: {
          headers: {
            ...headers,
            "X-Shopify-Hmac-SHA256": SHOPIFY_HMAC,
          },
          statusCode: 200,
          contentType: "application/json",
          body: JSON.parse(util.types.toString(requestBody)),
        },
      });
    }
  }
  if (!context.isSimulatedTestExecution) {
    throw new Error("Signature verification failed");
  }
  return Promise.resolve({
    payload,
    response: {
      statusCode: 200,
      contentType: "application/json",
      body: "{}",
    },
  });
};

export const createWebhooks = async (client: HttpClient, events: string[], address: string) => {
  const eventsPromises = [];
  for (const event of events) {
    eventsPromises.push(createWebhookAction(client, event, address));
  }
  const data = await Promise.all(eventsPromises);
  return data;
};

export const createWebhookAction = async (
  client: HttpClient,
  topic: string,
  address: string,
  format = "json",
) => {
  const { data } = await client.post<{ webhook: ShopifyWebhook }>("/webhooks.json", {
    webhook: {
      topic,
      address,
      format,
    },
  });
  return data;
};

export const fetchWebhooks = async (client: HttpClient, address: string) => {
  let webhooks: ShopifyWebhook[] = [];
  let page_info: string | null = null;

  do {
    const { data, headers } = await client.get("/webhooks.json", {
      params: { limit: 250, address },
    });

    const locationData = parseLinkHeader(headers.link);
    page_info = locationData?.next?.page_info;
    webhooks = [...webhooks, ...data.webhooks];
  } while (page_info);

  return webhooks;
};

export const deleteWebhooksInstance = async (client: HttpClient, address: string) => {
  const webhooks = await fetchWebhooks(client, address);
  const webhooksPromises = [];
  for (const webhook of webhooks) {
    webhooksPromises.push(deleteWebhook(client, webhook.id));
  }
  const data = await Promise.all(webhooksPromises);
  return data;
};

export const deleteWebhook = async (client: HttpClient, id: number) => {
  const { data } = await client.delete(`/webhooks/${id}.json`);
  return data;
};

export const computePageInformation = async (
  client: HttpClient,
  url: string,
  params: Record<string, string>,
  getAlldata = false,
) => {
  const toReturnData: Record<string, unknown[]> = {};
  let toReturnHeaders: unknown;
  let pagination: PaginationResponse;

  do {
    const { data, headers } = await client.get(url, {
      params,
    });
    toReturnHeaders = headers;
    const attibuteName = Object.keys(data)[0];

    if (!toReturnData[attibuteName]) {
      toReturnData[attibuteName] = [];
    }
    toReturnData[attibuteName].push(...data[attibuteName]);
    const { link } = util.types.lowerCaseHeaders(headers as Record<string, string>);
    if (link) {
      pagination = parseLinkHeader(link);
      if (pagination.next?.page_info) {
        params.page_info = pagination.next.page_info;
      } else {
        params.page_info = undefined;
      }
    } else {
      params.page_info = undefined;
    }
  } while (getAlldata && params.page_info);

  return {
    data: toReturnData,
    pagination,
    pageInfo: pagination?.next?.page_info || null, 
    rel: pagination?.next?.page_info ? 'rel="next"' : null, 
    headers: toReturnHeaders, 
  };
};

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const cleanCodeInput = (value: unknown): object => (value ? util.types.toObject(value) : {});

export const cleanKeyValueListInput = (value: unknown): Record<string, unknown> => {
  if (Array.isArray(value)) return util.types.keyValPairListToObject(value);
  return {};
};

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};

export const cleanValueListInput = (value: unknown, returnUndefinedOnNoValue = false): string[] => {
  if (Array.isArray(value)) return value.map((el) => util.types.toString(el));
  return returnUndefinedOnNoValue ? undefined : [];
};

export const cleanCodeInputEmptyObject = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return {};
};

export const cleanOptionalBooleanInput = (value: unknown): boolean | undefined =>
  value ? util.types.toBool(value) : undefined;

const getPaginatedObject = <T>(attributePath: string[], data) => {
  const object: ObjectNodes<T> = attributePath.reduce((acc, attribute) => {
    if (!acc[attribute]) {
      throw new Error(`Attribute ${attribute} not found in data.`);
    }
    return acc[attribute];
  }, data);
  return object;
};

export const fetchData = async <T>(
  client: GraphQLClient,
  attributePath: string[],
  listKey: string,
  getAlldata: boolean,
  query: DocumentNode,
  variables: Variables,
) => {
  const data = await client.request(query, variables);
  const object = getPaginatedObject<T>(attributePath, data);

  const allData = {
    [listKey]: object.nodes,
    pageInfo: object.pageInfo,
  } as Record<string, T[]> & { pageInfo: PageInfo };

  if (!getAlldata) {
    return allData;
  }

  let hasNextPage = object.pageInfo.hasNextPage;
  let cursor = object.pageInfo.endCursor;
  while (hasNextPage) {
    const newData = await client.request(query, {
      ...variables,
      cursor,
    });

    const newObject = getPaginatedObject<T>(attributePath, newData);

    allData[listKey] = allData[listKey].concat(newObject.nodes);
    allData.pageInfo = newObject.pageInfo;

    hasNextPage = newObject.pageInfo.hasNextPage;
    cursor = newObject.pageInfo.endCursor;
  }

  return allData;
};

export const generateModelFromSnakeCaseArray = (strings: string[]) =>
  strings.map((key) => ({
    label: key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: key,
  }));

export const createWebhook = async (client: GraphQLClient, input: Webhookinput) => {
  const data: {
    webhookSubscriptionCreate: {
      webhookSubscription: WebhookSubscription;
      userErrors: Record<string, unknown>[];
    };
  } = await client.request(createWebhookQuery, input);
  return data;
};

export const deleteWebhookById = async (client: GraphQLClient, id: string) => {
  const data: { webhookSubscriptionDelete: Record<string, unknown> } = await client.request(
    deleteWebhookQuery,
    {
      id,
    },
  );

  return data;
};

export const listWebhooks = async (
  client: GraphQLClient,
  getAlldata: boolean,
  limit: number,
  onlyInstanceWebhooks: boolean,
  instanceWebhookUrls: string[],
  endCursor: string | undefined,
  callbackUrl?: string,
) => {
  const shouldFetchAll = onlyInstanceWebhooks || getAlldata;

  const data = (await fetchData<WebhookSubscription>(
    client,
    ["webhookSubscriptions"],
    "webhookSubscriptions",
    shouldFetchAll,
    listWebhooksQuery,
    {
      first: shouldFetchAll ? MAX_LIMIT : limit,
      cursor: shouldFetchAll ? undefined : endCursor,
      callbackUrl,
    },
  )) as Record<"webhookSubscriptions", WebhookSubscription[]> & {
    pageInfo: PageInfo;
  };

  if (onlyInstanceWebhooks) {
    const webhooks = data.webhookSubscriptions;

    const filteredWebhooks = (webhooks || []).filter((webhook) =>
      instanceWebhookUrls.includes(webhook.endpoint.callbackUrl),
    );

    return {
      webhookSubscriptions: filteredWebhooks,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    };
  }

  return data;
};

export const getNumericId = (gid: string): number | null => {
  const match = gid.match(/\/(\d+)(?:\?|$)/);
  return match ? Number.parseInt(match[1], 10) : null;
};

export const cleanProductId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Product/")) {
    return input;
  }
  return `gid://shopify/Product/${input}`;
};

export const cleanCustomerId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Customer/")) {
    return input;
  }
  return `gid://shopify/Customer/${input}`;
};

export const cleanFulfillmentOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/FulfillmentOrder/")) {
    return input;
  }
  return `gid://shopify/FulfillmentOrder/${input}`;
};

export const cleanOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Order/")) {
    return input;
  }
  return `gid://shopify/Order/${input}`;
};

export const cleanFulfillmentId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Fulfillment/")) {
    return input;
  }
  return `gid://shopify/Fulfillment/${input}`;
};

export const cleanLocationId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Location/")) {
    return input;
  }
  return `gid://shopify/Location/${input}`;
};

export const cleanDraftOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/DraftOrder/")) {
    return input;
  }
  return `gid://shopify/DraftOrder/${input}`;
};

export const cleanProductIdForVariant = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Product/")) {
    return util.types.toString(getNumericId(input));
  }
  return input;
};

export const findKeyByValue = (obj: Record<string, string>, value: string): string | undefined => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export const createTimezoneString = (timezoneOffset: string, ianaTimezone: string): string => {
  const gmtOffset = `GMT${timezoneOffset.substring(0, 3)}:${timezoneOffset.substring(3)}`;
  return `(${gmtOffset}) ${ianaTimezone}`;
};

const searchUserErrors = (obj): UserError[] | null => {
  if (obj && typeof obj === "object") {
    if (obj.userErrors) {
      return obj.userErrors;
    }
    for (const key in obj) {
      const result = searchUserErrors(obj[key]);
      if (result) return result;
    }
  }
  return null;
};

export const gqlErrorsCheck = (response): void => {
  const userErrors = searchUserErrors(response);
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(", "));
  }
};

export const categorizeByChangeType = <T extends { createdAt: string }>(
  items: T[],
  lastPolledAt: string,
): { created: T[]; updated: T[] } =>
  items.reduce<{ created: T[]; updated: T[] }>(
    (acc, item) => {
      if (new Date(item.createdAt) >= new Date(lastPolledAt)) {
        acc.created.push(item);
      } else {
        acc.updated.push(item);
      }
      return acc;
    },
    { created: [], updated: [] },
  );
