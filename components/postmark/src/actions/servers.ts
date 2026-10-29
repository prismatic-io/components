import { action, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  fetchAll,
  serverId,
  count,
  offset,
  serverName,
  serverColor,
  enableSmtpApiErrorHooks,
  smtpApiActivated,
  rawEmailEnabled,
  inboundHookUrl,
} from "../inputs";
import { createHttpClient } from "../client";
import {
  getServersExamplePayload,
  editServersExamplePayload,
  listServersExamplePayload,
} from "../examplePayloads";
import { fetchAllServers } from "../util";

export const getServers = action({
  display: {
    label: "Get Server",
    description: "Get an existing server by ID",
  },
  examplePayload: getServersExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
      true,
    );
    const { data } = await client.get(`/servers/${params.serverId}`);
    return {
      data,
    };
  },
  inputs: { serverId, postmarkConnection: connectionInput },
});

export const editServers = action({
  display: {
    label: "Edit Server",
    description: "Edit an existing server",
  },
  examplePayload: editServersExamplePayload,
  perform: async (context, params) => {
    if (!params.serverId) {
      throw new Error("serverId is required.");
    }

    const serverConfig = {
      Name: params.serverName,
      Color: params.serverColor,
      SmtpApiActivated: params.smtpApiActivated,
      RawEmailEnabled: params.rawEmailEnabled,
      InboundHookUrl: params.inboundHookUrl,
      EnableSmtpApiErrorHooks: params.enableSmtpApiErrorHooks,
    };

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
      true,
    );
    const { data } = await client.put(
      `/servers/${params.serverId}`,
      serverConfig,
    );
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    serverId: serverId,
    serverName: serverName,
    serverColor: serverColor,
    smtpApiActivated: smtpApiActivated,
    rawEmailEnabled: rawEmailEnabled,
    inboundHookUrl: inboundHookUrl,
    enableSmtpApiErrorHooks: enableSmtpApiErrorHooks,
  },
});
export const listServers = action({
  display: {
    label: "List Servers",
    description: "Get a list of all servers associated with the account",
  },
  examplePayload: listServersExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
      true,
    );
    if (params.fetchAll) {
      const data = await fetchAllServers(client, {
        name: params.serverName || undefined,
      });
      return { data };
    }

    const { data } = await client.get(`/servers`, {
      params: {
        count: util.types.toNumber(params.count) || 50,
        offset: util.types.toNumber(params.offset) || 0,
        name: params.serverName || undefined,
      },
    });

    return {
      data: data.Servers,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    serverName: serverName,
    fetchAll,
    count: count,
    offset: offset,
  },
});
