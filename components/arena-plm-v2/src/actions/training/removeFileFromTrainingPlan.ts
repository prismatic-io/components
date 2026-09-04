import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeFileFromTrainingPlanExamplePayload } from "../../examplePayloads";
import { removeFileFromTrainingPlanInputs } from "../../inputs";
import { removeFileFromTrainingPlanOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeFileFromTrainingPlan = action({
  display: {
    label: "Remove File from Training Plan",
    description: "Remove a file from a training plan.",
  },
  inputs: removeFileFromTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeFileFromTrainingPlanOutputSchema,
  }),
  examplePayload: removeFileFromTrainingPlanExamplePayload,
  perform: async (
    context,
    { connection, trainingGuid, trainingFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Removing file association ${trainingFileAssociationGuid} from training plan ${trainingGuid}`,
        { trainingGuid, trainingFileAssociationGuid },
      );
      await client.delete(
        `/trainingplans/${trainingGuid}/files/${trainingFileAssociationGuid}`,
      );
      context.logger.info("Successfully removed file from training plan");
      return {
        data: {
          success: true,
          message: "File removed from training plan successfully",
        },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Remove File from Training Plan");
    }
  },
});
