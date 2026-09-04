import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteQualityProcessExamplePayload } from "../../examplePayloads";
import { deleteQualityProcessInputs } from "../../inputs";
import { deleteQualityProcessOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteQualityProcess = action({
  display: {
    label: "Delete Quality Process",
    description:
      "Deletes a Quality Process with a given GUID from Arena PLM system. Note: Any full user can delete a Quality Process via the API.",
  },
  inputs: deleteQualityProcessInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteQualityProcessOutputSchema,
  }),
  examplePayload: deleteQualityProcessExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(`/qualityprocesses/${params.qualityProcessGuid}`);
      return {
        data: {
          success: true,
          message: "Quality process deleted successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Quality Process");
    }
  },
});
