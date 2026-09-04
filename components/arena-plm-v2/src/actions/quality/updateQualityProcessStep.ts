import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateQualityProcessStepExamplePayload } from "../../examplePayloads";
import { updateQualityProcessStepInputs } from "../../inputs";
import { qualityProcessStepSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateQualityProcessStep = action({
  display: {
    label: "Update Quality Process Step",
    description:
      "Update a specific step in a quality process within Arena PLM system.",
  },
  inputs: updateQualityProcessStepInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityProcessStepSchema,
  }),
  examplePayload: updateQualityProcessStepExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.put(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}`,
        params.data,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Quality Process Step");
    }
  },
});
