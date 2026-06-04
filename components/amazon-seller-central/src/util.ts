import { type Connection, util } from "@prismatic-io/spectral";
import type {
  createClient as createHttpClient,
  HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import FormData from "form-data";
import type { AmazonRecord } from "./types";

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
  first: { countryName: string },
  second: { countryName: string },
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
    const { data } = await client.get<{
      NextToken?: string;
      [key: string]: unknown;
    }>(url, {
      params: {
        ...params,
        NextToken: nextToken,
      },
    });

    
    const pageResults = data[resultArrayKey] as T[] | undefined;
    if (pageResults && Array.isArray(pageResults)) {
      results.push(...pageResults);
    }

    
    nextToken = data.NextToken;

    
    if (!fetchAll) {
      break;
    }
  } while (nextToken);

  return results;
};

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const fetchOrdersSince = async (
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

export const fetchFeedsSince = async (
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
