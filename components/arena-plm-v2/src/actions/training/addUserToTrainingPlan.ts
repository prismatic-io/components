import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addUserToTrainingPlanExamplePayload } from "../../examplePayloads";
import { addUserToTrainingPlanInputs } from "../../inputs";
import { trainingUserSchema } from "../../outputSchemas";
import type { TrainingUserCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addUserToTrainingPlan = action({
  display: {
    label: "Add User to Training Plan",
    description: "Add a user to a training plan.",
  },
  inputs: addUserToTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: trainingUserSchema,
  }),
  examplePayload: addUserToTrainingPlanExamplePayload,
  perform: async (context, { connection, trainingGuid, userGuid, dueDate }) => {
    try {
      const client = await createArenaClient(context, connection);
      const userPayload: TrainingUserCreateVo = {
        user: { guid: userGuid },
      };
      if (dueDate) {
        userPayload.dueDate = dueDate;
      }
      context.logger.info(
        `Adding user ${userGuid} to training plan ${trainingGuid}`,
        {
          trainingGuid,
          userGuid,
        },
      );
      const { data } = await client.post(
        `/trainingplans/${trainingGuid}/users`,
        userPayload,
      );
      context.logger.info("Successfully added user to training plan");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Add User to Training Plan");
    }
  },
});
