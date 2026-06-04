import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";

interface CreateClientProps {
  connection: Connection;
}

export const createClient = ({ connection }: CreateClientProps, debug: boolean) => {
  return createHttpClient({
    baseUrl: "https://api.powerbi.com/v1.0/myorg/",
    headers: {
      Authorization: `Bearer ${connection.token.access_token}`,
      "Content-Type": "application/json",
    },
    debug,
  });
};
