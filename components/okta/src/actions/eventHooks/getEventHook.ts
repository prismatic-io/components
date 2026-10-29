import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEventHookExamplePayload } from "../../examplePayloads/webhook";
import { getEventHookInputs } from "../../inputs/webhooks";
import type { Webhook } from "../../interfaces/webhook";

export const getEventHook = action({
  display: {
    label: "Get Event Hook",
    description: "Get an event hook by ID.",
  },
  inputs: getEventHookInputs,
  perform: async (context, { connection, eventHookId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get<Webhook>(`/eventHooks/${eventHookId}`);

    return {
      data,
    };
  },
  examplePayload: getEventHookExamplePayload,
});
