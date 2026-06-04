import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEventHooksExamplePayload } from "../../examplePayloads/webhook";
import { listEventHooksInputs } from "../../inputs/webhooks";
import { listAllEventHooksFN } from "../../util/eventHooks";

export const listEventHooks = action({
  display: {
    label: "List Event Hooks",
    description: "List all event hooks.",
  },
  inputs: listEventHooksInputs,
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await listAllEventHooksFN(client);

    return {
      data,
    };
  },
  examplePayload: listEventHooksExamplePayload,
});
