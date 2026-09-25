import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { showTicketInputs } from "../../inputs";
import { showTicketOutputSchema } from "../../outputSchemas";
import { showTicketExamplePayload } from "../../examplePayloads";
export const showTicket = action({
  display: {
    label: "Get Ticket",
    description: "Get a ticket by ID.",
  },
  performSafety: "safe",
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
  inputs: showTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: showTicketOutputSchema,
  }),
  examplePayload: showTicketExamplePayload,
});
