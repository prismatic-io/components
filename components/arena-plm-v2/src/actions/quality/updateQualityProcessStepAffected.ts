import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateQualityProcessStepAffectedExamplePayload } from "../../examplePayloads";
import { updateQualityProcessStepAffectedInputs } from "../../inputs";
import { qualityAffectedSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateQualityProcessStepAffected = action({
  display: {
    label: "Update Quality Process Step Affected Object",
    description:
      "Updates an existing Affected Object with a given GUID in a step with a given GUID in a Quality Process with a given GUID. Current supported Affected Objects are ITEMS, CHANGES, SUPPLIERS, SUPPLIER ITEMS, FILES, QUALITY, and URLs from Arena PLM system.",
  },
  inputs: updateQualityProcessStepAffectedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAffectedSchema,
  }),
  examplePayload: updateQualityProcessStepAffectedExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: {
        notes?: string;
      } = {};
      if (
        params.notes !== undefined &&
        params.notes !== null &&
        params.notes !== ""
      ) {
        requestPayload.notes = params.notes;
      }
      const { data } = await client.put(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}/affected/${params.affectedGuid}`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Update Quality Process Step Affected Object",
      );
    }
  },
});
