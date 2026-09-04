import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getQualityProcessStepAffectedByGuidExamplePayload } from "../../examplePayloads";
import { getQualityProcessStepAffectedByGuidInputs } from "../../inputs";
import { qualityAffectedSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getQualityProcessStepAffectedByGuid = action({
  display: {
    label: "Get Quality Process Step Affected Object by GUID",
    description:
      "Returns an Affected Object with a given GUID that appears in a step with a given GUID in a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: getQualityProcessStepAffectedByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAffectedSchema,
  }),
  examplePayload: getQualityProcessStepAffectedByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}/affected/${params.affectedGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Quality Process Step Affected Object by GUID",
      );
    }
  },
});
