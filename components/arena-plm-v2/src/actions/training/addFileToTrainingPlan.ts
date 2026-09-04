import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addFileToTrainingPlanExamplePayload } from "../../examplePayloads";
import { addFileToTrainingPlanInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import type { TrainingFileCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addFileToTrainingPlan = action({
  display: {
    label: "Add File to Training Plan",
    description: "Add a file to a training plan.",
  },
  inputs: addFileToTrainingPlanInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: addFileToTrainingPlanExamplePayload,
  perform: async (
    context,
    { connection, trainingGuid, fileGuid, latestEditionAssociation },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const filePayload: TrainingFileCreateVo = {
        file: { guid: fileGuid },
      };
      if (
        latestEditionAssociation !== undefined &&
        latestEditionAssociation !== null
      ) {
        filePayload.latestEditionAssociation = latestEditionAssociation;
      }
      context.logger.info(
        `Adding file ${fileGuid} to training plan ${trainingGuid}`,
        { trainingGuid, fileGuid },
      );
      const { data } = await client.post(
        `/trainingplans/${trainingGuid}/files`,
        filePayload,
      );
      context.logger.info("Successfully added file to training plan");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Add File to Training Plan");
    }
  },
});
