import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { freshserviceApiKeyConnection } from "../connections";
export const getClientConfig = (connection: Connection) => {
  switch (connection.key) {
    case freshserviceApiKeyConnection.key: {
      const baseUrl = `https://${connection.fields.freshserviceDomain}.freshservice.com/api/v2`;
      const authorization = `Basic ${Buffer.from(`${util.types.toString(connection.fields.apiKey)}:X`).toString("base64")}`;
      return { baseUrl, authorization };
    }
    default:
      throw new ConnectionError(connection, "Unsupported connection.");
  }
};
