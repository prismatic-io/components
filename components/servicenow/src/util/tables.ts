import { stringify } from "node:querystring";
import { util } from "@prismatic-io/spectral";
import type { Method } from "axios";
import urljoin from "url-join";
import { createClient } from "../client";
import type {
  BaseTableProps,
  DeleteTableProps,
  GetAllTablesProps,
  GetTableProps,
  PostTableProps,
  PutTableProps,
} from "../types";
export const buildTableUrl = (
  apiVersion: string,
  tableName: unknown,
  queryParameters?: Record<string, string | undefined>,
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
export const buildPayload = (
  fieldValuesInput: {
    key: string;
    value: unknown;
  }[],
): Record<string, unknown> =>
  Object.fromEntries(fieldValuesInput.map(({ key, value }) => [key, value]));
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
export const postTable = async (tableProps: PostTableProps) => {
  return makeTableRequest("POST", tableProps);
};
export const getTable = async (tableProps: GetTableProps) => {
  return makeTableRequest("GET", tableProps);
};
export const putTable = async (tableProps: PutTableProps) => {
  return makeTableRequest("PUT", tableProps);
};
export const deleteTable = async (tableProps: DeleteTableProps) => {
  return makeTableRequest("DELETE", tableProps);
};
export const getAllTables = async ({
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
