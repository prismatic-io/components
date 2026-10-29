import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAllEventHooksExamplePayload } from "../../examplePayloads/webhook";
import { deleteAllEventHooksInputs } from "../../inputs/webhooks";
import { deleteAllEventHooksFN } from "../../util/eventHooks";

export const deleteAllEventHooks = action({
  display: {
    label: "Delete All Event Hooks",
    description: "Delete an event hook by ID.",
  },
  inputs: deleteAllEventHooksInputs,
  perform: async (context, { connection, eventHookUrl }) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await deleteAllEventHooksFN(client, eventHookUrl);

    return {
      data,
    };
  },
  examplePayload: deleteAllEventHooksExamplePayload,
});
