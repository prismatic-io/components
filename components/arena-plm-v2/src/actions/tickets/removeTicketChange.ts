import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeTicketChangeExamplePayload } from "../../examplePayloads";
import { removeTicketChangeInputs } from "../../inputs";
import { removeTicketChangeOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeTicketChange = action({
  display: {
    label: "Remove Ticket Change",
    description: "Unlink a change from a ticket in Arena PLM system.",
  },
  inputs: removeTicketChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeTicketChangeOutputSchema,
  }),
  examplePayload: removeTicketChangeExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/tickets/${params.ticketGuid}/changes/${params.associationGuid}`,
      );
      return {
        data: { success: true, message: "Ticket change removed successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Remove Ticket Change");
    }
  },
});
