import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingPlanItemsExamplePayload } from "../../examplePayloads";
import { listTrainingPlanItemsInputs } from "../../inputs";
import { listTrainingPlanItemsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTrainingPlanItems = action({
  display: {
    label: "List Training Plan Items",
    description: "List items associated with a training plan.",
  },
  inputs: listTrainingPlanItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTrainingPlanItemsOutputSchema,
  }),
  examplePayload: listTrainingPlanItemsExamplePayload,
  perform: async (context, { connection, trainingGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching items for training plan ${trainingGuid}`);
      const { data } = await client.get(`/trainingplans/${trainingGuid}/items`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} item associations`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Training Plan Items");
    }
  },
});
