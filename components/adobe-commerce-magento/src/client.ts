import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { adobeCommerceApiKey } from "./connections";
import { productionUrl, sandboxUrl } from "./constants";

const validateConnection = (connection: Connection) => {
  if (connection.key !== adobeCommerceApiKey.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
};

export const getConfig = async (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const useProductionEnvironment = connection?.fields?.productionEnvironment;
  const environmentUrl = useProductionEnvironment ? productionUrl : sandboxUrl;
  const sessionClient = createClient({
    baseUrl: environmentUrl,
    headers: { "Content-Type": "application/json" },
    debug,
  });

  
  const auth = {
    username: util.types.toString(connection?.fields?.applicationId),
    password: util.types.toString(connection?.fields?.applicationSecret),
  };
  try {
    const { data } = await sessionClient.post(
      "/rest/v1/app/session/token",
      {
        grant_type: "session",
        expires_in: 7200,
      },
      { auth },
    );
    return { token: util.types.toString(data.ust), environmentUrl };
  } catch (error) {
    throw new Error("Unable to obtain a session token.");
  }
};

export const getClient = async (connection: Connection, debug: boolean) => {
  const { environmentUrl, token } = await getConfig(connection, debug);
  return createClient({
    baseUrl: `${environmentUrl}/rest/default/V1`,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    debug,
  });
};
