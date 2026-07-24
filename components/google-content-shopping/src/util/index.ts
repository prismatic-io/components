import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { googleConnection } from "../connections";
import { MERCHANT_API_BASE_URL } from "../constants";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
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
export const getAccessToken = (connection: Connection): string => {
  if (connection.key !== googleConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token.",
    );
  }
  return util.types.toString(connection.token.access_token);
};
export const getClientPropsMerchant = (connection: Connection) => ({
  token: `Bearer ${getAccessToken(connection)}`,
  baseUrl: MERCHANT_API_BASE_URL,
});
