import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addRequirementTicketExamplePayload } from "../../examplePayloads";
import { addRequirementTicketInputs } from "../../inputs";
import { addRequirementTicketOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addRequirementTicket = action({
  display: {
    label: "Add Requirement Ticket",
    description: "Link a ticket to a requirement.",
  },
  inputs: addRequirementTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addRequirementTicketOutputSchema,
  }),
  examplePayload: addRequirementTicketExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.post(
        `/requirements/${params.requirementGuid}/tickets`,
        { ticket: { guid: params.ticketGuid } },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Requirement Ticket");
    }
  },
});
