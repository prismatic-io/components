import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "./constants";
import { getBearerToken, validateConnection } from "./util";
export const createAsanaClient = async (
  asanaConnection: Connection,
  debug: boolean,
): Promise<HttpClient> => {
  validateConnection(asanaConnection);
  const asanaClient = createClient({
    baseUrl: BASE_URL,
    headers: {
      authorization: getBearerToken(asanaConnection),
    },
    debug,
  });
  try {
    await asanaClient.get("/users/me");
  } catch (err) {
    throw new ConnectionError(
      asanaConnection,
      `Unsupported connection properties ${err}.`,
    );
  }
  return asanaClient;
};
