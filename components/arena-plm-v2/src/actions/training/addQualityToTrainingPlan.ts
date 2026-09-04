import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addQualityToTrainingPlanExamplePayload } from "../../examplePayloads";
import { addQualityToTrainingPlanInputs } from "../../inputs";
import { referencedQualitySchema } from "../../outputSchemas";
import type { TrainingQualityCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addQualityToTrainingPlan = action({
  display: {
    label: "Add Quality Process to Training Plan",
    description: "Add a quality process to a training plan.",
  },
  inputs: addQualityToTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: referencedQualitySchema,
  }),
  examplePayload: addQualityToTrainingPlanExamplePayload,
  perform: async (
    context,
    { connection, trainingGuid, qualityProcessGuid, stepGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const qualityPayload: TrainingQualityCreateVo = {
        quality: { guid: qualityProcessGuid },
      };
      if (stepGuid) {
        qualityPayload.quality.step = { guid: stepGuid };
      }
      context.logger.info(
        `Adding quality process ${qualityProcessGuid} to training plan ${trainingGuid}`,
        { trainingGuid, qualityProcessGuid },
      );
      const { data } = await client.post(
        `/trainingplans/${trainingGuid}/quality`,
        qualityPayload,
      );
      context.logger.info(
        "Successfully added quality process to training plan",
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Add Quality Process to Training Plan",
      );
    }
  },
});
