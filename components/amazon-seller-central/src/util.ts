import { type Connection, util } from "@prismatic-io/spectral";
import type {
  createClient as createHttpClient,
  HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import FormData from "form-data";
import { PollResource } from "./constants";
import type {
  AmazonRecord,
  PollingChangesObject,
  PollingRecordChange,
} from "./types";
export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      return JSON.parse(value);
    }
  }
  return undefined;
};
export const valueListStringInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1) {
    return value.toString();
  }
  return undefined;
};
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1) {
    return value as string[];
  }
  return undefined;
};
const validateDataType = (value: unknown) => {
  const type = typeof value;
  switch (type) {
    case "string":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "number":
      if (value === "" || Number.isNaN(value as number)) {
        return false;
      }
      return true;
    case "boolean":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "object":
      if (Array.isArray(value)) {
        return true;
      }
      if (value !== null && Object.keys(value).length > 0) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
export const generateForm = (data: unknown) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      formData.append(key, value);
    }
  }
  return formData;
};
export const sortedArray = (
  first: {
    countryName: string;
  },
  second: {
    countryName: string;
  },
) => {
  if (first.countryName > second.countryName) {
    return 1;
  }
  if (first.countryName < second.countryName) {
    return -1;
  }
  return 0;
};
export const getAccessToken = (connection: Connection) => {
  return util.types.toString(connection?.token?.access_token);
};
export const getBaseUrl = (connection: Connection) => {
  const isSandboxEnvironment = util.types.toBool(
    connection.fields.isSandboxEnvironment,
  );
  const spAPIEndpoints = util.types.toString(connection?.fields?.region);
  if (!spAPIEndpoints) {
    throw new Error("Region is required");
  }
  if (isSandboxEnvironment) {
    return `sandbox.${spAPIEndpoints}`;
  }
  return spAPIEndpoints;
};
export const getHeaders = (baseUrl: string, accessToken: string) => {
  return {
    "x-amz-access-token": accessToken,
    "x-amz-date": new Date().toISOString(),
    host: baseUrl,
    "user-agent": "prismatic-io/1.0 (Language=JavaScript; Platform=NodeJS)",
    "content-type": "application/json",
    accept: "application/json",
  };
};
export const paginateResults = async <T>(
  client: ReturnType<typeof createHttpClient>,
  url: string,
  params: Record<string, unknown>,
  resultArrayKey: string,
  fetchAll = false,
): Promise<T[]> => {
  const results: T[] = [];
  let nextToken: string | undefined;
  do {
    type Page = {
      NextToken?: string;
      [key: string]: unknown;
    };
    const { data } = await client.get<
      Page & {
        payload?: Page;
      }
    >(url, {
      params: {
        ...params,
        NextToken: nextToken,
      },
    });
    const body = data.payload ?? data;
    const pageResults = body[resultArrayKey] as T[] | undefined;
    if (pageResults && Array.isArray(pageResults)) {
      results.push(...pageResults);
    }
    nextToken = body.NextToken;
    if (!fetchAll) {
      break;
    }
  } while (nextToken);
  return results;
};
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
const fetchOrdersSince = async (
  client: HttpClient,
  lastUpdatedAfter: string,
  marketplaceIdValues: string | undefined,
): Promise<AmazonRecord[]> => {
  return paginateResults<AmazonRecord>(
    client,
    "/orders/v0/orders",
    {
      LastUpdatedAfter: lastUpdatedAfter,
      MarketplaceIds: marketplaceIdValues,
    },
    "Orders",
    true,
  );
};
const fetchFeedsSince = async (
  client: HttpClient,
  createdSince: string,
): Promise<AmazonRecord[]> => {
  const allFeeds: AmazonRecord[] = [];
  let nextToken: string | undefined;
  do {
    const { data } = await client.get<{
      feeds: AmazonRecord[];
      nextToken?: string;
    }>("/feeds/2021-06-30/feeds", {
      params: {
        createdSince,
        nextToken,
      },
    });
    allFeeds.push(...(data.feeds ?? []));
    nextToken = data.nextToken;
  } while (nextToken);
  return allFeeds;
};
export const fetchPollingChanges = async (
  client: HttpClient,
  resourceType: string,
  lastPolledAt: string,
  marketplaceIds: string | undefined,
): Promise<Required<PollingChangesObject>> => {
  if (resourceType !== PollResource.ORDERS) {
    return {
      created: await fetchFeedsSince(client, lastPolledAt),
      updated: [],
    };
  }
  const records = await fetchOrdersSince(client, lastPolledAt, marketplaceIds);
  const lastPolledDate = new Date(lastPolledAt);
  const created: AmazonRecord[] = [];
  const updated: AmazonRecord[] = [];
  for (const record of records) {
    const purchaseDate = record.PurchaseDate as string;
    if (purchaseDate && new Date(purchaseDate) > lastPolledDate) {
      created.push(record);
    } else {
      updated.push(record);
    }
  }
  return { created, updated };
};
const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const lookBackDateClean = (value: unknown): string => {
  if (value === undefined || value === null) {
    return "";
  }
  const raw = typeof value === "string" ? value.trim() : String(value);
  if (raw === "") {
    return "";
  }
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
export const resolvePollingRecordChanges = (
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
