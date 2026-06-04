import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";








export const getBaseUrl = (connection: Connection): string => {
  const restInstanceUrl = util.types.toString(
    connection.token?.rest_instance_url,
  );

  if (!restInstanceUrl) {
    throw new ConnectionError(
      connection,
      "The OAuth token response did not include a rest_instance_url. " +
        "Verify the Marketing Cloud connection is configured correctly.",
    );
  }

  
  return restInstanceUrl.replace(/\/$/, "");
};

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);

  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};








export const getAuthenticatedConnectionDetails = (
  connection: Connection,
): {
  accessToken: string;
  baseUrl: string;
} => {
  validateConnection(connection);

  const accessToken = util.types.toString(connection.token?.access_token);
  const baseUrl = getBaseUrl(connection);

  return { accessToken, baseUrl };
};
