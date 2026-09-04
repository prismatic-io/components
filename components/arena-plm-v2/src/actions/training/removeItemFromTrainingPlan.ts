import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeItemFromTrainingPlanExamplePayload } from "../../examplePayloads";
import { removeItemFromTrainingPlanInputs } from "../../inputs";
import { removeItemFromTrainingPlanOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeItemFromTrainingPlan = action({
  display: {
    label: "Remove Item from Training Plan",
    description: "Remove an item from a training plan.",
  },
  inputs: removeItemFromTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeItemFromTrainingPlanOutputSchema,
  }),
  examplePayload: removeItemFromTrainingPlanExamplePayload,
  perform: async (
    context,
    { connection, trainingGuid, trainingItemAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Removing item association ${trainingItemAssociationGuid} from training plan ${trainingGuid}`,
        { trainingGuid, trainingItemAssociationGuid },
      );
      await client.delete(
        `/trainingplans/${trainingGuid}/items/${trainingItemAssociationGuid}`,
      );
      context.logger.info("Successfully removed item from training plan");
      return {
        data: {
          success: true,
          message: "Item removed from training plan successfully",
        },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Remove Item from Training Plan");
    }
  },
});
