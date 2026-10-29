import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { bigCommerceConnection } from "./connections";

export const createAuthorizedClient = async (
  connection: Connection,
  debug: boolean,
): Promise<HttpClient> => {
  if (connection.key !== bigCommerceConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  const token = connection?.token?.access_token;

  if (!token || typeof token !== "string") {
    throw new Error("Invalid or missing token.");
  }

  const client = createClient({
    baseUrl: "https://api.bigcommerce.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Auth-Token": token,
    },
    debug,
  });

  return Promise.resolve(client);
};
