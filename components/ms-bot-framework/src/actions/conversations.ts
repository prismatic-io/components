import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  serviceUrl,
  apiVersion,
  botId,
  conversationId,
  channelAccountId,
  tenantId,
} from "../inputs";
import {
  createConversationExamplePayload,
  getConversationMembersExamplePayload,
} from "../examplePayloads";

const createConversation = action({
  display: {
    label: "Create Conversation",
    description: "Create a new Conversation",
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      params.serviceUrl,
      params.apiVersion,
      context.debug.enabled,
    );

    const { data } = await client.post(`/conversations`, {
      bot: {
        id: params.botId,
      },
      members: [
        {
          id: params.channelAccountId,
        },
      ],
      channelData: {
        tenant: {
          id: params.tenantId,
        },
      },
    });
    return { data };
  },
  inputs: {
    connection,
    serviceUrl,
    apiVersion,
    botId,
    channelAccountId,
    tenantId,
  },
  examplePayload: createConversationExamplePayload,
});

const getConversationMembers = action({
  display: {
    label: "Get Conversation Members",
    description: "Get list of members of the conversation",
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      params.serviceUrl,
      params.apiVersion,
      context.debug.enabled,
    );
    const { data } = await client.get(`/conversations/${params.conversationId}/members`);
    return { data };
  },
  inputs: {
    connection,
    serviceUrl,
    apiVersion,
    conversationId,
  },
  examplePayload: getConversationMembersExamplePayload,
});

export default {
  createConversation,
  getConversationMembers,
};
