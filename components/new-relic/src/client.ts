import {
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral/dist/";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URLS, type Service } from "./constants";
import type { Region } from "./types";
export const getNewRelicClient = (
  connection: Connection,
  debug: boolean,
  service: Service,
  timeout?: unknown,
) => {
  if (connection?.key !== "apiKey") {
    throw new ConnectionError(
      connection,
      `Unsupported authorization method ${connection?.key}.`,
    );
  }
  const region = (util.types.toString(connection.fields.region) ||
    "US") as Region;
  const baseUrl = BASE_URLS[service][region];
  const newRelicClient = createClient({
    baseUrl,
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
