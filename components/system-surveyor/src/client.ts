import type { Connection } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import type { CrossFlowState } from "./types";
import { getBaseUrl, getToken, refreshCachedToken } from "./util";
import { validateConnection } from "./util/validateConnection";

interface ClientContext {
  crossFlowState?: CrossFlowState;
  debug?: { enabled?: boolean };
  [key: string]: unknown;
}






export const createSsvClient = async (
  ssvConnection: Connection,
  context: ClientContext = {},
) => {
  validateConnection(ssvConnection);

  const debug = context.debug?.enabled ?? false;
  const baseUrl = getBaseUrl(ssvConnection);
  const crossFlowState = context.crossFlowState ?? {};
  const token = await getToken(ssvConnection, crossFlowState, debug);

  const client = createClient({
    debug,
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  
  client.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status !== 401 || error.config?._retried) {
      throw error;
    }

    error.config._retried = true;
    const newToken = await refreshCachedToken(
      ssvConnection,
      crossFlowState,
      debug,
    );
    error.config.headers.Authorization = `Bearer ${newToken}`;

    return client.request(error.config);
  });

  return client;
};
