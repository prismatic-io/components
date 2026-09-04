import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessStepAffectedExamplePayload } from "../../examplePayloads";
import { listQualityProcessStepAffectedInputs } from "../../inputs";
import { listQualityProcessStepAffectedOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessStepAffected = action({
  display: {
    label: "List Quality Process Step Affected Objects",
    description:
      "Returns a collection of Affected Objects for a step with a given GUID in a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: listQualityProcessStepAffectedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessStepAffectedOutputSchema,
  }),
  examplePayload: listQualityProcessStepAffectedExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}/affected`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Quality Process Step Affected Objects",
      );
    }
  },
});
