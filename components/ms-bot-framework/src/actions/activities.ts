import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  serviceUrl,
  apiVersion,
  conversationId,
  fromId,
  fromName,
  cardPayload,
  text,
  textFormat,
} from "../inputs";
import {
  sendMessageExamplePayload,
  sendAdaptiveCardMessageExamplePayload,
} from "../examplePayloads";

const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Create a message to a Conversation",
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      params.serviceUrl,
      params.apiVersion,
      context.debug.enabled,
    );
    const { data } = await client.post(`/conversations/${params.conversationId}/activities`, {
      type: "message",
      text: params.text,
      textFormat: params.textFormat,
      from: { id: params.fromId, name: params.fromName },
    });
    return { data };
  },
  inputs: {
    connection,
    serviceUrl,
    apiVersion,
    conversationId,
    fromId,
    fromName,
    text,
    textFormat,
  },
  examplePayload: sendMessageExamplePayload,
});

const sendAdaptiveCardMessage = action({
  display: {
    label: "Send Adaptive Card Message",
    description: "Send an adaptive card message",
  },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      params.serviceUrl,
      params.apiVersion,
      context.debug.enabled,
    );
    const { data } = await client.post(`/conversations/${params.conversationId}/activities`, {
      type: "message",
      from: { id: params.fromId, name: params.fromName },
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          contentUrl: null,
          content: params.cardPayload,
        },
      ],
    });
    return { data };
  },
  inputs: {
    connection,
    serviceUrl,
    apiVersion,
    conversationId,
    fromId,
    fromName,
    cardPayload,
  },
  examplePayload: sendAdaptiveCardMessageExamplePayload,
});

export default {
  sendMessage,
  sendAdaptiveCardMessage,
};
