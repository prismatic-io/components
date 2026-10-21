import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUBMIT_METRICS_PATH } from "../../constants";
import { submitMetricsExamplePayload } from "../../examplePayloads";
import { submitMetricsInputs } from "../../inputs";
import { submitMetricsOutputSchema } from "../../outputSchemas";
import type { SubmitMetricsResponse } from "../../types";
export const submitMetrics = action({
  display: {
    label: "Submit Metrics",
    description:
      "Submit time-series metric data to Datadog for graphing on dashboards. Uses the v2 API endpoint.",
  },
  inputs: submitMetricsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: submitMetricsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (_context, { connection, metricSeries }) => {
    const client = createClient(connection);
    const response = await client.post<SubmitMetricsResponse>(
      SUBMIT_METRICS_PATH,
      { series: metricSeries },
    );
    return { data: response.data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...submitMetricsExamplePayload,
  }),
  examplePayload: submitMetricsExamplePayload,
});
