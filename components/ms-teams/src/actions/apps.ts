import { action } from "@prismatic-io/spectral";
import { createClient, baseUrl } from "../client";
import {
  connection,
  teamId,
  appId,
  appInstallationId,
  timeout,
  filter,
  select,
  expand,
  fetchAll,
} from "../inputs";
import { paginateResults } from "../utils";

const listCatalogApps = action({
  display: {
    label: "List Catalog Apps",
    description: "Retrieve the list of apps in the catalog",
  },
  inputs: {
    connection,
    fetchAll,
    filter,
    select,
    expand,
    timeout,
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      "/appCatalogs/teamsApps",
      params.fetchAll,
      {
        $filter: params.filter,
        $select: params.select,
        $expand: params.expand,
      },
    );
    return { data };
  },
});

const listInstalledApps = action({
  display: {
    label: "List Installed Apps",
    description: "Retrieve the list of installed apps in a given team",
  },
  inputs: {
    connection,
    teamId,
    filter,
    select,
    expand,
    timeout,
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    const { data } = await client.get(`/teams/${params.teamId}/installedApps`, {
      params: {
        $filter: params.filter || undefined,
        $select: params.select || undefined,
        $expand: params.expand || undefined,
      },
    });
    return { data };
  },
});

const addInstalledApp = action({
  display: {
    label: "Install App",
    description: "Add an Installed App to given team",
  },
  inputs: {
    connection,
    teamId,
    appId,
    timeout,
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.post(
      `/teams/${params.teamId}/installedApps`,
      {
        "teamsApp@odata.bind": `${baseUrl}/appCatalogs/teamsApps/${params.appId}`,
      },
    );
    return { data };
  },
});

const upgradeInstalledApp = action({
  display: {
    label: "Upgrade Installed App",
    description:
      "Upgrade an Installed App to the latest version for given team",
  },
  inputs: {
    connection,
    teamId,
    appInstallationId,
    timeout,
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/teams/${params.teamId}/installedApps/${params.appInstallationId}/upgrade`,
    );
    return { data };
  },
});

const removeInstalledApp = action({
  display: {
    label: "Remove Installed App",
    description: "Remove an Installed App from the given team",
  },
  inputs: {
    connection,
    teamId,
    appInstallationId,
    timeout,
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/teams/${params.teamId}/installedApps/${params.appInstallationId}`,
    );
    return { data };
  },
});

export default {
  listCatalogApps,
  listInstalledApps,
  addInstalledApp,
  upgradeInstalledApp,
  removeInstalledApp,
};
