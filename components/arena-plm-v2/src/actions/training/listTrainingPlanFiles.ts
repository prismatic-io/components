import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingPlanFilesExamplePayload } from "../../examplePayloads";
import { listTrainingPlanFilesInputs } from "../../inputs";
import { fileAssociationListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTrainingPlanFiles = action({
  display: {
    label: "List Training Plan Files",
    description: "List files associated with a training plan.",
  },
  inputs: listTrainingPlanFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationListSchema,
  }),
  examplePayload: listTrainingPlanFilesExamplePayload,
  perform: async (context, { connection, trainingGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching files for training plan ${trainingGuid}`);
      const { data } = await client.get(`/trainingplans/${trainingGuid}/files`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} file associations`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Training Plan Files");
    }
  },
});
