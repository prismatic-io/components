import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { createTicketPayload } from "../../examplePayloads";
import { ticketId, connectionInput } from "../../inputs";

export const showTicket = action({
  display: {
    label: "Get Ticket",
    description: "Get a ticket by ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const { result } = await client.tickets.show(params.ticketId);
    return {
      data: result,
    };
  },
  inputs: {
    ticketId: {
      ...ticketId,
      required: true,
      clean: util.types.toNumber,
    },
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: createTicketPayload as unknown,
  },
});
