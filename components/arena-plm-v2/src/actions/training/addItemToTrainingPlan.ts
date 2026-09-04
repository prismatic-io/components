import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addItemToTrainingPlanExamplePayload } from "../../examplePayloads";
import { addItemToTrainingPlanInputs } from "../../inputs";
import { trainingItemSchema } from "../../outputSchemas";
import type { TrainingItemCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addItemToTrainingPlan = action({
  display: {
    label: "Add Item to Training Plan",
    description: "Add an item to a training plan.",
  },
  inputs: addItemToTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: trainingItemSchema,
  }),
  examplePayload: addItemToTrainingPlanExamplePayload,
  perform: async (context, { connection, trainingGuid, itemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const itemPayload: TrainingItemCreateVo = {
        item: { guid: itemGuid },
      };
      context.logger.info(
        `Adding item ${itemGuid} to training plan ${trainingGuid}`,
        { trainingGuid, itemGuid },
      );
      const { data } = await client.post(
        `/trainingplans/${trainingGuid}/items`,
        itemPayload,
      );
      context.logger.info("Successfully added item to training plan");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Add Item to Training Plan");
    }
  },
});
