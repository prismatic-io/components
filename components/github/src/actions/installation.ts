import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const appsListReposAccessibleToInstallation = action({
  display: {
    label: "Apps List Repos Accessible To Installation",
    description: "List repositories accessible to the app installation",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/installation/repositories`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const appsRevokeInstallationAccessToken = action({
  display: {
    label: "Apps Revoke Installation Access Token",
    description: "Revoke an installation access token",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/installation/token`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

export default {
  appsListReposAccessibleToInstallation,
  appsRevokeInstallationAccessToken,
};
