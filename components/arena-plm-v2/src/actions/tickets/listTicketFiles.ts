import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketFilesExamplePayload } from "../../examplePayloads";
import { listTicketFilesInputs } from "../../inputs";
import { listTicketFilesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketFiles = action({
  display: {
    label: "List Ticket Files",
    description:
      "List all files referenced by a specific ticket from Arena PLM system.",
  },
  inputs: listTicketFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketFilesOutputSchema,
  }),
  examplePayload: listTicketFilesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(`/tickets/${params.ticketGuid}/files`);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Ticket Files");
    }
  },
});
