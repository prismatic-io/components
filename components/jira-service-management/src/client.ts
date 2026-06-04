import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { buildAuthHeaders, createAtlassianClient } from "atlassian-utils";
import { CONNECTION_KEYS, OPS_GENIE_KEY } from "./connections";
import {
  API_PATH,
  ASSETS_API_HOST,
  ASSETS_WORKSPACE_LOOKUP_PATH,
  EXPERIMENTAL_API_HEADER,
  OPS_API_HOST,
  OPS_API_PATH_PREFIX,
  OPS_EVENTS_BASE_URL,
} from "./constants";
import { resolveAtlassianCloudId } from "./util/cloudId";



export const createClient = async (
  connection: Connection,
  debug: boolean,
  useExperimentalApiHeader = false,
): Promise<{ client: HttpClient; baseUrl: string }> => {
  const client = await createAtlassianClient(connection, {
    keys: CONNECTION_KEYS,
    apiPath: API_PATH,
    debug,
  });
  if (useExperimentalApiHeader) {
    Object.assign(client.defaults.headers.common, EXPERIMENTAL_API_HEADER);
  }
  const baseUrl = client.defaults.baseURL ?? "";
  return { client, baseUrl };
};







export const createOpsManagementClient = async (
  connection: Connection,
  debug: boolean,
): Promise<{ client: HttpClient; baseUrl: string }> => {
  
  const cloudId = await resolveAtlassianCloudId(connection);
  const baseUrl = `https://${OPS_API_HOST}${OPS_API_PATH_PREFIX}/${cloudId}`;
  const client = createHttpClient({
    baseUrl,
    headers: {
      ...buildAuthHeaders(connection, CONNECTION_KEYS),
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
  return { client, baseUrl };
};






export const createOpsEventsClient = (
  connection: Connection,
  debug: boolean,
): { client: HttpClient; baseUrl: string } => {
  if (connection.key !== OPS_GENIE_KEY) {
    throw new ConnectionError(
      connection,
      `JSM Ops Integration Events requires the Ops Integration API Key connection (got "${connection.key}").`,
    );
  }
  const apiKey = util.types.toString(connection.fields.apiKey);
  const client = createHttpClient({
    baseUrl: OPS_EVENTS_BASE_URL,
    headers: {
      Authorization: `GenieKey ${apiKey}`,
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
  return { client, baseUrl: OPS_EVENTS_BASE_URL };
};






const resolveAssetsWorkspaceId = async (
  connection: Connection,
  debug: boolean,
): Promise<string> => {
  const lookupClient = await createAtlassianClient(connection, {
    keys: CONNECTION_KEYS,
    apiPath: ASSETS_WORKSPACE_LOOKUP_PATH,
    debug,
  });
  const { data } = await lookupClient.get<{
    values?: { workspaceId: string }[];
  }>("");
  const workspaceId = data?.values?.[0]?.workspaceId;
  if (!workspaceId) {
    throw new ConnectionError(
      connection,
      "Could not resolve Assets workspace ID. Ensure Assets is enabled for this JSM site.",
    );
  }
  return workspaceId;
};

export const createAssetsClient = async (
  connection: Connection,
  debug: boolean,
): Promise<{ client: HttpClient; baseUrl: string; workspaceId: string }> => {
  const workspaceId = await resolveAssetsWorkspaceId(connection, debug);
  const cloudId = await resolveAtlassianCloudId(connection);
  const baseUrl = `https://${ASSETS_API_HOST}/ex/jira/${cloudId}/jsm/assets/workspace/${workspaceId}/v1`;
  const client = createHttpClient({
    baseUrl,
    headers: {
      ...buildAuthHeaders(connection, CONNECTION_KEYS),
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
  return { client, baseUrl, workspaceId };
};
