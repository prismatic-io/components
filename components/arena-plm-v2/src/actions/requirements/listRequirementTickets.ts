import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementTicketsExamplePayload } from "../../examplePayloads";
import { listRequirementTicketsInputs } from "../../inputs";
import { itemTicketListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementTickets = action({
  display: {
    label: "List Requirement Tickets",
    description: "List all tickets linked to a requirement.",
  },
  inputs: listRequirementTicketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemTicketListSchema,
  }),
  examplePayload: listRequirementTicketsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/tickets`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement Tickets");
    }
  },
});
