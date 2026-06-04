import { action } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { connectionInput } from "../../inputs";
import { listTicketsPayload } from "../../examplePayloads";

export const listTickets = action({
  display: {
    label: "List Tickets",
    description: "List all tickets.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const result = await client.tickets.list();
    return {
      data: result,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: listTicketsPayload as unknown,
  },
});
