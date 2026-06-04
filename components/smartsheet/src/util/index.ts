import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  smartsheetApiKey,
  smartsheetOAuth2,
  smartsheetTemplatedOAuth,
} from "../connections";

export * from "./polling";

export const validateConnection = (
  connection: Connection,
): connection is Connection => {
  if (
    ![
      smartsheetOAuth2.key,
      smartsheetApiKey.key,
      smartsheetTemplatedOAuth.key,
    ].includes(connection.key)
  ) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }
  return true;
};

export const getToken = (connection: Connection): string => {
  return util.types.toString(
    connection.token?.access_token || connection.fields?.apiKey,
  );
};

export const getBaseUrl = (connection: Connection): string => {
  return util.types.toString(connection.fields.baseUrl);
};

export const getHeaders = (connection: Connection): Record<string, string> => {
  const apiKey = getToken(connection);
  return {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  };
};

export const cleanObjectInput = (value: unknown) => {
  const data = util.types.toObject(value);
  if (!data) {
    return [];
  }
  if (Array.isArray(data)) {
    return data;
  }
  throw new Error("Object must be an array");
};

export const mapColumn = (
  key: string | number,
  value: unknown,
  columnDataObject: Record<string, { id: number; type: string }>,
) => {
  const { id: columnId, type: columnType } = columnDataObject[key];
  if (!columnId) {
    throw new Error(`Cannot find a column matching ${key}`);
  }
  return {
    columnId,
    value: columnType === "CHECKBOX" ? util.types.toBool(value) : value,
  };
};
