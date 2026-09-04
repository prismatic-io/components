import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeTicketReferenceExamplePayload } from "../../examplePayloads";
import { removeTicketReferenceInputs } from "../../inputs";
import { removeTicketReferenceOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeTicketReference = action({
  display: {
    label: "Remove Ticket Reference",
    description:
      "Unlink a referenced ticket from a ticket in Arena PLM system.",
  },
  inputs: removeTicketReferenceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeTicketReferenceOutputSchema,
  }),
  examplePayload: removeTicketReferenceExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/tickets/${params.ticketGuid}/tickets/${params.associationGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Ticket reference removed successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Remove Ticket Reference");
    }
  },
});
