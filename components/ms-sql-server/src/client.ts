import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError, util } from "@prismatic-io/spectral";
import type { config as Config } from "mssql";
import { ConnectionPool } from "mssql";

const createBasicConfig = (
  sqlConnection: Connection,
  timeout: number,
): Config => {
  const connectionTimeout = sqlConnection.fields.connectionTimeout
    ? util.types.toInt(sqlConnection.fields.connectionTimeout)
    : 15000;

  return {
    port: util.types.toInt(sqlConnection.fields.port),
    server: util.types.toString(sqlConnection.fields.host),
    user: util.types.toString(sqlConnection.fields.username),
    password: util.types.toString(sqlConnection.fields.password),
    database: util.types.toString(sqlConnection.fields.database),
    requestTimeout: timeout,
    stream: false,
    connectionTimeout,
    options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };
};

const createAzureADConfig = (
  sqlConnection: Connection,
  timeout: number,
): Config => {
  const connectionTimeout = sqlConnection.fields.connectionTimeout
    ? util.types.toInt(sqlConnection.fields.connectionTimeout)
    : 15000;

  return {
    port: util.types.toInt(sqlConnection.fields.port),
    server: util.types.toString(sqlConnection.fields.host),
    database: util.types.toString(sqlConnection.fields.database),
    requestTimeout: timeout,
    stream: false,
    connectionTimeout,
    authentication: {
      type: "azure-active-directory-service-principal-secret" as const,
      options: {
        clientId: util.types.toString(sqlConnection.fields.clientId),
        clientSecret: util.types.toString(sqlConnection.fields.clientSecret),
        tenantId: util.types.toString(sqlConnection.fields.tenantId),
      },
    },
    options: {
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: false,
    },
  };
};

export const createConnectionPool = (
  sqlConnection: Connection,
  timeout = 60000,
  debug = false,
) => {
  let config: Config;

  switch (sqlConnection.key) {
    case "basic":
      config = createBasicConfig(sqlConnection, timeout);
      break;
    case "azureAd":
      config = createAzureADConfig(sqlConnection, timeout);
      break;
    default:
      throw new ConnectionError(
        sqlConnection,
        `Unsupported authorization method ${sqlConnection.key}.`,
      );
  }

  if (debug) {
    const { authentication, ...safeConfig } = config as Config & {
      authentication?: unknown;
    };
    console.log(
      `MSSQL connection config (${sqlConnection.key}):`,
      JSON.stringify({ ...safeConfig, password: undefined }, null, 2),
    );
  }

  return new ConnectionPool(config);
};
