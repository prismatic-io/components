import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { verifyEventHookExamplePayload } from "../../examplePayloads/webhook";
import { verifyEventHookInputs } from "../../inputs/webhooks";
import { verifyEventHookFN } from "../../util/eventHooks";

export const verifyEventHook = action({
  display: {
    label: "Verify Event Hook",
    description: "Verify a specific event hook.",
  },
  inputs: verifyEventHookInputs,
  perform: async (context, { connection, eventHookId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await verifyEventHookFN(client, eventHookId);

    return {
      data,
    };
  },
  examplePayload: verifyEventHookExamplePayload,
});
