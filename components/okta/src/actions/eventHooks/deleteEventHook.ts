import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteEventHookExamplePayload } from "../../examplePayloads/webhook";
import { deleteEventHookInputs } from "../../inputs/webhooks";
import { deleteEventHookById } from "../../util/eventHooks";

export const deleteEventHook = action({
  display: {
    label: "Delete Event Hook",
    description: "Delete an event hook by ID.",
  },
  inputs: deleteEventHookInputs,
  perform: async (context, { connection, eventHookId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await deleteEventHookById(client, eventHookId);

    return {
      data,
    };
  },
  examplePayload: deleteEventHookExamplePayload,
});
