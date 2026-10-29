import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  serverId,
  serverName,
  serverColor,
  smtpApiActivated,
  rawEmailEnabled,
  deliveryType,
  inboundHookUrl,
} from "../inputs";
import { createHttpClient } from "../client";
import {
  getServerExamplePayload,
  createServerExamplePayload,
  editServerExamplePayload,
  deleteServerExamplePayload,
} from "../examplePayloads";

export const getServer = action({
  display: {
    label: "Get Server",
    description: "Get server information",
  },
  examplePayload: getServerExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );

    const { data } = await client.get(`/server`);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
  },
});

export const editServer = action({
  display: {
    label: "Edit Server Using Server Token Account",
    description: "Edit an existing server",
  },
  examplePayload: editServerExamplePayload,
  perform: async (context, params) => {
    const serverConfig = {
      Name: params.serverName,
      Color: params.serverColor,
    };
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/server`, serverConfig);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    serverName: serverName,
    serverColor: serverColor,
  },
});

export const createServer = action({
  display: {
    label: "Create Server",
    description: "Create a new server",
  },
  examplePayload: createServerExamplePayload,
  perform: async (context, params) => {
    const serverConfig = {
      Name: params.serverName,
      Color: params.serverColor,
      SmtpApiActivated: params.smtpApiActivated,
    };

    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
      true,
    );
    const { data } = await client.post(`/servers`, serverConfig);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    serverName,
    serverColor,
    smtpApiActivated,
    rawEmailEnabled,
    deliveryType,
    inboundHookUrl,
  },
});

export const deleteServer = action({
  display: {
    label: "Delete Server",
    description: "Delete an existing server",
  },
  examplePayload: deleteServerExamplePayload,
  perform: async (context, params) => {
    const client = createHttpClient(
      params.postmarkConnection,
      context.debug.enabled,
      true,
    );
    const { data } = await client.delete(`/servers/${params.serverId}`);
    return {
      data,
    };
  },
  inputs: {
    postmarkConnection: connectionInput,
    serverId: serverId,
  },
});
