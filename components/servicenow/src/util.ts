import { type Connection, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Method } from "axios";
import { stringify } from "querystring";
import urljoin from "url-join";
import { createClient } from "./client";
import type { BaseTableProps } from "./types/BaseTableProps";
import type { DeleteTableProps } from "./types/DeleteTableProps";
import type { GetAllTablesProps } from "./types/GetAllTablesProps";
import type { GetTableProps } from "./types/GetTableProps";
import type { PostTableProps } from "./types/PostTableProps";
import type { PutTableProps } from "./types/PutTableProps";

const buildTableUrl = (
  apiVersion: string,
  tableName: unknown,
  queryParameters?: Record<string, string>,
): string => {
  let tableUrl = "";
  const subpath =
    apiVersion === "latest"
      ? "/api/now/table/"
      : `/api/now/${util.types.toString(apiVersion)}/table/`;
  tableUrl = urljoin(subpath, util.types.toString(tableName));

  if (queryParameters) {
    if (queryParameters?.sys_id) {
      tableUrl = urljoin(tableUrl, util.types.toString(queryParameters.sys_id));
    }
    const filteredParams = Object.fromEntries(
      Object.entries(queryParameters).filter(
        ([k, v]) => Boolean(v) && k !== "sys_id",
      ),
    );
    if (Object.keys(filteredParams).length > 0) {
      tableUrl = urljoin(tableUrl, `?${stringify(filteredParams)}`);
    }
  }

  return tableUrl;
};

const buildPayload = (
  fieldValuesInput: { key: string; value: unknown }[],
): Record<string, unknown> => {
  return fieldValuesInput.reduce(
    (result, { key, value }) => ({ ...result, [key]: value }),
    {},
  );
};

const makeTableRequest = async (
  method: Method,
  {
    connection,
    tableName,
    apiVersion,
    instanceUrl,
    queryParameters,
    payload,
    debug,
  }: BaseTableProps,
) => {
  const client = createClient(connection, instanceUrl, debug);
  const tableUrl = buildTableUrl(
    util.types.toString(apiVersion),
    util.types.toString(tableName),
    queryParameters,
  );
  if (method === "GET") {
    const response = await client.get(tableUrl);
    const { result } = await response.data;
    return result;
  } else if (method === "POST") {
    const response = await client.post(tableUrl, payload);
    const { result } = await response.data;
    return result;
  } else if (method === "PUT") {
    const response = await client.put(tableUrl, payload);
    const { result } = await response.data;
    return result;
  } else if (method === "DELETE") {
    const response = await client.delete(tableUrl);
    const { result } = await response.data;
    return result;
  }
};
const postTable = async (tableProps: PostTableProps) => {
  return makeTableRequest("POST", tableProps);
};
const getTable = async (tableProps: GetTableProps) => {
  return makeTableRequest("GET", tableProps);
};
const putTable = async (tableProps: PutTableProps) => {
  return makeTableRequest("PUT", tableProps);
};
const deleteTable = async (tableProps: DeleteTableProps) => {
  return makeTableRequest("DELETE", tableProps);
};

const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

const cleanJsonInput = (value: unknown) =>
  Object.keys(value)?.length > 0 ? util.types.toObject(value) : undefined;

const getAllTables = async ({
  connection,
  instanceUrl,
  queryParameters,
  debug,
}: GetAllTablesProps) =>
  await getTable({
    connection,
    tableName: "sys_db_object",
    apiVersion: "v2",
    instanceUrl,
    queryParameters,
    debug,
  });

const buildKnowledgeManagementApiUrl = (
  apiVersion: string,
  instanceUrlInput: string,
): string => {
  const subpath =
    apiVersion === "latest" ? "/api/sn_km_api" : `/api/sn_km_api/${apiVersion}`;

  return urljoin(instanceUrlInput, subpath);
};

const getKnowledgeManagementApiClient = (
  connection: Connection,
  instanceUrlInput: string,
  apiVersion: string,
  debug: boolean,
): HttpClient => {
  const baseURL = buildKnowledgeManagementApiUrl(apiVersion, instanceUrlInput);

  return createClient(connection, baseURL, debug);
};

const createNowApiClient = (
  connection: Connection,
  instanceUrlInput: string,
  apiVersion: string,
  debug: boolean,
): HttpClient => {
  const subpath =
    apiVersion === "latest"
      ? `api/now`
      : `api/now/${util.types.toString(apiVersion)}`;
  const baseURL = urljoin(instanceUrlInput, subpath);

  return createClient(connection, baseURL, debug);
};

const DEFAULT_PAGE_SIZE = 100;

const stripUndefined = (
  obj: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

const fetchAllTableRecords = async (
  client: HttpClient,
  url: string,
  query?: Record<string, unknown>,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<unknown[]> => {
  const baseParams = query ? stripUndefined(query) : {};
  const allRecords: unknown[] = [];
  let offset = 0;
  let hasMore = true;

  do {
    const params = {
      ...baseParams,
      sysparm_limit: util.types.toString(pageSize),
      sysparm_offset: util.types.toString(offset),
    };
    const { data } = await client.get(url, { params });
    const records: unknown[] = data?.result || [];
    allRecords.push(...records);

    hasMore = records.length >= pageSize;
    offset += pageSize;
  } while (hasMore);

  return allRecords;
};

const fetchAllKnowledgeRecords = async (
  client: HttpClient,
  url: string,
  query?: Record<string, unknown>,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<unknown[]> => {
  const baseParams = query ? stripUndefined(query) : {};
  const allRecords: unknown[] = [];
  let offset = 0;
  let hasMore = true;

  do {
    const params = {
      ...baseParams,
      limit: pageSize,
      offset,
    };
    const { data } = await client.get(url, { params });
    const articles: unknown[] = data?.result?.articles || [];
    allRecords.push(...articles);

    hasMore = articles.length >= pageSize;
    offset += pageSize;
  } while (hasMore);

  return allRecords;
};

export {
  buildPayload,
  buildTableUrl,
  postTable,
  getTable,
  putTable,
  deleteTable,
  cleanStringInput,
  getAllTables,
  getKnowledgeManagementApiClient,
  createNowApiClient,
  cleanJsonInput,
  fetchAllTableRecords,
  fetchAllKnowledgeRecords,
};
