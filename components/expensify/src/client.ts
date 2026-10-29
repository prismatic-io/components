import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { basicConnection } from "./connections";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const baseUrl =
  "https://integrations.expensify.com/Integration-Server/ExpensifyIntegrations";

export const validateConnection = (connection: Connection): void => {
  if (![basicConnection.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `The Connection you provided is not supported for this component`,
    );
  }
  if (
    !connection.fields.partnerUserID ||
    !connection.fields.partnerUserSecret
  ) {
    throw new ConnectionError(
      connection,
      `The Connection you provided is missing the required fields`,
    );
  }
};

export const createClient = (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const client = createHttpClient({
    baseUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    debug,
  });
  return client;
};
