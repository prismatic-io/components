import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPipelineMovementStatisticsInputs } from "../../inputs";
import { getPipelineMovementStatisticsExamplePayload } from "../../examplePayloads";
import { getPipelineMovementStatisticsOutputSchema } from "../../outputSchemas";
export const getPipelineMovementStatistics = action({
  display: {
    label: "Get Pipeline Movement Statistics",
    description: "Gets deal movements in a pipeline.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id, startDate, endDate, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/pipelines/${id}/movement_statistics`, {
      params: { start_date: startDate, end_date: endDate, user_id: userId },
    });
    return { data };
  },
  inputs: getPipelineMovementStatisticsInputs,
  examplePayload: getPipelineMovementStatisticsExamplePayload,
  examplePerform: async () => getPipelineMovementStatisticsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelineMovementStatisticsOutputSchema,
  }),
});
