import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { submitMetricsExample } from "../../examplePayloads";
import { submitSingleMetricInputs } from "../../inputs";
import { submitMetricsOutputSchema } from "../../outputSchemas";
import type { MetricSeries, SubmitMetricsResponse } from "../../types";
export const submitSingleMetric = action({
  display: {
    label: "Submit Single Metric",
    description:
      "Submit a single metric data point to Datadog. For bulk submissions, use the Submit Metrics action.",
  },
  inputs: submitSingleMetricInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: submitMetricsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      metricName,
      metricValue,
      metricTimestamp,
      metricTags,
      metricFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const series: MetricSeries = {
      metric: metricName,
      points: [{ timestamp: metricTimestamp, value: metricValue }],
      type: metricFields.metricType,
      tags: metricTags,
      unit: metricFields.metricUnit,
      interval: metricFields.metricInterval,
      resources: [
        {
          name: metricFields.resourceName,
          type: metricFields.resourceType,
        },
      ],
    };
    const response = await client.post<SubmitMetricsResponse>(
      "/api/v2/series",
      { series: [series] },
    );
    return { data: response.data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...submitMetricsExample,
  }),
  examplePayload: submitMetricsExample,
});
