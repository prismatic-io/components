import { action, input, util } from "@prismatic-io/spectral";
import { connection, cardPayload } from "../inputs";
import { createIncomingWebhookClient } from "../client";

const sendIncomingWebhookMessage = action({
  display: {
    label: "Send Incoming Webhook Message",
    description: "Send a text message to an Incoming Webhook",
  },
  inputs: {
    connection,
    message: input({
      label: "Message",
      type: "string",
      required: true,
      placeholder: "Message to send",
      comments: "Message to send to the Incoming Webhook",
      clean: util.types.toString,
    }),
  },
  perform: async (context, { connection, message }) => {
    const client = createIncomingWebhookClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.post("/", { text: message });
    return { data };
  },
});

const sendIncomingWebhookAdaptiveCard = action({
  display: {
    label: "Send Incoming Webhook Adaptive Card",
    description: "Send an adaptive card message to an Incoming Webhook",
  },
  inputs: {
    connection,
    cardPayload,
  },
  perform: async (context, { connection, cardPayload }) => {
    const client = createIncomingWebhookClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.post("/", {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          contentUrl: null,
          
          content: util.types.isJSON(cardPayload as string)
            ? JSON.parse(cardPayload as string)
            : cardPayload,
        },
      ],
    });
    return { data };
  },
});

export default {
  sendIncomingWebhookMessage,
  sendIncomingWebhookAdaptiveCard,
};
