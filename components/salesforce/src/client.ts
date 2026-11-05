import jsforce from "jsforce";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { salesforceBasic, salesforceClientCredentials, salesforceOAuth } from "./connections";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

export const createSalesforceClient = async (connection: Connection, version: string) => {
  switch (connection.key) {
    case salesforceBasic.key: {
      const loginUrl = util.types.toString(connection.fields?.loginUrl);
      const salesforceConnection = new jsforce.Connection({
        loginUrl,
        version,
      });
      await salesforceConnection.login(
        util.types.toString(connection.fields.username),
        util.types.toString(connection.fields.password),
      );
      return salesforceConnection;
    }
    case salesforceOAuth.key: {
      const salesforceConnection = new jsforce.Connection({
        instanceUrl: util.types.toString(connection.token.instance_url),
        version,
        accessToken: util.types.toString(connection.token.access_token),
      });
      return salesforceConnection;
    }
    case salesforceClientCredentials.key: {
      const salesforceConnection = new jsforce.Connection({
        instanceUrl: util.types.toString(connection.token.instance_url),
        version,
        accessToken: util.types.toString(connection.token.access_token),
      });
      return salesforceConnection;
    }
    default: {
      throw new ConnectionError(connection, `Connection type ${connection.key} is not supported`);
    }
  }
};

export const createSalesforceHttpClient = async (
  version: string,
  connection: Connection,
  debug = false,
) => {
  const sfClient = await createSalesforceClient(connection, version);
  const baseUrl = `${sfClient.instanceUrl}/services/data/v${version}/`;
  const httpClient = createClient({
    baseUrl,
    debug,
    headers: {
      Authorization: `Bearer ${sfClient.accessToken}`,
      Accept: "application/json",
    },
  });

  return httpClient;
};
