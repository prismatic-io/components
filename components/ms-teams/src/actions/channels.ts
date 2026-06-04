import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  listChannelsExamplePayload,
  listChannelMessagesExamplePayload,
} from "../examplePayloads";
import {
  connection,
  teamId,
  channelName,
  membershipType,
  channelId,
  channelDescription,
  visibility,
  message,
  timeout,
  top,
  skipToken,
  contentType,
  filter,
  orderBy,
  search,
  select,
  cardPayload,
  importance,
  fetchAll,
} from "../inputs";
import { paginateResults } from "../utils";

const listChannels = action({
  display: {
    label: "List Channels",
    description: "Retrieve the list of channels in a given team",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      `/teams/${params.teamId}/channels`,
      params.fetchAll,
      {
        $filter: params.filter,
        $select: params.select,
      },
    );

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    teamId,
    timeout,
    filter,
    select,
  },
  examplePayload: listChannelsExamplePayload,
});

const getChannel = action({
  display: {
    label: "Get Channel",
    description: "Retrieve the information and metadata of a given channel",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.get(
      `/teams/${params.teamId}/channels/${params.channelId}`,
    );
    return { data };
  },
  inputs: { connection, teamId, channelId, timeout },
});

const deleteChannel = action({
  display: {
    label: "Delete Channel",
    description: "Delete the information and metadata of a given channel",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.delete(
      `/teams/${params.teamId}/channels/${params.channelId}`,
    );
    return { data };
  },
  inputs: { connection, teamId, channelId, timeout },
});

const createChannel = action({
  display: {
    label: "Create Channel",
    description: "Create a channel inside a team",
  },
  perform: async (
    context,
    {
      connection,
      teamId,
      channelName,
      channelDescription,
      membershipType,
      visibility,
      timeout,
    },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const { data } = await client.post(`/teams/${teamId}/channels`, {
      displayName: channelName,
      description: channelDescription,
      membershipType,
      visibility: visibility,
    });
    return { data };
  },
  inputs: {
    connection,
    teamId,
    channelName,
    channelDescription,
    membershipType,
    visibility,
    timeout,
  },
});

const updateChannel = action({
  display: {
    label: "Update Channel",
    description: "Update an existing channel inside a team",
  },
  perform: async (
    context,
    {
      connection,
      teamId,
      channelName,
      channelId,
      channelDescription,
      visibility,
      timeout,
    },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const { data } = await client.patch(
      `/teams/${teamId}/channels/${channelId}`,
      {
        displayName: channelName || undefined,
        description: channelDescription || undefined,
        visibility: visibility || undefined,
      },
    );
    return { data };
  },
  inputs: {
    connection,
    teamId,
    channelId,
    channelName: { ...channelName, required: false },
    channelDescription: { ...channelDescription, required: false },
    visibility: { ...visibility, required: false },
    timeout,
  },
});

const sendChannelMessage = action({
  display: {
    label: "Send Message To Channel",
    description: "Send a message to a given channel",
  },
  perform: async (
    context,
    {
      connection,
      teamId,
      channelId,
      message,
      timeout,
      contentType,
      importance,
    },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const { data } = await client.post(
      `/teams/${teamId}/channels/${channelId}/messages`,
      {
        body: {
          content: message,
          contentType: util.types.toString(contentType) || undefined,
        },
        importance,
      },
    );
    return { data };
  },
  inputs: {
    connection,
    teamId,
    channelId,
    message,
    contentType,
    timeout,
    importance,
  },
});

const sendChannelAdaptiveCard = action({
  display: {
    label: "Send Adaptive Card To Channel",
    description: "Send an adaptive card message to a given channel",
  },
  perform: async (
    context,
    { connection, teamId, channelId, cardPayload, importance, timeout },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const { data } = await client.post(
      `/teams/${teamId}/channels/${channelId}/messages`,
      {
        body: {
          contentType: "html",
          content: `<attachment id="card"></attachment>`,
        },
        attachments: [
          {
            id: "card",
            contentType: "application/vnd.microsoft.card.adaptive",
            contentUrl: null,
            
            content: util.types.isJSON(cardPayload as string)
              ? cardPayload
              : JSON.stringify(cardPayload),
          },
        ],
        importance,
      },
    );
    return { data };
  },
  inputs: {
    connection,
    teamId,
    channelId,
    cardPayload,
    importance,
    timeout,
  },
});

const listChannelMessages = action({
  display: {
    label: "List Channel Messages",
    description: "List all of the messages in a given channel",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.get(
      `/teams/${params.teamId}/channels/${params.channelId}/messages`,
      {
        params: {
          $top: params.top || undefined,
          $skipToken: params.skipToken || undefined,
          $filter: params.filter || undefined,
          $orderby: params.orderBy || undefined,
          $search: params.search || undefined,
          $select: params.select || undefined,
        },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    teamId,
    channelId,
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    search,
    select,
  },
  examplePayload: listChannelMessagesExamplePayload,
});

export default {
  listChannels,
  getChannel,
  deleteChannel,
  createChannel,
  updateChannel,
  sendChannelMessage,
  sendChannelAdaptiveCard,
  listChannelMessages,
};
