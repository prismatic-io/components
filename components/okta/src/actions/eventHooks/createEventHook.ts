import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createEventHookExamplePayload } from "../../examplePayloads/webhook";
import { createEventHookInputs } from "../../inputs/webhooks";
import { createEventHookFN } from "../../util/eventHooks";
import { verifyEventHook } from "./verifyEventHook";

export const createEventHook = action({
  display: {
    label: "Create Event Hook",
    description: "Create a new event hook.",
  },
  inputs: createEventHookInputs,
  perform: async (
    context,
    {
      connection,
      eventHookDescription,
      eventHookFilter,
      eventHookItemsCode,
      eventHookUrlHeaders,
      eventHookItems,
      eventHookName,
      eventHookUrl,
      doNotActivateOnCreate,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await createEventHookFN(client, {
      eventHookDescription,
      eventHookFilter,
      eventHookItemsCode,
      eventHookUrlHeaders,
      eventHookItems,
      eventHookName,
      eventHookUrl,
    });

    if (doNotActivateOnCreate) {
      return { data };
    }

    const { data: verifiedEventHook } = await verifyEventHook.perform(context, {
      connection,
      eventHookId: data.id,
    });
    return { data: verifiedEventHook };
  },
  examplePayload: createEventHookExamplePayload,
});
