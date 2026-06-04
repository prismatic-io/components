import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { buildAuthHeaders } from "atlassian-utils";
import { CONNECTION_KEYS } from "../connections";
import type { AccessibleResource } from "../types";

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









export const resolveAtlassianCloudId = async (
  connection: Connection,
): Promise<string> => {
  if (connection.key === CONNECTION_KEYS.basic) {
    const host = util.types
      .toString(connection.fields.host)
      .replace(/^https?:\/\//, "");
    const { data } = await createHttpClient({
      baseUrl: `https://${host}/_edge/tenant_info`,
      headers: buildAuthHeaders(connection, CONNECTION_KEYS),
    }).get<{ cloudId: string }>("");
    return data.cloudId;
  }

  const { data: resources } = await createHttpClient({
    baseUrl: "https://api.atlassian.com/oauth/token/accessible-resources",
    headers: buildAuthHeaders(connection, CONNECTION_KEYS),
  }).get<AccessibleResource[]>("");

  const override =
    util.types.toString(connection.fields.apiSiteOverride) || undefined;
  return override
    ? findResourceByOverride(resources, override)
    : resources[0].id;
};
