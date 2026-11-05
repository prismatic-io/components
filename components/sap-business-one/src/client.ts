import type { ActionContext, Connection } from "@prismatic-io/spectral";
import axios, { type AxiosInstance } from "axios";
import https from "node:https";
import { getAuthCredentials, getBaseUrlAndProxy, validateConnection } from "./util";
import type { CustomAxiosClient, LoginClientParams } from "./interfaces/general";
import type { DataSourceContext } from "@prismatic-io/spectral/dist/serverTypes";

export const createClient = async (
  connection: Connection,
  context: ActionContext | DataSourceContext,
  debug = false,
): Promise<AxiosInstance> => {
  validateConnection(connection);
  const { cookie } = await getCookies(connection, context, debug);
  const client = createAxiosClient({
    context,
    debug,
    cookie,
    connection,
  });
  return client;
};

export const getCookies = async (
  connection: Connection,
  context: ActionContext | DataSourceContext,
  debug: boolean,
) => {
  const credentials = getAuthCredentials(connection);
  const cookie = await login({
    credentials,
    context,
    debug,
    connection,
  });
  return { cookie };
};

const login = async ({ credentials, context, debug, connection }: LoginClientParams) => {
  const client = createAxiosClient({
    context,
    debug,
    connection,
  });
  const { headers } = await client.post("/Login", credentials, {
    withCredentials: true,
  });
  const cookies = headers?.["set-cookie"];

  return cookies;
};

export const addInterceptorsToClient = (
  client: AxiosInstance,
  context: ActionContext | DataSourceContext,
  debug = false,
) => {
  if (!debug) {
    return;
  }
  client.interceptors.response.use((response) => {
    context.logger.debug(`response`, response);
    return response;
  });
  client.interceptors.request.use((request) => {
    context.logger.debug(`request`, request);
    return request;
  });
};

export const createAxiosClient = ({
  context,
  debug = false,
  cookie = [],
  connection,
}: CustomAxiosClient) => {
  const { baseUrl, proxy } = getBaseUrlAndProxy(connection);
  const client = axios.create({
    baseURL: baseUrl,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    proxy,
    headers: {
      Cookie: cookie,
    },
  });
  addInterceptorsToClient(client, context, debug);
  return client;
};
