import { URLSearchParams } from "node:url";
import { trigger, util } from "@prismatic-io/spectral";
import { slashCommandWebhookInputs } from "../inputs";

export const slashCommandWebhook = trigger({
  display: {
    label: "Slash Command Webhook",
    description:
      "Receive slash command and modal interaction requests from Slack for manually configured webhook endpoints.",
  },
  perform: async (context, payload, params) => {
    const deserializedPayload = Object.fromEntries(
      new URLSearchParams(payload.rawBody.data.toString())
    );

    const response = {
      statusCode: 200,
      contentType: util.types.toString(params.contentType),
      ...(params.responseBody
        ? { body: util.types.toString(params.responseBody) }
        : {}),
    };

    return Promise.resolve({
      payload: {
        ...payload,
        deserializedBody: deserializedPayload,
      },
      response,
    });
  },
  inputs: slashCommandWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
