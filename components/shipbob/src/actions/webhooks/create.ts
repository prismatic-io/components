import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  shipbob_channel_id,
  subscription_url,
  Topic,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new Webhook",
  },
  perform: async (
    context,
    { connectionInput, version, shipbob_channel_id, ...inputs },
  ) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const params = generatePayload(shipbob_channel_id);
    const body = generatePayload(inputs);
    const { data } = await client.post(`/webhook`, body, {
      params,
    });
    return { data };
  },
  inputs: {
    connectionInput,
    version,
    Topic: { ...Topic, required: true },
    subscription_url,
    shipbob_channel_id,
  },
  examplePayload: createWebhookExamplePayload,
});
