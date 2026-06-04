import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient,
  handleErrors,
} from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL, OAUTH_URL } from "./constants";

export async function getToken(domoConnection: Connection, debug: boolean) {
  const clientId = domoConnection?.fields?.clientId;
  const clientSecret = domoConnection?.fields?.clientSecret;
  const scope = domoConnection?.fields?.scopes;

  
  const credentials = `${clientId}:${clientSecret}`;

  
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const client = createClient({
    baseUrl: OAUTH_URL,
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
    debug,
  });

  try {
    const { data } = await client.get("/token", {
      params: { grant_type: "client_credentials", scope },
    });

    return data.access_token;
  } catch (error) {
    const handled = handleErrors(error);
    const serialized = util.types.toJSON(handled);
    throw new Error(serialized);
  }
}

export const getDomoClient = async (
  domoConnection: Connection,
  debug: boolean,
) => {
  const token = await getToken(domoConnection, debug);
  return createClient({
    baseUrl: BASE_URL,
    headers: {
      authorization: `Bearer ${token}`,
    },
    debug,
  });
};
