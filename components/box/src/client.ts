import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { BoxClient, BoxDeveloperTokenAuth } from "box-node-sdk";
import { apiKey, oauth2 } from "./connections";
import { BASE_URL } from "./constants";
interface CreateAuthorizedClientProps {
  boxConnection: Connection;
}
export const getAccessToken = ({
  boxConnection,
}: CreateAuthorizedClientProps): string => {
  switch (boxConnection.key) {
    case apiKey.key: {
      const token = util.types.toString(boxConnection.fields.apiKey);
      if (!token) {
        throw new ConnectionError(
          boxConnection,
          "The Developer Token is empty. Provide a token on the connection.",
        );
      }
      return token;
    }
    case oauth2.key: {
      const token = util.types.toString(boxConnection?.token?.access_token);
      if (!token) {
        throw new ConnectionError(
          boxConnection,
          "The OAuth 2.0 connection has no access token. Reauthorize the connection.",
        );
      }
      return token;
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
  const auth = new BoxDeveloperTokenAuth({ token: getAccessToken(params) });
  return new BoxClient({ auth });
};
export const createBoxHttpClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  return createClient({
    baseUrl: BASE_URL,
    responseType: "json",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getAccessToken({ boxConnection: connection })}`,
    },
    debug,
  });
};
