import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCollectorStatsInputs } from "../../inputs";
import { getCollectorStatsExamplePayload } from "../../examplePayloads";
import type { CollectorStats } from "../../types";








export const getCollectorStats = action({
  display: {
    label: "Get Collector Stats",
    description: "Get response statistics for a collector.",
  },
  inputs: getCollectorStatsInputs,
  perform: async (context, { connection, collectorId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<CollectorStats>(
      `/collectors/${collectorId}/stats`,
    );

    return { data };
  },
  examplePayload: getCollectorStatsExamplePayload,
});
