import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeTicketItemExamplePayload } from "../../examplePayloads";
import { removeTicketItemInputs } from "../../inputs";
import { removeTicketItemOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeTicketItem = action({
  display: {
    label: "Remove Ticket Item",
    description: "Unlink an item from a ticket in Arena PLM system.",
  },
  inputs: removeTicketItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeTicketItemOutputSchema,
  }),
  examplePayload: removeTicketItemExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/tickets/${params.ticketGuid}/items/${params.associationGuid}`,
      );
      return {
        data: { success: true, message: "Ticket item removed successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Remove Ticket Item");
    }
  },
});
