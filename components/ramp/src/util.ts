import { URL } from "node:url";
import { type Connection, type KeyValuePair, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { oauth2 } from "./connections";
import { INVALID_CONNECTION } from "./constants";
import type { GenericListData } from "./interfaces/general";

export const validConnection = (connection: Connection) => {
  if (![oauth2.key].includes(connection.key)) {
    throw new Error(INVALID_CONNECTION);
  }
};

export const getBaseUrl = (connection: Connection) => {
  const origin = new URL(util.types.toString(connection.fields.tokenUrl)).origin;
  const baseUrl = `${origin}/developer/v1/`;
  return baseUrl;
};

export const getAuthHeaders = (connection: Connection) => {
  return {
    Authorization: `Bearer ${connection?.token?.access_token}`,
  };
};

export const cleanBoolean = (value: unknown) => (value ? util.types.toBool(value) : undefined);

export const cleanString = (value: unknown) => (value ? util.types.toString(value) : undefined);

export const cleanCode = (value: unknown) => (value ? util.types.toObject(value) : undefined);

export const cleanNumber = (value: unknown) => (value ? util.types.toNumber(value) : undefined);

export const cleanKeyValueList = (value: unknown) =>
  value ? util.types.keyValPairListToObject(value as KeyValuePair[]) : undefined;

export const fetchAllData = async <T>(
  client: HttpClient,
  path: string | undefined,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<GenericListData<T>> => {
  if (!fetchAll) {
    return await fetchData<T>(client, path, params);
  }
  const records: T[] = [];
  let nextUrl: string | undefined = path;
  while (nextUrl) {
    const { data, page } = await fetchData<T>(client, nextUrl, {
      ...params,
      page_size: 50,
    });

    nextUrl = page?.next;
    records.push(...data);
  }
  return { data: records, page: null };
};

export const fetchData = async <T>(
  client: HttpClient,
  path: string | undefined,
  params: Record<string, unknown>,
): Promise<GenericListData<T>> => {
  if (!path) {
    return { data: [], page: null };
  }
  const { data } = await client.get<GenericListData<T>>(path, { params });
  return data;
};

export const mapModel = (model: string[]) => {
  return model.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
};

export const mapObjectModel = (model: Record<string, string>) => {
  return Object.keys(model).map((key) => {
    return {
      label: key,
      value: model[key],
    };
  });
};
