import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCollectorInputs } from "../../inputs";
import { getCollectorExamplePayload } from "../../examplePayloads";
import type { Collector } from "../../types";






export const getCollector = action({
  display: {
    label: "Get Collector",
    description: "Retrieve details about a specific collector.",
  },
  inputs: getCollectorInputs,
  perform: async (context, { connection, collectorId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<Collector>(`/collectors/${collectorId}`);

    return { data };
  },
  examplePayload: getCollectorExamplePayload,
});
