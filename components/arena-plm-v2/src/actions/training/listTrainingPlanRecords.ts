import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTrainingPlanRecordsExamplePayload } from "../../examplePayloads";
import { listTrainingPlanRecordsInputs } from "../../inputs";
import { listTrainingPlanRecordsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTrainingPlanRecords = action({
  display: {
    label: "List Training Plan Records",
    description: "List all training records associated with a training plan.",
  },
  inputs: listTrainingPlanRecordsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTrainingPlanRecordsOutputSchema,
  }),
  examplePayload: listTrainingPlanRecordsExamplePayload,
  perform: async (context, { connection, trainingGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching training records for plan ${trainingGuid}`);
      const { data } = await client.get(
        `/trainingplans/${trainingGuid}/records`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} training records`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Training Plan Records");
    }
  },
});
