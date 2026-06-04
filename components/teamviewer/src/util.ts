import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { teamviewerOauth } from "./connections";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { TeamViewerRecord } from "./types";

export const validateConnection = (connection: Connection): void => {
  if (![teamviewerOauth.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanKeyValueListInput = (value: unknown) =>
  Array.isArray(value) && value.length
    ? util.types.keyValPairListToObject(value, util.types.toObject)
    : undefined;

export const cleanCode = (value: unknown) =>
  value ? util.types.toObject(value) : {};

export const cleanCodeToArray = (value: unknown) =>
  value ? util.types.toObject(value) : [];

export const validGroupIdOrName = (
  groupid: string | undefined,
  groupname: string | undefined,
) => {
  if (!groupid && !groupname) {
    throw new Error("You must provide either a groupid or a groupname.");
  }
  if (groupid && groupname) {
    throw new Error("You cannot provide both a groupid and a groupname.");
  }
};

export const paginateWithPaginationToken = async (
  client: HttpClient,
  url: string,
  fetchAll = false,
  params: Record<string, unknown> = {},
) => {
  if (fetchAll) {
    let records: Record<string, unknown>[] = [];
    let paginationToken: string | undefined;
    do {
      const { data } = await client.get(url, {
        params: {
          paginationToken,
        },
      });
      const { nextPaginationToken, resources } = data;
      records = records.concat(resources);
      paginationToken = nextPaginationToken;
    } while (paginationToken);
    return {
      resources: records,
      nextPaginationToken: paginationToken,
    };
  }
  const { data } = await client.get(url, {
    params,
  });
  return data;
};

export const paginateWithContinuationToken = async (
  client: HttpClient,
  url: string,
  fetchAll = false,
  params: Record<string, unknown> = {},
) => {
  if (fetchAll) {
    let records: Record<string, unknown>[] = [];
    let continuationToken: string | undefined;
    do {
      const { data } = await client.get(url, {
        params: {
          ...params,
          continuationToken,
        },
      });
      const { continuation_token, devices } = data;
      records = records.concat(devices);
      continuationToken = continuation_token;
    } while (continuationToken);
    return {
      devices: records,
      continuation_token: continuationToken,
    };
  }
  const { data } = await client.get(url, {
    params,
  });
  return data;
};

export const getAuthorizationHeaders = (connection: Connection) => {
  validateConnection(connection);
  return { Authorization: `Bearer ${connection.token?.access_token}` };
};

export const fetchDevices = async (
  client: HttpClient,
): Promise<TeamViewerRecord[]> => {
  const result = await paginateWithContinuationToken(
    client,
    "/devices",
    true,
    {},
  );
  return (result.devices || []) as TeamViewerRecord[];
};

export const fetchUsers = async (
  client: HttpClient,
): Promise<TeamViewerRecord[]> => {
  const result = await paginateWithPaginationToken(
    client,
    "/users",
    true,
    {},
  );
  return (result.resources || []) as TeamViewerRecord[];
};

export const fetchGroups = async (
  client: HttpClient,
): Promise<TeamViewerRecord[]> => {
  const { data } = await client.get("/groups");
  return (data.groups || []) as TeamViewerRecord[];
};

