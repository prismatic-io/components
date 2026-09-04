import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteRequirementTraceExamplePayload } from "../../examplePayloads";
import { deleteRequirementTraceInputs } from "../../inputs";
import { deleteRequirementTraceOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteRequirementTrace = action({
  display: {
    label: "Delete Requirement Trace",
    description: "Delete a trace link from a requirement.",
  },
  inputs: deleteRequirementTraceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRequirementTraceOutputSchema,
  }),
  examplePayload: deleteRequirementTraceExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/requirements/${params.requirementGuid}/trace/${params.traceLinkGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Requirement trace deleted successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Requirement Trace");
    }
  },
});
