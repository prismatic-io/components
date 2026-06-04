import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { submitMetricsExample } from "../../examplePayloads";
import { submitMetricsInputs } from "../../inputs";
import type { SubmitMetricsResponse } from "../../types";








export const submitMetrics = action({
  display: {
    label: "Submit Metrics",
    description:
      "Submit time-series metric data to Datadog for graphing on dashboards. Uses the v2 API endpoint.",
  },
  inputs: submitMetricsInputs,
  perform: async (context, { connection, metricSeries }) => {
    const client = createClient(connection, context.debug.enabled);
    const response = await client.post<SubmitMetricsResponse>(
      "/api/v2/series",
      { series: metricSeries },
    );

    return { data: response.data };
  },
  examplePayload: submitMetricsExample,
});
