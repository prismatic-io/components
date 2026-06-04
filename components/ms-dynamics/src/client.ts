import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DynamicsWebApi } from "dynamics-web-api";

const DATAVERSE_API_VERSION = "9.2";

export const getWebApiUrl = async (connection: Connection, debug: boolean): Promise<string> => {
  
  const baseUrl = util.types.toString(connection.fields.webApiUrl);
  const client = createHttpClient({
    baseUrl,
    debug,
  });
  const headResponse = await client.head(baseUrl, {
    headers: {
      timeout: 3000,
    },
  });
  if (headResponse.status !== 200) {
    throw new ConnectionError(
      connection,
      "Unsupported Web API URL configured. Please specify a valid Microsoft Dynamics 365 API URL."
    );
  }
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return util.types.toString(new URL(`api/data/v${DATAVERSE_API_VERSION}/`, normalizedBase));
};

export const createCrmClient = async (connection: Connection, debug: boolean) => {
  
  await getWebApiUrl(connection, debug);

  
  const serverUrl = util.types.toString(connection.fields.webApiUrl);

  
  const onTokenRefresh = async (): Promise<{ accessToken: string }> => {
    const accessToken = util.types.toString(
      (connection.token as { access_token?: unknown })?.access_token
    );
    return { accessToken };
  };

  return new DynamicsWebApi({
    serverUrl,
    dataApi: { version: DATAVERSE_API_VERSION },
    onTokenRefresh,
  });
};
