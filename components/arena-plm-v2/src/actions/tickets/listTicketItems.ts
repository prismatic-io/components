import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketItemsExamplePayload } from "../../examplePayloads";
import { listTicketItemsInputs } from "../../inputs";
import { listTicketItemsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketItems = action({
  display: {
    label: "List Ticket Items",
    description:
      "List all items referenced by a specific ticket from Arena PLM system.",
  },
  inputs: listTicketItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketItemsOutputSchema,
  }),
  examplePayload: listTicketItemsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(`/tickets/${params.ticketGuid}/items`);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Ticket Items");
    }
  },
});
