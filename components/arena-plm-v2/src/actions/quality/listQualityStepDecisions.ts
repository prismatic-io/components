import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityStepDecisionsExamplePayload } from "../../examplePayloads";
import { listQualityStepDecisionsInputs } from "../../inputs";
import { listQualityStepDecisionsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityStepDecisions = action({
  display: {
    label: "List Quality Step Decisions",
    description:
      "Retrieve all decisions made by users in a quality process sign-off step.",
  },
  inputs: listQualityStepDecisionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityStepDecisionsOutputSchema,
  }),
  examplePayload: listQualityStepDecisionsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/qualityprocesses/${params.qualityprocessGuid}/steps/${params.stepGuid}/decisions`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Quality Step Decisions");
    }
  },
});
