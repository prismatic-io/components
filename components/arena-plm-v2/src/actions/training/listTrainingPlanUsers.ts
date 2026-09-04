import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingPlanUsersExamplePayload } from "../../examplePayloads";
import { listTrainingPlanUsersInputs } from "../../inputs";
import { listTrainingPlanUsersOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTrainingPlanUsers = action({
  display: {
    label: "List Training Plan Users",
    description: "List all users assigned to a training plan.",
  },
  inputs: listTrainingPlanUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTrainingPlanUsersOutputSchema,
  }),
  examplePayload: listTrainingPlanUsersExamplePayload,
  perform: async (context, { connection, trainingGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching users for training plan ${trainingGuid}`);
      const { data } = await client.get(`/trainingplans/${trainingGuid}/users`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} training plan users`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Training Plan Users");
    }
  },
});
