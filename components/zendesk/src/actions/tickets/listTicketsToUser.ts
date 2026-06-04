import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { userId, connectionInput } from "../../inputs";
import { listTicketsPayload } from "../../examplePayloads";

export const listTicketsToUser = action({
  display: {
    label: "List Tickets Assigned To User",
    description:
      "List all of the tickets that have been assigned to a particular user.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const result = await client.tickets.listAssigned(params.userId);
    return {
      data: result,
    };
  },
  inputs: {
    userId: {
      ...userId,
      required: true,
      clean: util.types.toNumber,
    },
    zendeskConnection: connectionInput,
  },

  examplePayload: {
    data: listTicketsPayload as unknown,
  },
});
