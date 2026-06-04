import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, validateConnection } from "./util";
import { stringify } from "qs";
import type { LoginData } from "./interfaces/LoginData";
import type { TrustedSession } from "./interfaces/TrustedSession";

const login = async (
  connection: Connection,
  debug: boolean,
  trustedSession?: TrustedSession,
): Promise<LoginData> => {
  const devKey = connection.fields.developerKey;

  const sendData = stringify({
    userName: connection.fields.username,
    password: connection.fields.password,
    orgId: connection.fields.organizationId,
    devKey,
    ...(trustedSession || {}),
  });
  const baseUrl = getBaseUrl(connection);
  const client = createHttpClient({
    baseUrl,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    debug,
  });

  const { data } = await client.post("/Login.json", sendData);

  if (data.response_status !== 0) {
    throw new Error(JSON.stringify(data));
  }

  return { ...data.response_data, devKey };
};

export const getClient = async (
  connection: Connection,
  debug: boolean,
  trustedSession?: TrustedSession,
): Promise<{ client: HttpClient; loginData: LoginData }> => {
  validateConnection(connection);

  const loginData = await login(connection, debug, trustedSession);

  const baseUrl = getBaseUrl(connection);
  const client = createHttpClient({
    baseUrl,
    debug,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
  });
  return { client, loginData };
};
