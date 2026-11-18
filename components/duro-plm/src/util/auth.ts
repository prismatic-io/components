import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const getCredentials = (
  connection: Connection,
): { apiKey: string; url: string } => {
  const customDuroEnvironment = util.types
    .toString(connection.fields.customDuroEnvironment)
    .trim();

  const url =
    customDuroEnvironment ||
    util.types.toString(connection.fields.duroEnvironment);
  const apiKey = util.types.toString(connection.fields.username);
  if (!apiKey || !url) {
    throw new ConnectionError(
      connection,
      "The Duro connection is missing its API Key or GraphQL endpoint.",
    );
  }
  return {
    apiKey,
    url,
  };
};
