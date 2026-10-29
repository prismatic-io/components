import { util, type Connection } from "@prismatic-io/spectral";
import axios, { type AxiosInstance } from "axios";
import https from "node:https";
import type { ClientContext } from "./types";
import { getBasicAuthHeader, validateConnection } from "./util";

export const createClient = (
  connection: Connection,
  context: ClientContext,
  debug: boolean,
): AxiosInstance => {
  validateConnection(connection);

  const host = util.types.toString(connection.fields.host);
  const port = util.types.toString(connection.fields.port);
  const baseURL = `https://${host}:${port}`;
  const sapClient = util.types.toString(connection.fields.sapClient);
  const authHeader = getBasicAuthHeader(connection);

  const client = axios.create({
    baseURL,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
      "Content-Type": "text/xml; charset=utf-8",

      Authorization: authHeader,
    },
    params: { "sap-client": sapClient },
    responseType: "text",
    validateStatus: () => true,
  });

  client.interceptors.response.use((response) => {
    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      client.defaults.headers.common.Cookie = Array.isArray(setCookie)
        ? setCookie.join("; ")
        : setCookie;
    }
    return response;
  });

  if (debug) {
    client.interceptors.request.use((request) => {
      context.logger.debug("request", request);
      return request;
    });
    client.interceptors.response.use(
      (response) => {
        context.logger.debug("response", response);
        return response;
      },
      (error) => {
        context.logger.debug("response error", error);
        return Promise.reject(error);
      },
    );
  }

  return client;
};
