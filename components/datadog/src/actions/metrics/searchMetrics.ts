import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchMetricsExample } from "../../examplePayloads";
import { searchMetricsInputs } from "../../inputs";
import type { SearchMetricsResponse } from "../../types";







export const searchMetrics = action({
  display: {
    label: "Search Metrics",
    description:
      "Search for Datadog metrics by name prefix. Returns matching metric names.",
  },
  inputs: searchMetricsInputs,
  perform: async (context, { connection, metricsQuery }) => {
    const client = createClient(connection, context.debug.enabled);

    
    const response = await client.get<SearchMetricsResponse>("/api/v1/search", {
      params: {
        q: `metrics:${metricsQuery}`,
      },
    });

    return { data: response.data };
  },
  examplePayload: searchMetricsExample,
});
