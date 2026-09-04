import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementTicketAssociationExamplePayload } from "../../examplePayloads";
import { getRequirementTicketAssociationInputs } from "../../inputs";
import { itemToTicketSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirementTicketAssociation = action({
  display: {
    label: "Get Requirement Ticket Association",
    description: "Get details of a specific ticket linked to a requirement.",
  },
  inputs: getRequirementTicketAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemToTicketSchema,
  }),
  examplePayload: getRequirementTicketAssociationExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/tickets/${params.associationGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Requirement Ticket Association",
      );
    }
  },
});
