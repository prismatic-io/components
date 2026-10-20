import { type Connection, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  businessCentralConnection,
  businessClientCredentials,
} from "./connections";
import {
  LOOK_BACK_DATE_PATTERN,
  MAX_EXPIRATION_DAYS,
  POLL_RESOURCE_CONFIG,
} from "./constants";
import type {
  BusinessCentralRecord,
  MultipleItemsResponse,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  PollingStream,
  Subscription,
} from "./interfaces";
const MAX_POLL_PAGES = 100;
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;
export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const validateConnection = (
  connection: Connection,
): undefined | never => {
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
      value: instanceSubscriptions.map(
        swapEtagInObject,
      ) as Subscription["value"],
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
  const subscriptions = await listSubscriptionsFn(
    client,
    instanceWebhooks,
    true,
  );
  let subscriptionsToRemove: Subscription["value"];
  if (subscriptionResource) {
    subscriptionsToRemove = subscriptions.value.filter(
      ({ notificationUrl, resource }) =>
        instanceWebhooks.has(notificationUrl) &&
        subscriptionResource.includes(resource),
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
export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    value,
    label,
  }),
);
export const fetchAllPagedSince = async (
  client: HttpClient,
  initialPath: string,
  initialParams: Record<string, unknown>,
  resumeLink?: string,
): Promise<{
  records: BusinessCentralRecord[];
  truncated: boolean;
  nextLink?: string;
}> => {
  const records: BusinessCentralRecord[] = [];
  const { data: firstPage } = resumeLink
    ? await client.get<MultipleItemsResponse<BusinessCentralRecord[]>>(
        resumeLink,
      )
    : await client.get<MultipleItemsResponse<BusinessCentralRecord[]>>(
        initialPath,
        {
          params: initialParams,
        },
      );
  records.push(...(firstPage.value ?? []));
  let nextLink = firstPage["@odata.nextLink"];
  let pages = 1;
  while (nextLink && pages < MAX_POLL_PAGES) {
    const { data: page } =
      await client.get<MultipleItemsResponse<BusinessCentralRecord[]>>(
        nextLink,
      );
    records.push(...(page.value ?? []));
    nextLink = page["@odata.nextLink"];
    pages++;
  }
  return { records, truncated: Boolean(nextLink), nextLink };
};
export const resolvePollingStart = (
  state: PollingState | undefined,
  lookBackDate: string | undefined,
  now: string,
): {
  since: string;
  isBackfill: boolean;
} => ({
  since: state?.lastPolledAt ?? (lookBackDate || now),
  isBackfill:
    state?.backfillActive === true ||
    (!state?.lastPolledAt && Boolean(lookBackDate)),
});
export const resolvePollingStream = (
  state: PollingState | undefined,
  query: string,
  now: string,
): PollingStream =>
  state?.nextLink && state.streamStartedAt && state.streamQuery === query
    ? { streamStartedAt: state.streamStartedAt, nextLink: state.nextLink }
    : { streamStartedAt: now };
export const nextPollingState = (
  round: {
    lastPolledAt: string;
    stream: PollingStream;
    query: string;
    isBackfill: boolean;
  },
  nextLink: string | undefined,
): PollingState =>
  nextLink
    ? {
        lastPolledAt: round.lastPolledAt,
        nextLink,
        streamStartedAt: round.stream.streamStartedAt,
        streamQuery: round.query,
        ...(round.isBackfill ? { backfillActive: true } : {}),
      }
    : { lastPolledAt: round.stream.streamStartedAt };
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
export const resolveRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
