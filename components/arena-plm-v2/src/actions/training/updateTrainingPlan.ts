import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateTrainingPlanExamplePayload } from "../../examplePayloads";
import { updateTrainingPlanInputs } from "../../inputs";
import { trainingShortSchema } from "../../outputSchemas";
import type { TrainingUpdateVo } from "../../types";
import { handleArenaError } from "../../util";
export const updateTrainingPlan = action({
  display: {
    label: "Update Training Plan",
    description: "Update an existing training plan.",
  },
  inputs: updateTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: trainingShortSchema,
  }),
  examplePayload: updateTrainingPlanExamplePayload,
  perform: async (
    context,
    {
      connection,
      trainingGuid,
      name,
      description,
      daysToComplete,
      managerGuid,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const trainingPayload: TrainingUpdateVo = {};
      if (name) trainingPayload.name = name;
      if (description) trainingPayload.description = description;
      if (daysToComplete !== undefined)
        trainingPayload.daysToComplete = daysToComplete;
      if (managerGuid) {
        trainingPayload.manager = { guid: managerGuid };
      }
      context.logger.info("Updating training plan in Arena", {
        trainingGuid,
        hasName: !!name,
        hasDescription: !!description,
        hasDaysToComplete: daysToComplete !== undefined,
        hasManager: !!managerGuid,
      });
      const { data } = await client.put(
        `/trainingplans/${trainingGuid}`,
        trainingPayload,
      );
      context.logger.info("Successfully updated training plan");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update Training Plan");
    }
  },
});
