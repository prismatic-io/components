import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { METRICS_QUERY_PREFIX, SEARCH_METRICS_PATH } from "../constants";
import { selectMetricExamplePayload } from "../examplePayloads";
import { selectMetricInputs } from "../inputs";
import type { SearchMetricsResponse } from "../types";
export const selectMetric = dataSource({
  display: {
    label: "Select Metric",
    description:
      "A searchable picklist of metric names in the Datadog account.",
  },
  inputs: selectMetricInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<SearchMetricsResponse>(
      SEARCH_METRICS_PATH,
      {
        params: { q: METRICS_QUERY_PREFIX },
      },
    );
    const result = (data.results?.metrics ?? [])
      .map<Element>((metric) => ({
        label: metric,
        key: metric,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  examplePayload: selectMetricExamplePayload,
  dataSourceType: "picklist",
});
