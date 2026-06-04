import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import Box from "box-node-sdk";
import type BoxClient from "box-node-sdk/lib/box-client";
import { BASE_URL } from "./constants";

interface CreateAuthorizedClientProps {
  boxConnection: Connection;
}

export const getAccessToken = ({
  boxConnection,
}: CreateAuthorizedClientProps): string => {
  switch (boxConnection.key) {
    case "apiKey": {
      return util.types.toString(boxConnection.fields.apiKey);
    }

    case "oauth2": {
      return util.types.toString(boxConnection?.token?.access_token);
    }

    default:
      throw new ConnectionError(
        boxConnection,
        `Unsupported connection: ${boxConnection.key}`,
      );
  }
};

export const createAuthorizedClient = (
  params: CreateAuthorizedClientProps,
): BoxClient => {
  
  
  

  return Box.getBasicClient(getAccessToken(params));
};

export const createBoxHttpClient = (connection: Connection, debug: boolean) => {
  const client = createClient({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${getAccessToken({ boxConnection: connection })}`,
    },
    debug,
  });
  return client;
};
