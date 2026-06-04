import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { activateEventHookExamplePayload } from "../../examplePayloads/webhook";
import { activateEventHookInputs } from "../../inputs/webhooks";

export const activateEventHook = action({
  display: {
    label: "Activate Event Hook",
    description: "Activate a specific event hook.",
  },
  inputs: activateEventHookInputs,
  perform: async (context, { connection, eventHookId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/eventHooks/${eventHookId}/lifecycle/activate`);

    return {
      data,
    };
  },
  examplePayload: activateEventHookExamplePayload,
});
