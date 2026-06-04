import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { GongRecord } from "./types";


export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const jsonInputClean = (value: unknown) => {
  if (value !== null && value !== "") {
    return JSON.parse(value as string);
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};

export const valueListStringInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value.join(",");
  }
  return undefined;
};

export const fetchAllCalls = async (
  client: HttpClient,
  fromDateTime: string,
  toDateTime: string,
): Promise<GongRecord[]> => {
  const allCalls: GongRecord[] = [];
  let cursor: string | undefined;

  do {
    const { data } = await client.get("/v2/calls", {
      params: { fromDateTime, toDateTime, cursor },
    });
    const calls = (data.calls ?? []) as GongRecord[];
    allCalls.push(...calls);
    cursor = data.records?.cursor;
  } while (cursor);

  return allCalls;
};

export const fetchAllUsers = async (
  client: HttpClient,
): Promise<GongRecord[]> => {
  const allUsers: GongRecord[] = [];
  let cursor: string | undefined;

  do {
    const { data } = await client.get("/v2/users", {
      params: { cursor },
    });
    const users = (data.users ?? []) as GongRecord[];
    allUsers.push(...users);
    cursor = data.records?.cursor;
  } while (cursor);

  return allUsers;
};
