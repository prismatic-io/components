import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMetricsExample } from "../../examplePayloads";
import { listMetricsInputs } from "../../inputs";
import { listMetricsOutputSchema } from "../../outputSchemas";
import type { ListMetricsResponse } from "../../types";
export const listMetrics = action({
  display: {
    label: "List Metrics",
    description:
      "List active metric names that have reported data since a given timestamp, with optional host and tag filtering.",
  },
  inputs: listMetricsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMetricsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, metricsFrom, metricsHost, metricsTagFilter },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params: Record<string, unknown> = {
      from: metricsFrom,
      ...(metricsHost && { host: metricsHost }),
      ...(metricsTagFilter && { tag_filter: metricsTagFilter }),
    };
    const response = await client.get<ListMetricsResponse>("/api/v1/metrics", {
      params,
    });
    return { data: response.data };
  },
  examplePerform: async (
    _context,
    { metricsFrom },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listMetricsExample.data,
      from: String(metricsFrom),
    },
  }),
  examplePayload: listMetricsExample,
});
