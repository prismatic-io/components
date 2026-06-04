import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { apiKeyConnection, oauth2AuthorizationCode } from "./connections/";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const validateConnection = (connection: Connection): void => {
  if (
    ![apiKeyConnection.key, oauth2AuthorizationCode.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }
};
