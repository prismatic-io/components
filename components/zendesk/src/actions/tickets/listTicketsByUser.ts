import { action, util } from "@prismatic-io/spectral";
import { connectionInput, userId } from "../../inputs";
import { listTicketsPayload } from "../../examplePayloads";
import { createClient } from "../../auth";

export const listTicketsByUser = action({
  display: {
    label: "List Tickets Requested By User",
    description:
      "List all of the tickets that a particular user has requested.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const result = await client.tickets.listByUserRequested(params.userId);
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
