import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deactivateEventHookExamplePayload } from "../../examplePayloads/webhook";
import { deactivateEventHookInputs } from "../../inputs/webhooks";
import { deactivateEventHookFN } from "../../util/eventHooks";

export const deactivateEventHook = action({
  display: {
    label: "Deactivate Event Hook",
    description: "Deactivate a specific event hook.",
  },
  inputs: deactivateEventHookInputs,
  perform: async (context, { connection, eventHookId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await deactivateEventHookFN(client, eventHookId);

    return {
      data,
    };
  },
  examplePayload: deactivateEventHookExamplePayload,
});
