import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { submitMetricsExample } from "../../examplePayloads";
import { submitSingleMetricInputs } from "../../inputs";
import type { MetricSeries, SubmitMetricsResponse } from "../../types";







export const submitSingleMetric = action({
  display: {
    label: "Submit Single Metric",
    description:
      "Submit a single metric data point to Datadog. For bulk submissions, use the Submit Metrics action.",
  },
  inputs: submitSingleMetricInputs,
  perform: async (
    context,
    {
      connection,
      metricName,
      metricValue,
      metricTimestamp,
      metricType,
      metricTags,
      metricUnit,
      metricInterval,
      resourceName,
      resourceType,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const series: MetricSeries = {
      metric: metricName,
      points: [{ timestamp: metricTimestamp, value: metricValue }],
      type: metricType,
      tags: metricTags,
      unit: metricUnit,
      interval: metricInterval,
      resources: [{ name: resourceName, type: resourceType }],
    };

    const response = await client.post<SubmitMetricsResponse>(
      "/api/v2/series",
      { series: [series] },
    );

    return { data: response.data };
  },
  examplePayload: submitMetricsExample,
});
