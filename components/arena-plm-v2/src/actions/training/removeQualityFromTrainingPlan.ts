import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeQualityFromTrainingPlanExamplePayload } from "../../examplePayloads";
import { removeQualityFromTrainingPlanInputs } from "../../inputs";
import { removeQualityFromTrainingPlanOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeQualityFromTrainingPlan = action({
  display: {
    label: "Remove Quality Process from Training Plan",
    description: "Remove a quality process from a training plan.",
  },
  inputs: removeQualityFromTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeQualityFromTrainingPlanOutputSchema,
  }),
  examplePayload: removeQualityFromTrainingPlanExamplePayload,
  perform: async (context, { connection, trainingGuid, referenceGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Removing quality process ${referenceGuid} from training plan ${trainingGuid}`,
        { trainingGuid, referenceGuid },
      );
      await client.delete(
        `/trainingplans/${trainingGuid}/quality/${referenceGuid}`,
      );
      context.logger.info(
        "Successfully removed quality process from training plan",
      );
      return {
        data: {
          success: true,
          message: "Quality process removed from training plan successfully",
        },
      };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Remove Quality Process from Training Plan",
      );
    }
  },
});
