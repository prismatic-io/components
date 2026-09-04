import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingPlanQualityExamplePayload } from "../../examplePayloads";
import { listTrainingPlanQualityInputs } from "../../inputs";
import { referencedQualityListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTrainingPlanQuality = action({
  display: {
    label: "List Training Plan Quality Processes",
    description: "List quality processes associated with a training plan.",
  },
  inputs: listTrainingPlanQualityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: referencedQualityListSchema,
  }),
  examplePayload: listTrainingPlanQualityExamplePayload,
  perform: async (context, { connection, trainingGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching quality processes for training plan ${trainingGuid}`,
      );
      const { data } = await client.get(
        `/trainingplans/${trainingGuid}/quality`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} quality process associations`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Training Plan Quality Processes",
      );
    }
  },
});
