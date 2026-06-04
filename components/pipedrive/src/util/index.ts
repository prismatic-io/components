import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  CreateWebhookParams,
  GenericCursorPaginationData,
  GenericPaginationData,
  PipedriveRecentItem,
  PollResourceConfig,
  Webhook,
  WebhookParams,
} from "../types";
import { type ActionContext, type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";
import { BASE_URL, PAGINATION_LIMIT } from "../constants";
import { createClient } from "../client";

export const paginateRecordsWithLimit = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<GenericPaginationData<T>> => {
  if (!fetchAll) {
    const { additional_data, data } = await fetchData<GenericPaginationData<T>>(
      client,
      path,
      params,
    );
    return {
      data,
      additional_data,
    };
  }
  const records: T[] = [];
  let next_start = 0;
  do {
    const {
      data,
      additional_data: {
        pagination: { more_items_in_collection },
      },
    } = await fetchData<GenericPaginationData<T>>(client, path, {
      ...params,
      limit: PAGINATION_LIMIT,
      start: next_start,
    });
    if (!data) {
      break;
    }
    records.push(...data);
    if (more_items_in_collection) {
      next_start += PAGINATION_LIMIT;
    } else {
      break;
    }
  } while (next_start);
  return {
    data: records,
    additional_data: {
      pagination: {
        start: null,
        limit: PAGINATION_LIMIT,
        more_items_in_collection: false,
        next_start: null,
      },
    },
  };
};

export const paginateRecordsWithCursor = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<GenericCursorPaginationData<T>> => {
  if (!fetchAll) {
    const { additional_data, data } = await fetchData<GenericCursorPaginationData<T>>(
      client,
      path,
      params,
    );
    return {
      data,
      additional_data,
    };
  }
  const records: T[] = [];
  let next_page: string | undefined;
  do {
    const { data, additional_data } = await fetchData<GenericCursorPaginationData<T>>(
      client,
      path,
      {
        ...params,
        limit: PAGINATION_LIMIT,
        cursor: next_page,
      },
    );
    if (!data) {
      break;
    }
    records.push(...data);
    if (additional_data?.next_cursor) {
      next_page = additional_data.next_cursor;
    } else {
      break;
    }
  } while (next_page);
  return {
    data: records,
    additional_data: {
      next_cursor: null,
    },
  };
};

const fetchData = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
): Promise<T> => {
  const { data } = await client.get<T>(path, { params });
  return data;
};

export const sortRecords = <T>(array: T[], key: keyof T) => {
  return array.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0;
    }
    return a[key] > b[key] ? 1 : -1;
  });
};

export const validateConnection = (connection: Connection) => {
  const connectionsMap = connections.map(({ key }) => key);
  if (!connectionsMap.includes(connection.key)) {
    throw new ConnectionError(connection, `Connection key is not valid: ${connection.key}`);
  }
};

export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanCode = (value: unknown) => (value ? util.types.toObject(value) : undefined);

export const createWebhook = async (client: HttpClient, params: CreateWebhookParams) => {
  return await client.post("/webhooks", {
    subscription_url: params.subscriptionUrl,
    event_action: params.eventAction,
    event_object: params.eventObject,
    user_id: params.userId,
    http_auth_user: params.httpAuthUser,
    http_auth_password: params.httpAuthPassword,
    version: params.version || "2.0",
  });
};

export const deleteWebhook = async (client: HttpClient, webhookId: string) => {
  return await client.delete(`/webhooks/${webhookId}`);
};

export const listWebhooks = async (client: HttpClient) => {
  const { data } = await client.get("/webhooks");
  return data;
};

export const onInstanceDeploy = async (context: ActionContext, params: WebhookParams) => {
  const endpoint = getWebhookEndpoint(context);
  const { connection, version, eventAction, eventObject, userId, httpAuthUser, httpAuthPassword } =
    params;
  const client = getWebhookClient(connection as Connection);
  const { data } = await createWebhook(client, {
    subscriptionUrl: endpoint,
    eventAction: eventAction as string,
    eventObject: eventObject as string,
    userId: userId as number,
    httpAuthUser: httpAuthUser as string,
    httpAuthPassword: httpAuthPassword as string,
    version: version as string,
  });
  return data;
};

export const onInstanceDelete = async (context: ActionContext, params: WebhookParams) => {
  const { connection } = params;
  const endpoint = getWebhookEndpoint(context);
  const client = getWebhookClient(connection as Connection);
  
  const { data } = await listWebhooks(client);
  const webhookIds = data
    .filter((webhook: Webhook) => webhook.subscription_url === endpoint)
    .map((webhook: Webhook) => webhook.id);

  const webhookDeletions = await Promise.all(
    webhookIds.map((webhookId: string) => deleteWebhook(client, webhookId)),
  );
  return webhookDeletions;
};

const getWebhookClient = (connection: Connection) => {
  return createClient(connection, false);
};

const getWebhookEndpoint = (context: ActionContext) => {
  return context.webhookUrls[context.flow.name];
};

export const getBaseUrl = (version: string) => {
  const baseUrl = version === "v1" ? `${BASE_URL}/${version}` : `${BASE_URL}/api/${version}`;
  return baseUrl;
};

export const formatPipedriveTimestamp = (date: Date): string =>
  date.toISOString().replace("T", " ").substring(0, 19);

export const fetchRecentsSince = async (
  client: HttpClient,
  sinceTimestamp: string,
  itemType?: string,
): Promise<PipedriveRecentItem[]> => {
  const params: Record<string, unknown> = { since_timestamp: sinceTimestamp };
  if (itemType) {
    params.items = itemType;
  }
  const { data } = await paginateRecordsWithLimit<PipedriveRecentItem>(
    client,
    "/recents",
    params,
    true,
  );
  return data ?? [];
};





export const partitionByTimestamp = (
  records: PipedriveRecentItem[],
  sinceDate: Date,
  config: PollResourceConfig,
): { created: PipedriveRecentItem[]; updated: PipedriveRecentItem[] } => {
  const created: PipedriveRecentItem[] = [];
  const updated: PipedriveRecentItem[] = [];

  for (const record of records) {
    const recordData = record.data ?? {};
    const createdAtRaw = config.createdAtField
      ? (recordData[config.createdAtField] as string | undefined)
      : undefined;
    const updatedAtRaw = config.updatedAtField
      ? (recordData[config.updatedAtField] as string | undefined)
      : undefined;

    const createdAt = createdAtRaw ? new Date(createdAtRaw) : null;
    const updatedAt = updatedAtRaw ? new Date(updatedAtRaw) : null;

    if (createdAt && createdAt > sinceDate) {
      created.push(record);
    } else if (updatedAt && updatedAt > sinceDate) {
      updated.push(record);
    } else if (!createdAt && !updatedAt) {
      updated.push(record);
    }
  }

  return { created, updated };
};
