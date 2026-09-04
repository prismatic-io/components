import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeRequirementChildExamplePayload } from "../../examplePayloads";
import { removeRequirementChildInputs } from "../../inputs";
import { removeRequirementChildOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeRequirementChild = action({
  display: {
    label: "Remove Requirement Child",
    description: "Remove a child requirement from a requirement.",
  },
  inputs: removeRequirementChildInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeRequirementChildOutputSchema,
  }),
  examplePayload: removeRequirementChildExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/requirements/${params.requirementGuid}/children/${params.childRequirementGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Requirement child removed successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Remove Requirement Child");
    }
  },
});
