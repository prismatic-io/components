import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeRequirementQualityAssociationExamplePayload } from "../../examplePayloads";
import { removeRequirementQualityAssociationInputs } from "../../inputs";
import { removeRequirementQualityAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeRequirementQualityAssociation = action({
  display: {
    label: "Remove Requirement Quality Association",
    description: "Unlink a quality process from a requirement.",
  },
  inputs: removeRequirementQualityAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeRequirementQualityAssociationOutputSchema,
  }),
  examplePayload: removeRequirementQualityAssociationExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/requirements/${params.requirementGuid}/quality/${params.associationGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Requirement quality association removed successfully",
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Remove Requirement Quality Association",
      );
    }
  },
});
