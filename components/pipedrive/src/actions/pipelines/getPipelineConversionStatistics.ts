import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPipelineConversionStatisticsInputs } from "../../inputs";
import { getPipelineConversionStatisticsExamplePayload } from "../../examplePayloads";
import { getPipelineConversionStatisticsOutputSchema } from "../../outputSchemas";
export const getPipelineConversionStatistics = action({
  display: {
    label: "Get Pipeline Conversion Statistics",
    description: "Gets deal conversion rates in a pipeline.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id, startDate, endDate, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/pipelines/${id}/conversion_statistics`,
      {
        params: { start_date: startDate, end_date: endDate, user_id: userId },
      },
    );
    return { data };
  },
  inputs: getPipelineConversionStatisticsInputs,
  examplePayload: getPipelineConversionStatisticsExamplePayload,
  examplePerform: async () => getPipelineConversionStatisticsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelineConversionStatisticsOutputSchema,
  }),
});
