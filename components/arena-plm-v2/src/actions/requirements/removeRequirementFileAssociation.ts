import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeRequirementFileAssociationExamplePayload } from "../../examplePayloads";
import { removeRequirementFileAssociationInputs } from "../../inputs";
import { removeRequirementFileAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeRequirementFileAssociation = action({
  display: {
    label: "Remove Requirement File Association",
    description: "Remove a file association from a requirement.",
  },
  inputs: removeRequirementFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeRequirementFileAssociationOutputSchema,
  }),
  examplePayload: removeRequirementFileAssociationExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/requirements/${params.requirementGuid}/files/${params.fileAssociationGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Requirement file association removed successfully",
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Remove Requirement File Association",
      );
    }
  },
});
