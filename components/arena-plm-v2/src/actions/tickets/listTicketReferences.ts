import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketReferencesExamplePayload } from "../../examplePayloads";
import { listTicketReferencesInputs } from "../../inputs";
import { itemTicketListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketReferences = action({
  display: {
    label: "List Ticket References",
    description:
      "List all tickets referenced by a specific ticket from Arena PLM system.",
  },
  inputs: listTicketReferencesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemTicketListSchema,
  }),
  examplePayload: listTicketReferencesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/tickets/${params.ticketGuid}/tickets`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Ticket References");
    }
  },
});
