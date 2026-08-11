import { action, outputSchema } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../../client";
import { Service } from "../../constants";
import { sendMetricsExamplePayload } from "../../examplePayloads";
import { sendMetricsInputs } from "../../inputs";
import { sendMetricsOutputSchema } from "../../outputSchemas";
export const sendMetrics = action({
  display: {
    label: "Send Metric Data",
    description: "Use the Metric API to send custom metrics to New Relic.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
      Service.METRICS,
    );
    const { data } = await client.post("", [
      {
        metrics: [
          {
            name: params.metricName,
            type: params.metricType,
            value: params.metricValue,
            timestamp: params.timestamp,
            attributes: params.attributes,
          },
        ],
      },
    ]);
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...sendMetricsExamplePayload,
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendMetricsOutputSchema,
  }),
  examplePayload: sendMetricsExamplePayload,
  inputs: sendMetricsInputs,
});
export default sendMetrics;
