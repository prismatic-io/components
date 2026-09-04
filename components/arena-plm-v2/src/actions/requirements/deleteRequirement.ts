import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteRequirementExamplePayload } from "../../examplePayloads";
import { deleteRequirementInputs } from "../../inputs";
import { deleteRequirementOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteRequirement = action({
  display: {
    label: "Delete Requirement",
    description: "Delete a requirement.",
  },
  inputs: deleteRequirementInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRequirementOutputSchema,
  }),
  examplePayload: deleteRequirementExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(`/requirements/${params.requirementGuid}`);
      return {
        data: { success: true, message: "Requirement deleted successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Requirement");
    }
  },
});
