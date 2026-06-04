import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/common";
import type { SearchMetricsResponse } from "../types";







export const selectMetric = dataSource({
  display: {
    label: "Select Metric",
    description:
      "A searchable picklist of metric names in your Datadog account.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    
    const { data } = await client.get<SearchMetricsResponse>("/api/v1/search", {
      params: { q: "metrics:" },
    });

    const result = (data.results?.metrics ?? [])
      .map<Element>((metric) => ({
        label: metric,
        key: metric,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  examplePayload: {
    result: [
      { label: "system.cpu.idle", key: "system.cpu.idle" },
      { label: "system.cpu.user", key: "system.cpu.user" },
      { label: "system.disk.free", key: "system.disk.free" },
      { label: "system.load.1", key: "system.load.1" },
    ],
  },
  dataSourceType: "picklist",
});
