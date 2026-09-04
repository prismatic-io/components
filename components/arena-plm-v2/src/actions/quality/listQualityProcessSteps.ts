import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessStepsExamplePayload } from "../../examplePayloads";
import { listQualityProcessStepsInputs } from "../../inputs";
import { listQualityProcessStepsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessSteps = action({
  display: {
    label: "List Quality Process Steps",
    description:
      "Returns a collection of Quality Process Step objects for a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: listQualityProcessStepsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessStepsOutputSchema,
  }),
  examplePayload: listQualityProcessStepsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/qualityprocesses/${params.qualityProcessGuid}/steps`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Quality Process Steps");
    }
  },
});
