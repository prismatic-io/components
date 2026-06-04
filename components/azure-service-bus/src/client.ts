import { ClientSecretCredential } from "@azure/identity";
import { ServiceBusClient } from "@azure/service-bus";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { connectionString, oauth } from "./connections";

const validateConnection = (connection: Connection) => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(
      connection,
      "Unknown Connection type provided. Only 'OAuth 2.0' authentication method is supported for this action.",
    );
  }
};

const validateConnectionLibrary = (connection: Connection) => {
  if (connection.key !== connectionString.key) {
    throw new ConnectionError(
      connection,
      "Unknown Connection type provided. Only 'Connection String' authentication method is supported for this action.",
    );
  }
};

const generateOAuthCredentials = (
  connection: Connection,
  namespace: string,
) => {
  const { clientId, clientSecret, tenantId } = connection.fields;

  const credential = new ClientSecretCredential(
    util.types.toString(tenantId),
    util.types.toString(clientId),
    util.types.toString(clientSecret),
  );

  const serviceBusClient = new ServiceBusClient(
    `${namespace}.servicebus.windows.net`,
    credential,
  );

  return serviceBusClient;
};

const generateConnectionStringCredentials = (connection: Connection) => {
  const { connectionString } = connection.fields;

  const serviceBusClient = new ServiceBusClient(
    util.types.toString(connectionString),
  );

  return serviceBusClient;
};

const generateClient = (connection: Connection, namespace: string) => {
  switch (connection.key) {
    case oauth.key:
      return generateOAuthCredentials(connection, namespace);
    case connectionString.key:
      return generateConnectionStringCredentials(connection);
    default:
      throw new ConnectionError(
        connection,
        "Unknown Connection type provided.",
      );
  }
};

export const getAzureServiceBusClient = (
  connection: Connection,
  debug: boolean,
) => {
  validateConnection(connection);
  const token = util.types.toString(connection?.token?.access_token);

  const azureServiceBusClient = createClient({
    baseUrl: "https://management.azure.com/subscriptions",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    debug,
  });
  return azureServiceBusClient;
};

export const azureServiceBusClientLibrary = (
  connection: Connection,
  namespace: string,
) => {
  validateConnectionLibrary(connection);
  const serviceBusClient = generateClient(connection, namespace);

  return serviceBusClient;
};
