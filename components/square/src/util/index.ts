import { URL } from "node:url";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { squareConnection } from "../connections";
import { SQUARE_API_VERSION } from "../constants";
import type { Payment } from "../types";

export const validateConnection = (connection: Connection): void => {
  if (connection.key !== squareConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
};

export const getBaseUrl = (connection: Connection): string => {
  const { tokenUrl } = connection.fields;
  const validatedTokenUrl = util.types.toString(tokenUrl);
  const { hostname, protocol } = new URL(validatedTokenUrl);
  const baseUrl = `${protocol}//${hostname}`;
  return baseUrl;
};

export const getAuthToken = (connection: Connection) => {
  return connection?.token?.access_token;
};

export const getAuthHeaders = (connection: Connection, version?: string) => {
  const token = getAuthToken(connection);
  const apiVersion =
    version ||
    (connection.fields.apiVersion
      ? util.types.toString(connection.fields.apiVersion)
      : SQUARE_API_VERSION);

  return {
    Authorization: `Bearer ${token}`,
    "Square-Version": apiVersion,
    "Content-Type": "application/json",
  };
};

export const fetchAllPages = async (
  client: HttpClient,
  endpoint: string,
  dataKey: string,
  options?: {
    method?: "GET" | "POST";
    additionalParams?: Record<string, unknown>;
  },
  fetchAll = true,
) => {
  let allItems: Record<string, unknown>[] = [];
  let cursor: string | undefined;
  let lastResponse: Record<string, unknown> = {};
  const method = options?.method || "GET";
  const additionalParams = options?.additionalParams || {};

  do {
    const { data } =
      method === "POST"
        ? await client.post(endpoint, {
            ...additionalParams,
            cursor,
          })
        : await client.get(endpoint, {
            params: {
              ...additionalParams,
              cursor,
            },
          });

    const items = data[dataKey] || [];
    allItems = allItems.concat(items);
    cursor = data.cursor;
    lastResponse = data;
  } while (fetchAll && cursor);

  return {
    ...lastResponse,
    [dataKey]: allItems,
  };
};

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const sortByLabel = (a: { label: string }, b: { label: string }): number => {
  if (a.label < b.label) return -1;
  if (a.label > b.label) return 1;
  return 0;
};






export const fetchAllPaymentsSince = async (
  client: HttpClient,
  updatedAtBeginTimeRfc3339: string,
): Promise<Payment[]> => {
  const result = await fetchAllPages(client, "/v2/payments", "payments", {
    method: "GET",
    additionalParams: {
      updated_at_begin_time: updatedAtBeginTimeRfc3339,
      sort_field: "UPDATED_AT",
      sort_order: "ASC",
      limit: 100,
    },
  });
  return (result.payments as Payment[]) ?? [];
};






export const partitionPaymentsByTimestamp = (
  payments: Payment[],
  sinceDate: Date,
): { created: Payment[]; updated: Payment[] } => {
  const created: Payment[] = [];
  const updated: Payment[] = [];

  for (const payment of payments) {
    const createdAt = payment.created_at ? new Date(payment.created_at) : null;
    const updatedAt = payment.updated_at ? new Date(payment.updated_at) : null;

    if (createdAt && createdAt > sinceDate) {
      created.push(payment);
    } else if (updatedAt && updatedAt > sinceDate) {
      updated.push(payment);
    } else if (!createdAt && !updatedAt) {
      updated.push(payment);
    }
  }

  return { created, updated };
};
