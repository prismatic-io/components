import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeTicketFileExamplePayload } from "../../examplePayloads";
import { removeTicketFileInputs } from "../../inputs";
import { removeTicketFileOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeTicketFile = action({
  display: {
    label: "Remove Ticket File",
    description: "Unlink a file from a ticket in Arena PLM system.",
  },
  inputs: removeTicketFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeTicketFileOutputSchema,
  }),
  examplePayload: removeTicketFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/tickets/${params.ticketGuid}/files/${params.associationGuid}`,
      );
      return {
        data: { success: true, message: "Ticket file removed successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Remove Ticket File");
    }
  },
});
