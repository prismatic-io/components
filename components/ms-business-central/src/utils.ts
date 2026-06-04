import { type Connection, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { businessCentralConnection, businessClientCredentials } from "./connections";
import { MAX_EXPIRATION_DAYS, POLL_RESOURCE_CONFIG } from "./constants";
import type {
  BusinessCentralRecord,
  MultipleItemsResponse,
  Subscription,
} from "./interfaces";

const MAX_POLL_PAGES = 100;

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanBooleanInput = (value: unknown) => (value ? util.types.toBool(value) : undefined);

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const validateConnection = (connection: Connection): undefined | never => {
  if (
    connection.key !== businessClientCredentials.key &&
    connection.key !== businessCentralConnection.key
  ) {
    throw new Error(
      "Invalid connection provided. Please provide a valid Microsoft Business Central Connection.",
    );
  }

  return;
};

export const swapEtagInObject = (data: Record<string, unknown>) => {
  if (data["@odata.etag"]) {
    data.etag = data["@odata.etag"];
    delete data["@odata.etag"];
  }
  return data;
};

export const listSubscriptionsFn = async (
  client: HttpClient,
  instanceWebhooks: Set<string>,
  showInstanceWebhooks: boolean,
): Promise<Subscription> => {
  const { data } = await client.get<Subscription>("/subscriptions");

  if (showInstanceWebhooks && instanceWebhooks.size > 0) {
    const instanceSubscriptions = data.value.filter(({ notificationUrl }) =>
      instanceWebhooks.has(notificationUrl),
    );
    return {
      ...data,
      value: instanceSubscriptions.map(swapEtagInObject) as Subscription["value"],
    };
  }
  return {
    ...data,
    value: data.value.map(swapEtagInObject) as Subscription["value"],
  };
};

export const createSubscriptionFn = async (
  client: HttpClient,
  notificationUrl: string,
  resource: string,
) => {
  const { data } = await client.post("/subscriptions", {
    resource,
    notificationUrl,
  });
  swapEtagInObject(data);
  return data;
};

export const deleteAllSubscriptionsFn = async (
  client: HttpClient,
  instanceWebhooks: Set<string>,
  subscriptionResource?: string,
) => {
  const subscriptions = await listSubscriptionsFn(client, instanceWebhooks, true);

  let subscriptionsToRemove: Subscription["value"];

  if (subscriptionResource) {
    subscriptionsToRemove = subscriptions.value.filter(
      ({ notificationUrl, resource }) =>
        instanceWebhooks.has(notificationUrl) && subscriptionResource.includes(resource),
    );
  } else {
    subscriptionsToRemove = subscriptions.value.filter(({ notificationUrl }) =>
      instanceWebhooks.has(notificationUrl),
    );
  }

  await Promise.all(
    subscriptionsToRemove.map((subscription) =>
      client.delete(`/subscriptions('${subscription.subscriptionId}')`, {
        headers: { "If-Match": subscription.etag } as Record<string, string>,
      }),
    ),
  );
  return subscriptionsToRemove;
};

export const cleanDate = (rawValue: unknown) => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + MAX_EXPIRATION_DAYS);

  const value = rawValue || defaultDate;
  if (value instanceof Date) {
    return value.toISOString();
  }
  return util.types.toString(value);
};



export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  value,
  label,
}));










export const fetchAllPagedSince = async (
  client: HttpClient,
  initialPath: string,
  initialParams: Record<string, unknown>,
): Promise<{ records: BusinessCentralRecord[]; truncated: boolean }> => {
  const records: BusinessCentralRecord[] = [];
  const { data: firstPage } = await client.get<MultipleItemsResponse<BusinessCentralRecord[]>>(
    initialPath,
    { params: initialParams },
  );
  records.push(...(firstPage.value ?? []));
  let nextLink = firstPage["@odata.nextLink"];
  let pages = 1;
  while (nextLink && pages < MAX_POLL_PAGES) {
    const { data: page } = await client.get<MultipleItemsResponse<BusinessCentralRecord[]>>(
      nextLink,
    );
    records.push(...(page.value ?? []));
    nextLink = page["@odata.nextLink"];
    pages++;
  }
  return { records, truncated: Boolean(nextLink) };
};
