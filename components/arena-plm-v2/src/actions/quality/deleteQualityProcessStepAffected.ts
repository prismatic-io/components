import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteQualityProcessStepAffectedExamplePayload } from "../../examplePayloads";
import { deleteQualityProcessStepAffectedInputs } from "../../inputs";
import { deleteQualityProcessStepAffectedOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteQualityProcessStepAffected = action({
  display: {
    label: "Delete Quality Process Step Affected Object",
    description:
      "Deletes an Affected Object with a given GUID from Quality Process step with a given GUID in a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: deleteQualityProcessStepAffectedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteQualityProcessStepAffectedOutputSchema,
  }),
  examplePayload: deleteQualityProcessStepAffectedExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}/affected/${params.affectedGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Quality process step affected object deleted successfully",
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Delete Quality Process Step Affected Object",
      );
    }
  },
});
