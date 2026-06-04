import {
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral/dist/";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";

export const getNewRelicClient = (
  connection: Connection,
  debug: boolean,
  timeout?: unknown,
) => {
  if (connection?.key !== "apiKey") {
    throw new ConnectionError(
      connection,
      `Unsupported authorization method ${connection?.key}.`,
    );
  }

  const newRelicClient = createClient({
    baseUrl: "",
    headers: {
      "Api-Key": util.types.toString(connection.fields.apiKey),
      Accepts: "application/json",
      "Content-type": "application/json",
    },
    timeout: util.types.toInt(timeout, 2000),
    debug,
  });

  return newRelicClient;
};
