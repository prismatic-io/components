import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addTicketReferenceExamplePayload } from "../../examplePayloads";
import { addTicketReferenceInputs } from "../../inputs";
import { itemToTicketSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addTicketReference = action({
  display: {
    label: "Add Ticket Reference",
    description:
      "Link another ticket as a reference to a ticket in Arena PLM system.",
  },
  inputs: addTicketReferenceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemToTicketSchema,
  }),
  examplePayload: addTicketReferenceExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload = {
        ticket: { guid: params.referencedTicketGuid },
      };
      const { data } = await client.post(
        `/tickets/${params.ticketGuid}/tickets`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Ticket Reference");
    }
  },
});
