import { URL } from "node:url";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { AccessibleResource } from "../interfaces/AccessibleResource";
import type { AtlassianConnectionKeys } from "../interfaces/AtlassianConnectionKeys";
import { buildAuthHeaders } from "./buildAuthHeaders";

const findResourceByOverride = (
  resources: AccessibleResource[],
  override: string,
): string => {
  const match = resources.find(({ url, name }) => {
    const origin = new URL(url).hostname;
    return name === override || override.includes(origin);
  });
  if (match) return match.id;
  throw new Error(`No accessible Atlassian resource found for "${override}"`);
};

export const resolveAtlassianHost = async (
  connection: Connection,
  keys: AtlassianConnectionKeys,
): Promise<string> => {
  if (connection.key === keys.basic) {
    return util.types
      .toString(connection.fields.host)
      .replace(/^https?:\/\//, "");
  }

  if (keys.clientCredentials && connection.key === keys.clientCredentials) {
    const cloudId = util.types.toString(connection.fields.cloudId);
    return `api.atlassian.com/ex/jira/${cloudId}`;
  }

  if (connection.key === keys.oauth2) {
    try {
      const { data: resources } = await createHttpClient({
        baseUrl: "https://api.atlassian.com/oauth/token/accessible-resources",
        headers: buildAuthHeaders(connection, keys),
      }).get<AccessibleResource[]>("");

      const override =
        util.types.toString(connection.fields.apiSiteOverride) || undefined;
      const id = override
        ? findResourceByOverride(resources, override)
        : resources[0].id;

      return `api.atlassian.com/ex/jira/${id}`;
    } catch (error) {
      throw new Error(`Failed to retrieve accessible resources. ${error}`);
    }
  }

  throw new ConnectionError(
    connection,
    `Unsupported connection type: ${connection.key}`,
  );
};
