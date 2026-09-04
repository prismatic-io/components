import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketChangesExamplePayload } from "../../examplePayloads";
import { listTicketChangesInputs } from "../../inputs";
import { requestChangeListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketChanges = action({
  display: {
    label: "List Ticket Changes",
    description:
      "List all changes referenced by a specific ticket from Arena PLM system.",
  },
  inputs: listTicketChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestChangeListSchema,
  }),
  examplePayload: listTicketChangesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/tickets/${params.ticketGuid}/changes`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Ticket Changes");
    }
  },
});
