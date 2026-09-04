import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteTicketExamplePayload } from "../../examplePayloads";
import { deleteTicketInputs } from "../../inputs";
import { deleteTicketOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteTicket = action({
  display: {
    label: "Delete Ticket",
    description: "Delete a specific ticket from Arena PLM system.",
  },
  inputs: deleteTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTicketOutputSchema,
  }),
  examplePayload: deleteTicketExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(`/tickets/${params.ticketGuid}`);
      return {
        data: { success: true, message: "Ticket deleted successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Ticket");
    }
  },
});
