import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { oauth } from "../connections/oauth";
import { MsAdsRestService, REST_BASE_URLS } from "../constants";

export const validateRestConnection = (connection: Connection): void => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(
      connection,
      `Unknown connection type provided: ${connection.key}`,
    );
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received a connection without a valid access token.",
    );
  }

  if (!connection.fields?.developerToken) {
    throw new ConnectionError(
      connection,
      "Received a connection without a valid developer token.",
    );
  }
};

export const getRestBaseUrl = (
  connection: Connection,
  service: MsAdsRestService = MsAdsRestService.CampaignManagement,
): string => {
  const useSandbox = util.types.toBool(connection.fields?.useSandbox);
  return REST_BASE_URLS[service][useSandbox ? "sandbox" : "production"];
};

export const getRestAuthHeaders = (
  connection: Connection,
): Record<string, string> => ({
  Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
  DeveloperToken: util.types.toString(connection.fields?.developerToken),
});
