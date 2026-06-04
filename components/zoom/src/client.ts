import { ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import type { CreateClientProps } from "./interfaces/CreateClientProps";

export const getToken = ({ connection }: CreateClientProps): string => {
  const connectionKeys = connections.map((c) => c.key);
  if (connectionKeys.includes(connection.key)) {
    if (!connection.token?.access_token) {
      throw new ConnectionError(
        connection,
        "Received valid Connection but it did not contain an access token.",
      );
    }

    const token = util.types.toString(connection.token.access_token);
    return `Bearer ${token}`;
  }

  throw new ConnectionError(connection, "Unknown Connection type provided.");
};

export const createZoomClient = ({
  connection,
  debug,
}: CreateClientProps): HttpClient => {
  return createClient({
    baseUrl: `https://api.zoom.us/v2`,
    headers: {
      Authorization: getToken({ connection }),
      "Content-Type": "Application/JSON",
    },
    debug,
  });
};
