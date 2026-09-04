import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeRequirementTicketAssociationExamplePayload } from "../../examplePayloads";
import { removeRequirementTicketAssociationInputs } from "../../inputs";
import { removeRequirementTicketAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeRequirementTicketAssociation = action({
  display: {
    label: "Remove Requirement Ticket Association",
    description: "Unlink a ticket from a requirement.",
  },
  inputs: removeRequirementTicketAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeRequirementTicketAssociationOutputSchema,
  }),
  examplePayload: removeRequirementTicketAssociationExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/requirements/${params.requirementGuid}/tickets/${params.associationGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Requirement ticket association removed successfully",
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Remove Requirement Ticket Association",
      );
    }
  },
});
