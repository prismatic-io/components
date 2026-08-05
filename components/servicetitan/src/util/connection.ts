import { type Connection, util } from "@prismatic-io/spectral";
import { serviceTitanConnection } from "../connections";
import { URLS } from "../constants";
export const validateConnection = (connection: Connection) => {
  if (connection.key !== serviceTitanConnection.key) {
    throw new Error("Connection is not authorized");
  }
};
export const getURLFromConnection = (
  connection: Connection,
  urlType: string | undefined,
) => {
  if (!urlType) {
    throw new Error("URL type is required");
  }
  const environment =
    util.types.toString(connection.fields.environment) || "production";
  const tenant = util.types.toString(connection.fields.tenant);
  const completeServiceTitanURL = `${URLS[environment]}/${urlType}/v2/tenant/${tenant}`;
  return completeServiceTitanURL;
};
export const getTokenFromConnection = (connection: Connection) => {
  return util.types.toString(connection.token?.access_token);
};
export const getApplicationKeyFromConnection = (connection: Connection) => {
  return util.types.toString(connection.fields.applicationKey);
};
