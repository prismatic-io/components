import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import { MAX_LIMIT } from "./constants";
import type { PaginatedResponse } from "./interfaces/PaginatedResponse";
import type { PaginationParams } from "./interfaces/PaginationParams";
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const getPaginatedResponse = async <T>(
  client: HttpClient,
  path: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<{ data: PaginatedResponse<T> }> => {
  const finalParams: PaginationParams = fetchAll
    ? { limit: MAX_LIMIT }
    : { ...params };
  const response = await client.get<PaginatedResponse<T>>(path, {
    params: finalParams,
  });

  if (!fetchAll) {
    return response;
  }

  const firstId = response.data.first_id;

  const data: T[] = response.data.data;
  let hasMore = response.data.has_more;
  let lastId = response.data.last_id;
  finalParams.after_id = lastId ?? undefined;

  while (hasMore) {
    const newResponse = await client.get<PaginatedResponse<T>>(path, {
      params: finalParams,
    });
    data.push(...newResponse.data.data);
    hasMore = newResponse.data.has_more;
    lastId = newResponse.data.last_id;
    finalParams.after_id = lastId ?? undefined;
  }

  return {
    data: {
      data,
      has_more: hasMore,
      first_id: firstId,
      last_id: lastId,
    },
  };
};
