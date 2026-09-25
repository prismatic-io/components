import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { SUCCESS_MESSAGE } from "../../constants";
import { deleteTicketExamplePayload } from "../../examplePayloads";
import { deleteTicketInputs } from "../../inputs";
import { deleteTicketOutputSchema } from "../../outputSchemas";
export const deleteTicket = action({
  display: {
    label: "Delete Ticket",
    description: "Delete a ticket by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    await client.tickets.delete(util.types.toInt(params.ticketId));
    return {
      data: SUCCESS_MESSAGE,
    };
  },
  examplePerform: async () => deleteTicketExamplePayload,
  inputs: deleteTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTicketOutputSchema,
  }),
  examplePayload: deleteTicketExamplePayload,
});
