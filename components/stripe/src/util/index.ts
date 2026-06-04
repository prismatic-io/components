import {
  type ActionContext,
  type Connection,
  ConnectionError,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../auth";
import { DEFAULT_PAGINATION_LIMIT } from "../constants";
import type {
  ClassResource,
  CreatedWebhook,
  ExtendedResponse,
  PaginatedRecord,
  StripeEvent,
  StripeResource,
} from "../types";

const MAX_POLL_PAGES = 100;
const POLL_PAGE_SIZE = 100;

export const getStripeKey = (stripeConnection: Connection) => {
  if (stripeConnection.key !== "apiKey") {
    throw new ConnectionError(stripeConnection, "Unsupported authorization method");
  }
  return util.types.toString(stripeConnection.fields.apiKey);
};

export const cleanNumberInput = (number: unknown) =>
  number ? util.types.toNumber(number) : undefined;

export const cleanStringInput = (string: unknown) =>
  string ? util.types.toString(string) : undefined;

export const cleanObjectInput = (object: unknown) =>
  object ? util.types.toObject(object) : undefined;

export const keyValPairListToObject = (
  kvpList: KeyValuePair<unknown>[] = [],
): Record<string, string | number> => {
  return kvpList.reduce(
    (result, { key, value }) => {
      result[key] = value as string | number;
      return result;
    },
    {} as Record<string, string | number>,
  );
};

export const paginateStripeRecords = async (
  client: ClassResource,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<PaginatedRecord> => {
  if (fetchAll) {
    params.limit = DEFAULT_PAGINATION_LIMIT;
    let records: StripeResource[] = [];
    let keepFetching = true;
    let lastResponse: ExtendedResponse;
    do {
      const { data, has_more, ...rest } = await client.list(params);
      records = [...records, ...data];
      keepFetching = has_more;
      if (keepFetching) {
        params.starting_after = data[data.length - 1].id;
      }
      lastResponse = rest;
    } while (keepFetching);
    return {
      data: records,
      has_more: false,
      ...lastResponse,
    };
  }
  const response = await client.list(params);
  return response;
};

export const createWebhookFn = async (
  client: Stripe,
  webhookUrl: string,
  webhookEvents: string[],
) => {
  const data = await client.webhookEndpoints.create({
    url: webhookUrl,
    enabled_events: webhookEvents.map(
      (event) => util.types.toString(event) as Stripe.WebhookEndpointUpdateParams.EnabledEvent,
    ),
    metadata: {},
  });
  return data;
};

export const deleteWebhookFn = async (client: Stripe, webhookId: string) => {
  const data = await client.webhookEndpoints.del(webhookId);
  return data;
};

export const deleteWebhookEventsFn = async (client: Stripe, webhookIds: string[]) => {
  const data = await Promise.all(webhookIds.map((id) => deleteWebhookFn(client, id)));
  return data;
};

export const listWebhookEventsFn = async (
  client: Stripe.WebhookEndpointsResource,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  const data = (await paginateStripeRecords(
    client,
    fetchAll,
    params,
  )) as Stripe.ApiList<Stripe.WebhookEndpoint>;
  return data;
};

export const equalArrays = (a: unknown[], b: unknown[]) => {
  return a.length === b.length && a.every((value, index) => value === b[index]);
};

export const onInstanceDeploy = async (context: ActionContext, { connection, webhookEvents }) => {
  const client = createStripeClient({
    stripeConnection: connection,
    timeout: 5000,
  });
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const previousCrossFlowState = context.crossFlowState[flowName] as Record<string, unknown>;

  
  const existingWebhook = await checkExistingWebhook(
    client.webhookEndpoints,
    webhookUrl,
    webhookEvents,
  );

  if (!existingWebhook) {
    
    const createdWebhook = await createWebhookFn(client, webhookUrl, webhookEvents as string[]);
    context.crossFlowState[flowName] = {
      ...previousCrossFlowState,
      webhook: createdWebhook,
    };
  }

  return;
};

export const onInstanceDelete = async (context: ActionContext, { connection, webhookEvents }) => {
  const client = createStripeClient({
    stripeConnection: connection,
    timeout: 5000,
  });
  const webhookUrl = context.webhookUrls[context.flow.name];
  const { data } = await listWebhookEventsFn(client.webhookEndpoints, true, {});
  const webhookToDelete = data
    .map(async ({ url, enabled_events, id }) => {
      if (url === webhookUrl && equalArrays(enabled_events, webhookEvents)) {
        return await deleteWebhookFn(client, id);
      }
    })
    .filter(Boolean);
  await Promise.all(webhookToDelete);

  const previousStore = context.crossFlowState[context.flow.name] as CreatedWebhook;

  context.crossFlowState[context.flow.name] = {
    ...previousStore,
    webhook: undefined,
  };

  return;
};

export const validateTrigger = (
  client: Stripe,
  body: string,
  sig: string,
  webhookSecret: string,
) => {
  try {
    client.webhooks.constructEvent(body, sig, webhookSecret);
    return true;
  } catch (err) {
    throw new Error(`Webhook Error ${(err as Error).message}`);
  }
};

export const getStripeHeaderSignature = (headers: Record<string, string>): string => {
  if (headers) {
    const stripeSignature = headers["stripe-signature"];
    if (!stripeSignature) {
      throw new Error("Missing Stripe-Signature header");
    }
    return stripeSignature;
  }

  throw new Error("Missing headers");
};

export const checkExistingWebhook = async (
  client: Stripe.WebhookEndpointsResource,
  webhookUrl: string,
  webhookEvents,
) => {
  const { data } = await listWebhookEventsFn(client, true, {});

  return data.find((webhook) => {
    const sameUrl = webhook.url === webhookUrl;
    const sameEvents =
      webhook.enabled_events.length === webhookEvents.length &&
      equalArrays(webhook.enabled_events.sort(), [...webhookEvents].sort());

    return sameUrl && sameEvents;
  });
};











export const fetchEventsSince = async (
  connection: Connection,
  createdGte: number,
  types: string[] | undefined,
): Promise<{ events: StripeEvent[]; truncated: boolean }> => {
  const client = createStripeClient({ stripeConnection: connection });
  const events: StripeEvent[] = [];
  let startingAfter: string | undefined;
  let pages = 0;
  let hasMore = true;
  while (hasMore && pages < MAX_POLL_PAGES) {
    const result = await client.events.list({
      created: { gte: createdGte },
      ...(types && types.length > 0 && { types }),
      limit: POLL_PAGE_SIZE,
      ...(startingAfter && { starting_after: startingAfter }),
    });
    events.push(...(result.data as unknown as StripeEvent[]));
    hasMore = result.has_more;
    if (hasMore && result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
    pages++;
  }
  return { events, truncated: hasMore };
};
