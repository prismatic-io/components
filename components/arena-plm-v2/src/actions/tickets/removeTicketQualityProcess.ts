import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeTicketQualityProcessExamplePayload } from "../../examplePayloads";
import { removeTicketQualityProcessInputs } from "../../inputs";
import { removeTicketQualityProcessOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeTicketQualityProcess = action({
  display: {
    label: "Remove Ticket Quality Process",
    description: "Unlink a quality process from a ticket in Arena PLM system.",
  },
  inputs: removeTicketQualityProcessInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeTicketQualityProcessOutputSchema,
  }),
  examplePayload: removeTicketQualityProcessExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/tickets/${params.ticketGuid}/quality/${params.associationGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Ticket quality process removed successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Remove Ticket Quality Process");
    }
  },
});
