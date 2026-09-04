import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeTrainingPlanStatusExamplePayload } from "../../examplePayloads";
import { changeTrainingPlanStatusInputs } from "../../inputs";
import { trainingShortSchema } from "../../outputSchemas";
import type { TrainingStatusChangeVo } from "../../types";
import { handleArenaError } from "../../util";
export const changeTrainingPlanStatus = action({
  display: {
    label: "Change Training Plan Status",
    description: "Change the status of a training plan (OPEN/CLOSED).",
  },
  inputs: changeTrainingPlanStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: trainingShortSchema,
  }),
  examplePayload: changeTrainingPlanStatusExamplePayload,
  perform: async (context, { connection, trainingGuid, status, comment }) => {
    try {
      const client = await createArenaClient(context, connection);
      const statusPayload: TrainingStatusChangeVo = {
        trainingplan: { guid: trainingGuid },
        status,
      };
      if (comment) {
        statusPayload.comment = comment;
      }
      context.logger.info(`Changing training plan status to ${status}`, {
        trainingGuid,
        status,
        comment,
      });
      const { data } = await client.post(
        "/trainingplans/statuschanges",
        statusPayload,
      );
      context.logger.info("Successfully changed training plan status");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Change Training Plan Status");
    }
  },
});
