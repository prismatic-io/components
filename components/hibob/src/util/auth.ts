import { type Connection, util } from "@prismatic-io/spectral";
import { hiBobOAuthConnection } from "../connections";
import { HIBOB_API_URL_PROD, HIBOB_API_URL_SANDBOX } from "../constants";
import { validateConnection } from "./connection";

export const getBaseUrl = (connection: Connection): string => {
  validateConnection(connection);

  const useSandbox = util.types.toBool(connection.fields?.useSandbox);
  return useSandbox ? HIBOB_API_URL_SANDBOX : HIBOB_API_URL_PROD;
};

export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  const commonHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (connection.key === hiBobOAuthConnection.key) {
    const accessToken = util.types.toString(connection.token?.access_token);
    return {
      ...commonHeaders,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const serviceUserId = util.types.toString(connection.fields.serviceUserId);
  const token = util.types.toString(connection.fields.token);
  const encodedCredentials = Buffer.from(`${serviceUserId}:${token}`).toString(
    "base64",
  );

  return {
    ...commonHeaders,
    Authorization: `Basic ${encodedCredentials}`,
  };
};
