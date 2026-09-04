import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createQualityProcessStepAffectedExamplePayload } from "../../examplePayloads";
import { createQualityProcessStepAffectedInputs } from "../../inputs";
import { qualityAffectedSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createQualityProcessStepAffected = action({
  display: {
    label: "Create Quality Process Step Affected Object",
    description:
      "Adds an Affected Object in a step with a given GUID in a Quality Process with a given GUID. The type can be ITEM, REQUEST, CHANGE, SUPPLIER, SUPPLIER ITEM, or FILE from Arena PLM system.",
  },
  inputs: createQualityProcessStepAffectedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAffectedSchema,
  }),
  examplePayload: createQualityProcessStepAffectedExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload = {
        affected: {
          guid: params.affectedObjectGuid,
        },
        ...(params.notes && { notes: params.notes }),
      };
      const { data } = await client.post(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}/affected`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Quality Process Step Affected Object",
      );
    }
  },
});
