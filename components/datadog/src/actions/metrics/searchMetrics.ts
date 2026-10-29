import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { METRICS_QUERY_PREFIX, SEARCH_METRICS_PATH } from "../../constants";
import { searchMetricsExamplePayload } from "../../examplePayloads";
import { searchMetricsInputs } from "../../inputs";
import { searchMetricsOutputSchema } from "../../outputSchemas";
import type { SearchMetricsResponse } from "../../types";

export const searchMetrics = action({
  display: {
    label: "Search Metrics",
    description:
      "Search for Datadog metrics by name prefix. Returns matching metric names.",
  },
  inputs: searchMetricsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchMetricsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (_context, { connection, metricsQuery }) => {
    const client = createClient(connection);

    const response = await client.get<SearchMetricsResponse>(
      SEARCH_METRICS_PATH,
      {
        params: {
          q: `${METRICS_QUERY_PREFIX}${metricsQuery}`,
        },
      },
    );

    return { data: response.data };
  },
  examplePerform: async (): Promise<{ data: unknown }> => ({
    ...searchMetricsExamplePayload,
  }),
  examplePayload: searchMetricsExamplePayload,
});
