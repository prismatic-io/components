import { type Connection, util } from "@prismatic-io/spectral";
import { adpOauth2 } from "../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../constants";

export const validateConnection = (connection: Connection): void => {
  if (connection.key !== adpOauth2.key) {
    throw new Error("Invalid connection key");
  }
};

export const getBaseUrl = (connection: Connection): string => {
  const { endpoint } = connection.fields;
  return endpoint ? util.types.toString(endpoint) : API_ENDPOINT;
};

export const getTokenEndpoint = (connection: Connection): string => {
  const { tokenEndpoint } = connection.fields;
  return tokenEndpoint ? util.types.toString(tokenEndpoint) : TOKEN_ENDPOINT;
};

export const normalizeCertificateValue = (value: unknown): string =>
  util.types.toString(value).replace(/\\n/g, "\n");
